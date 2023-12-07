const { connect } = require('./mongo');

/**
 * @typedef {Object} Exercise
 * @property {string} name - Exercise name.
 * @property {number} id - Exercise id.
 * @property {string} description - Exercise description.
 * @property {string} muscleGroup - Exercise muscle group.
 * @property {string} equipment - Exercise equipment.
 * @property {number} oid - Exercise oid.
 */

const COLLECTION_NAME = 'exercises';
async function getCollection() {
  const db = await connect();
  return db.collection(COLLECTION_NAME);
}

async function getAll() {
  const col = await getCollection();

  return await col.find({}).toArray();
}

async function get(id) {
  const col = await getCollection();
  id = parseInt(id)
  return await col.findOne({ id: id});
}

async function getByName(name) {
  const col = await getCollection();
  return col.findOne({ name: name });
}

module.exports = {
  getAll, get, getCollection, COLLECTION_NAME, getByName
};

