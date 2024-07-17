const Supplier = require("../models/Supplier");

exports.createSupplierService = async (data) => {
  const result = await Supplier.create(data);
  return result;
};

exports.getSuppliersService = async (filters) => {
  const result = await Supplier.find(filters).populate("products");
  return result;
};

exports.getSupplierByIdService = async (id) => {
  const result = await Supplier.findOne({ _id: id });
  return result;
};

exports.updateSupplierService = async (id, data) =>{
  const result = await Supplier.updateOne({_id: id}, data);
  return result
}