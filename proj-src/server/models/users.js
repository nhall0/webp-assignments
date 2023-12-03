const { ObjectId, connect } = require('./mongo');

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
 * @returns {User[]} An array of products.
 */
async function getAll() {
  const col = await getCollection();
  return col.find({}).toArray();
}


/**
 * @param {number} id - The product's ID.
 */
async function get(id) {
  const col = await getCollection();
  return col.find({}).toArray();
}

async function search(query) {
  const col = await getCollection();
  return col.find({ $text: { $search: query } }).toArray();
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
  //Check if user already exists
  const item = data.users.find(x => x.email === values.email);
  if(item) {
    throw new Error('User already exists');
  }

  //Make sure all fields are filled
  if(!values.username || !values.password || !values.email || !values.firstName || !values.lastName) {
    throw new Error('Please fill out all fields');
  }

  //Make sure password is at least 8 characters
  if(values.password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  //Make sure password contains at least one number
  if(!/\d/.test(values.password)) {
    throw new Error('Password must contain at least one number');
  }

  const newUser = await create(values);
  return newUser
}

/**
 * @param {string} email
 * @param {string} password
 * @returns {User} The created user.
 */
function login(email, password) {

  const item = data.users.find(x => x.email === email);
  if(!item) {
    throw new Error('User not found');
  }

  if(item.password !== password) {
    throw new Error('Wrong password');
  }

  return item;
}

/**
 * @param {User} newValues - The user's new data.
 * @returns {User} The updated user.
 */
function update(newValues) {
  const index = data.users.findIndex(p => p.id === newValues.id);
  if(index === -1) {
    throw new Error('User not found');
  }
  data.users[index] = {
    ...data.users[index],
    ...newValues,
  };
  return data.users[index];
}

/**
 * @param {number} id - The user's ID.
 */
function remove(id) {
  const index = data.users.findIndex(x => x.id === id);
  if(index === -1) {
    throw new Error('User not found');
  }
  data.users.splice(index, 1);
}


module.exports = {
  getAll, get, search, create, update, remove, login, register
};