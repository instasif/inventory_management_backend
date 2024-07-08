const Category = require("../models/Category");

exports.createACategoryService = async (data) => {
  const result = await Category.create(data);
  return result;
};

exports.deleteACategoryService = async (id) => {
  const result = await Category.deleteOne({ _id: id });
  return result;
};
