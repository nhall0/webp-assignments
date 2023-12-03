/* B"H
*/

const { ObjectId, connect } = require('./mongo');
const data = require("../data/products.json");

/**
 * @typedef {Object} Product
 * @property {number} id - The product's ID.
 * @property {string} title - The product's title.
 * @property {string} description - The product's description.
 * @property {number} price - The product's price.
 * @property {number} discountPercentage - The product's discount percentage.
 * @property {number} rating - The product's rating.
 * @property {number} stock - The product's stock.
 * @property {string} brand - The product's brand.
 * @property {string} category - The product's category.
 * @property {string} thumbnail - The product's thumbnail.
 * @property {string[]} images - The product's images.
 */

const COLLECTION_NAME = 'products';
async function getCollection() {
  const db = await connect();
  return db.collection(COLLECTION_NAME);
}


/**
 * @returns {Promise<Product[]>} An array of products.
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
  return col.findOne({ _id: ObjectId(id) });
}

async function getByCategory(category) {
  const col = await getCollection();
  return await col.findOne({ category });
}

async function search(query) {
  const col = await getCollection();
  const products = await col.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } }
    ],
  }).toArray();
}

/**
 * @param {Product} product - The product to create.
 * @returns {Product} The created product.
 */
async function create(product) {
  const newProduct = {
    id: data.products.length + 1,
    ...product,
  };
  const col = await getCollection();
  const result = await col.insertOne(newProduct);


  return newProduct;
}

/**
 * @param {Product} product - The product's data.
 * @returns {Product} The updated product.
 */
async function update(product) {
  const col = await getCollection();
  const result = await col.updateOne(
    { _id: ObjectId(product.id) },
    { $set: product }
  );
  return result;
}

/**
 * @param {number} id - The product's ID.
 */
async function remove(id) {
  const col = await getCollection();
  const result = await col.deleteOne({ _id: ObjectId(id) });
  if(result.deletedCount === 0) throw new Error(`Could not delete product ${id}`);
  return result;
}


module.exports = {
  getAll, get, getByCategory, search, create, update, remove, getCollection, COLLECTION_NAME
};

