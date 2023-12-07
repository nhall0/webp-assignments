const { ObjectId, connect } = require('./mongo');

/**
 * @typedef {Object} Goal
 * @property {number} id - Goal ID.
 * @property {string} owner - Exercise owner.
 * @property {string} description - Exercise description.
 * @property {string} muscleGroup - Exercise muscle group.
 * @property {string} equipment - Exercise equipment.
 */

const COLLECTION_NAME = 'goals';
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
  return col.findOne({ _id: new ObjectId(id) });
}

async function getByIds(ids) {
  const col = await getCollection();
  return col.find({ _id: { $in: ids.map(id => new ObjectId(id)) } }).toArray();
}

async function getByUserId(userId) {
  const col = await getCollection();
  return col.find({ user_id: userId }).toArray();
}

async function add(goal) {
  const col = await getCollection();
  delete goal._id;
  return col.insertOne(goal);
}

async function update(id, goal) {
  const col = await getCollection();
  return col.updateOne({ _id: new ObjectId(id) }, { $set: goal });
}

async function remove(id) {
  const col = await getCollection();
  return col.deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
  getAll, get, getCollection, COLLECTION_NAME, getByIds, add, update, remove, getByUserId
};