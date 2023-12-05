const { ObjectId, connect } = require('./mongo');

/**
 * @typedef {Object} Workout
 * @property {string} name - Workout name.
 * @property {ObjectId} owner - Workout owner.
 * @property {Array<string>} exercises - Workout exercises.
 * @property {number} sets - num sets
 * @property {string} reps - num reps
 * @property {number} privacy - 0 = public, 1 = private
 */

/**
 * 
 * @typedef {Object} HasId
 * @property {string} _id - The ID of the document.
 */

const COLLECTION_NAME = 'workouts';
async function getCollection() {
    const db = await connect();
    return db.collection(COLLECTION_NAME);
}

/**
 * @returns {Promise<Workout[]>}
 */
async function getAll() {
    const col = await getCollection();
    return col.find({}).toArray();
}

/**
 * @param {string} id - Index id.
 */
async function get(id) {
    const col = await getCollection();
    return col.findOne({ _id: ObjectId(id) });
}

async function getByName(name) {
    const col = await getCollection();
    return col.findOne({ name: name });
}

async function add(workout) {
    const col = await getCollection();
    return col.insertOne(workout);
}

async function update(id, workout) {
    const col = await getCollection();
    return col.updateOne({ _id: ObjectId(id) }, { $set: workout });
}

async function remove(id) {
    const col = await getCollection();
    return col.deleteOne({ _id: ObjectId(id) });
}

async function getByUserId(userId) {
    const col = await getCollection();
    return col.find({ owner: userId }).toArray();
}

module.exports = {
    getAll, get, getCollection, COLLECTION_NAME, getByName, add, update, remove, getByUserId
};