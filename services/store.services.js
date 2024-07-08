const Store = require("../models/Store");

exports.getStoresService = async (filter) => {
  const result = await Store.find(filter);
  return result;
};

exports.createAStoreService = async (data) => {
  const result = await Store.create(data);
  return result;
};

exports.deleteAStoreByIdService = async (id) => {
  const result = await Store.deleteOne(id);
  return result;
};
