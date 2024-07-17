const supplierServices = require("../services/supplier.services");

exports.getsuppliers = async (req, res, next) => {
  try {
    const filters = {};
    const suppliers = await supplierServices.getSuppliersService(filters);
    res.status(200).json({
      status: "success",
      message: "All the datas",
      data: suppliers,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "couldn't get the supplier",
    });
  }
};

exports.getSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await supplierServices.getSupplierByIdService(id);
    if (!supplier) {
      res.status(400).json({
        status: "success",
        message: "couldn't find the supplier with this id",
      });
    }
    res.status(200).json({
      status: "success",
      message: "get the data bt id",
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "couldn't get the brand by id",
    });
  }
};

exports.createsupplier = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await supplierServices.createSupplierService(data);
    res.status(200).json({
      status: "success",
      message: "Successfully created the supplier",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "couldn't create the supplier",
    });
  }
};

exports.updateSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await supplierServices.updateSupplierService(id, data);
    if (!result.nModified) {
      return res.status(400).json({
        status: "failed",
        error: "couldn't update the supplier by this id",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully updated the supplier",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "couldn't update the supplier",
    });
  }
};
