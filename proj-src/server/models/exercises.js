/* B"H
*/

const { ObjectId, connect } = require('./mongo');

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

/**
 * @returns {Promise<Exercise[]>} An array of products.
 */
async function getAll() {
  const col = await getCollection();
  return col.find({}).toArray();
}


/**
 * @param {number} id - Index id.
 */

async function get(id) {
  const col = await getCollection();
  return col.findOne({ _id: ObjectId(id) });
}

module.exports = {
  getAll, get, getCollection, COLLECTION_NAME
};

