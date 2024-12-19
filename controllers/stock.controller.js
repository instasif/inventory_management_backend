const stockServices = require("../services/stock.services");

exports.getStocks = async (req, res, next) => {
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

    const stocks = await stockServices.getStockService(filters, quaries);
    res.status(200).json({
      status: "success",
      message: "All the datas",
      data: stocks,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Data couldn't find",
      error: error.message,
    });
  }
};

exports.getstoksById = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await stockServices.getStocksById(id);
    if (!stock) {
      res.status(400).json({
        status: "failed",
        error: "Data couldn't get the stock with this id",
      });
    }
    res.status(200).json({
      status: "success",
      message: "All the datas",
      data: stock,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Data couldn't find by id",
      error: error.message,
    });
  }
};

exports.createAStock = async (req, res, next) => {
  try {
    //! create
    const result = await stockServices.createAStockService(req.body);
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
      error: error,
    });
  }
};

exports.updateAStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await stockServices.updateAStockService(id, data);
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

exports.bulkUpdateStock = async (req, res, next) => {
  try {
    const result = await stockServices.bulkUpdateStockService(req.body);
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

exports.deleteStockById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await stockServices.daleteStockByIdService(id);

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

exports.bulkDeleteStocks = async (req, res, next) => {
  try {
    const result = await stockServices.bulkDaleteStocksService(req.body.ids);
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
