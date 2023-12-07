const { ObjectId, connect } = require('./mongo');

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

// @ts-check

/**
 * @typedef {Object} BaseUser
 * @property {string} username
 * @property {string} password
 * @property {string} email
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} role
 * @property {Array<string>} goals
 * @property {Array<string>} workouts
 * @property {Array<string>} friends
 */

/**
 * @typedef {Object} HasId
 * @property {string} _id
 */

/**
 * @typedef {BaseUser & HasId} User
 */


const COLLECTION_NAME = 'users';
async function getCollection() {
  const db = await connect();
  return db.collection(COLLECTION_NAME);
}

/**
 * @type { {users: User[]} }
 */

/**
 * @returns {User[]} 
 */
async function getAll() {
  const col = await getCollection();
  return col.find({}).toArray();
}


/**
 * @param {number} id 
 */
async function get(id) {
  const col = await getCollection();
  return col.find({}).toArray();
}

async function search(query) {
  const col = await getCollection();
  return col.find({ $text: { $search: query } }).toArray();
}

async function getByIds(ids) {
  const col = await getCollection();
  return col.find({ _id: { $in: ids.map(id => ObjectId(id)) } }).toArray();
}

/**
 * @param {BaseUser} values - The user to create.
 * @returns {User} The created user.
 */
async function create(values) {
  const col = await getCollection();
  const newItem = {
    ...values,
  };
  await col.insertOne(newItem);
  return newItem;
}

/**
 * @param {BaseUser} values - The user to create.
 * @returns {User} The created user.
 */
async function register(values) {
  const col = await getCollection();

  if(await col.findOne({ email: values.email })) {
    throw new Error('Email already exists');
  }

  if(values.password <= 0) {
    throw new Error('Password is too short');
  }

  const newItem = {
    ...values,
  };
  await col.insertOne(newItem);
  return newItem;
}

/**
 * @param {string} username
 * @param {string} password
 * @returns { Promise< { user: User, token: string}> } The created user.
 */
async function login(username, password) {
  const col = await getCollection();

  if(!username || !password) {
    throw new Error('Missing email or password');
  }
  
  const item = await col.findOne({ username: username })

  if(!item) {
    throw new Error('User not found');
  }

  if(item.password !== password) {
    throw new Error('Wrong password');
  }

  const user = { ...item, password: undefined, admin: true};
  const token = await generateJWT(user);
  return { user, token };
}

/**
 * @param {User} newValues - The user's new data.
 * @returns {User} The updated user.
 */
async function update(newValues) {
  const col = await getCollection();
  const newItem = {
    ...newValues,
  };
  await col.updateOne({ _id: ObjectId(newValues.id) }, { $set: newItem });
  return newItem;
}

async function addFriend(id, friendId) {
  const col = await getCollection();
  const user = await col.findOne({ _id: ObjectId(id) });

  if(user.friends.includes(friendId)) {
    throw new Error('Friend already added');
  }

  await col.updateOne({ _id: ObjectId(id) }, { $push: { friends: friendId } });
  return user;
}

async function removeFriend(id, friendId) {
  const col = await getCollection();
  const user = await col.findOne({ _id: ObjectId(id) });

  if(!user.friends.includes(friendId)) {
    throw new Error('Friend not found');
  }

  await col.updateOne({ _id: ObjectId(id) }, { $pull: { friends: friendId } });
  return user;
}

/**
 * @param {number} id - The user's ID.
 */
async function remove(id) {
  const col = await getCollection();
  await col.deleteOne({ _id: ObjectId(id) });
}

function generateJWT(user) {
  return new Promise((resolve, reject) => {
    jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } , (err, token) => {
      if(err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  })
}

function verifyJWT(token) {
  return new Promise((resolve, reject) => {

    //CATCH ERROR IF TOKEN IS UNDEFINED
    if(!token) {
      reject(new Error('Token is undefined'));
    }
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if(err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  })
}


module.exports = {
  getAll, get, search, getByIds, create, update, remove, login, register, generateJWT, verifyJWT , addFriend, removeFriend
};