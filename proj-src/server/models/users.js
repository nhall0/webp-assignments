const { ObjectId, connect } = require('./mongo');

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

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

const COLLECTION_NAME = 'users';
async function getCollection() {
  const db = await connect();
  return db.collection(COLLECTION_NAME);
}

async function getAll() {
  const col = await getCollection();
  return col.find({}).toArray();
}

async function get(id) {
  const col = await getCollection();
  const user = await col.findOne({ _id: new ObjectId(id) });
  return user;
}

async function search(query) {
  const col = await getCollection();
  return col.find({ $text: { $search: query } }).toArray();
}

async function getByIds(ids) {
  const col = await getCollection();
  const user = await col.findOne({ _id: new ObjectId(ids) });
  for (let i = 0; i < user.friends.length; i++) {
    user.friends[i] = await col.findOne({ _id: new ObjectId(user.friends[i]) });
    if(user.friends[i]) {
      user.friends[i].password = undefined;
    }
    if(user.friends[i]) {
      user.friends[i].friends = undefined;
    }
  }
  return user.friends;
}

async function create(values) {
  const col = await getCollection();
  const newItem = {
    ...values,
  };
  await col.insertOne(newItem);
  return newItem;
}

async function register(values) {
  const col = await getCollection();

  if(!values.email || !values.password) {
    throw new Error('Missing email or password');
  }

  if(await col.findOne({ email: values.email })) {
    throw new Error('Email already exists');
  }

  if(values.password <= 0) {
    throw new Error('Password is too short');
  }

  delete values._id;

  const newItem = {
    ...values,
  };
  await col.insertOne(newItem);
  return newItem;
}

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

async function update(newValues) {
  const col = await getCollection();
  const newItem = {
    ...newValues,
  };
  delete newItem._id;
  await col.updateOne({ _id: new ObjectId(newValues._id) }, { $set: newItem });
  return newItem;
}

async function addFriend(id, friendId) {
  const col = await getCollection();
  const user = await col.findOne({ email: friendId });

  if(!user) {
    throw new Error('Friend not found');
  }

  await col.updateOne({ _id: new ObjectId(id) }, { $push: { friends: user._id } });
  return user;
}

async function removeFriend(id, friendId) {
  const col = await getCollection();
  const user = await col.findOne({ _id: new ObjectId(id) });

  friendId = new ObjectId(friendId);

  await col.updateOne({ _id: new ObjectId(id) }, { $pull: { friends: friendId } });
  return user;
}

async function remove(id) {
  const col = await getCollection();
  await col.deleteOne({ _id: new ObjectId(id) });
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