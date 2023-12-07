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

const COLLECTION_NAME = 'workouts';
async function getCollection() {
    const db = await connect();
    return db.collection(COLLECTION_NAME);
}

async function getAll() {
    const col = await getCollection();
    return col.find({}).toArray();
}

async function get(id) {
    if(!ObjectId.isValid(id)) return "Invalid ID";

    const col = await getCollection();
    const workout = await col.findOne({ _id: new ObjectId(id) });

    if(!workout) return "Workout not found";

    return workout
}

async function getByName(name) {
    const col = await getCollection();
    return await col.findOne({ name: name });
}

async function add(workout) {
    const col = await getCollection();
    return await col.insertOne(workout);
}

async function update(id, workout) {
    if(!ObjectId.isValid(id)) return null;

    const col = await getCollection();
    delete workout._id;
    return col.updateOne({ _id: new ObjectId(id) }, { $set: workout });
}

async function remove(id) {
    if(!ObjectId.isValid(id)) return null;

    const col = await getCollection();
    return col.deleteOne({ _id: new ObjectId(id) });
}

async function getByUserId(userId) {
    const col = await getCollection();
    return col.find({ user_id: userId }).toArray();
}

module.exports = {
    getAll, get, getCollection, COLLECTION_NAME, getByName, add, update, remove, getByUserId
};