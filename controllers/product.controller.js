const Product = require("../models/Products");
const productServices = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
    //Todo---> exclude queries
    let filters = { ...req.query };
    const excludeObj = ["sort", "page", "limit"];
    excludeObj.forEach((fields) => delete filters[fields]);

    //Todo---> gt, lt, gte, lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filtersString);
    // console.log(filters);
    //Todo---> price, quantity => price quantity
    const quaries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      quaries.sortBy = sortBy;
    }

    //Todo---> name,price ==> name price
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      quaries.fields = fields;
    }

    if (req.query.page) {
      //Todo---> 50 products / each page 10 products
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      quaries.skip = skip;
      quaries.limit = parseInt(limit);
    }

    const products = await productServices.getProductService(filters, quaries);
    res.status(200).json({
      status: "success",
      message: "All the datas",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Data couldn't find",
      error: error.message,
    });
  }
};

exports.createAProduct = async (req, res, next) => {
  try {
    //! create
    const result = await productServices.createAProductService(req.body);
    result.logger();
    //! save
    // const product = new Product(req.body);

    // const result = await product.save();

    res.status(200).json({
      status: "success",
      message: "Inserted data successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Data isn't inserted",
      error: error.message,
    });
  }
};

exports.updateAProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await productServices.updateAProductService(id, data);
    res.status(200).json({
      status: "success",
      message: `data updated successfully`,
      info: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "couldn't update a product",
      error: error.message,
    });
  }
};

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const result = await productServices.bulkUpdateProductService(req.body);
    res.status(200).json({
      status: "success",
      message: `data updated successfully`,
      info: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "couldn't bulk update",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productServices.daleteProductByIdService(id);

    if (!Product.id) {
      return res.status(400).json({
        status: "failed",
        error: "couldn't find the product",
      });
    }
    if (!result.deletedCount) {
      return res.status(400).json({
        status: "failed",
        error: "couldn't delete the product",
      });
    }
    res.status(200).json({
      status: "success",
      message: `data deleted successfully`,
      info: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "couldn't delete product",
      error: error.message,
    });
  }
};

exports.bulkDeleteProducts = async (req, res, next) => {
  try {
    const result = await productServices.bulkDaleteProductsService(
      req.body.ids
    );
    res.status(200).json({
      status: "success",
      message: `data deleted successfully`,
      info: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "couldn't delete products",
      error: error.message,
    });
  }
};
