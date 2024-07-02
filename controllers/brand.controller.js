const brandServices = require("../services/brand.services");

exports.getBrands = async (req, res, next) => {
  try {
    const filters = {};
    const brands = await brandServices.getBrandsService(filters);
    res.status(200).json({
      status: "success",
      message: "All the datas",
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "couldn't get the brand",
    });
  }
};

exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await brandServices.getBrandByIdService(id);
    if (!brand) {
      res.status(400).json({
        status: "success",
        message: "couldn't find the brand with this id",
      });
    }
    res.status(200).json({
      status: "success",
      message: "get the data bt id",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "couldn't get the brand by id",
    });
  }
};

exports.createBrand = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await brandServices.createBrandService(data);
    res.status(200).json({
      status: "success",
      message: "Successfully created the brand",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "couldn't create the brand",
    });
  }
};

exports.updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await brandServices.updateBrandService(id, data);
    if (!result.nModified) {
      return res.status(400).json({
        status: "failed",
        error: "couldn't update the brand by this id",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully updated the brand",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "couldn't update the brand",
    });
  }
};
