const { get: getUsers } = require('./users');
const { get: getWorkouts } = require('./workouts');
const { ObjectId, connect } = require('./mongo');

/**
 * @typedef {Object} Post
 * @property {number} id - post ID.
 * @property {string} owner - Exercise owner.
 * @property {string} name - Exercise description.
 * @property {string} workout - Exercise muscle group.
 * @property {string} date - Exercise equipment.
 */

const COLLECTION_NAME = 'posts';
async function getCollection() {
  const db = await connect();
  return db.collection(COLLECTION_NAME);
}

async function getAll() {
  const col = await getCollection();
  const posts = await col.find({}).toArray();

  for (const post of posts) {
    post.owner_name = (await getUsers(post.owner)).username;
    post.workout = (await getWorkouts(post.workout)).name;
  }

  return posts  
}

async function get(id) {
  const col = await getCollection();
  return col.findOne({ _id: ObjectId(id) });
}

async function getByIds(ids) {
  const col = await getCollection();
  return col.find({ _id: { $in: ids.map(id => ObjectId(id)) } }).toArray();
}

async function getByUserId(userId) {
  const col = await getCollection();
  return await col.find({ user_id: userId }).toArray();
}

async function add(post) {
  const col = await getCollection();
  return col.insertOne(post);
}

async function update(id, post) {
  const col = await getCollection();
  return col.updateOne({ _id: ObjectId(id) }, { $set: post });
}

async function remove(id) {
  const col = await getCollection();
  return col.deleteOne({ _id: ObjectId(id) });
}

module.exports = {
  getAll, get, getCollection, COLLECTION_NAME, getByIds, add, update, remove, getByUserId
};