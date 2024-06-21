const Brand = require("../models/Brand");

exports.createBrandService = async (data) => {
  const result = await Brand.create(data);
  return result;
};

exports.getBrandsService = async (filters) => {
  const result = await Brand.find(filters).select("-products -suppliers");
  return result;
};

exports.getBrandByIdService = async (id) => {
  const result = await Brand.findOne({ _id: id });
  return result;
};

//06 Create Brand Routes 19:26 / 23:40
