const Stock = require("../models/Stock");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

exports.getStockService = async (filters, quaries) => {
  const product = await Stock.find(filters)
    .skip(quaries.skip)
    .limit(quaries.limit)
    .select(quaries.fields)
    .sort(quaries.sortBy);

  // const stocks = await Stock.aggregate([
  //   { $match: { "store.name": "chottogram" } },
  // ]);

  const total = await Stock.countDocuments(filters);
  const page = Math.ceil(total / quaries.limit); //await
  return { total, page, product };
};

exports.getStocksById = async (id) => {
  // const stock = await Stock.findOne({ _id: id })
  //   .populate("store.id")
  //   .populate("supplier.id")
  //   .populate("brand.id");

  //Todo: (Aggregate))
  const stock = await Stock.aggregate([
    //!stage1
    { $match: { _id: objectId(id) } },
    {
      $project: {
        name: 1,
        productId: 1,
        price: 1,
        category: 1,
        quantity: 1,
      },
    },
    {
      $lookup: {
        from: "brands",
        localField: "brand.name",
        foreignField: "name",
        as: "brandDetails",
      },
    },
  ]);

  return stock;
};

exports.createAStockService = async (data) => {
  const product = await Stock.create(data);
  return product;
};

exports.updateAStockService = async (productId, data) => {
  const result = await Stock.updateOne(
    { _id: productId },
    { $set: data },
    { runValidators: true }
  );

  //   const product = await Stock.findById(productId);
  //   const result = await Stock.set(data).save();
  return result;
};

exports.bulkUpdateStockService = async (data) => {
  // const result = await Stock.updateMany({ _id: data.ids }, data.datas, {
  //   runValidators: true,
  // });

  const products = [];
  data.ids.forEach((product) => {
    products.push(Stock.updateOne({ _id: Stock.id }, Stock.data));
  });
  const result = await Promise.all(products);
  return result;
};

exports.daleteStockByIdService = async (id) => {
  const result = await Stock.deleteOne({ _id: id });
  return result;
};

exports.bulkDaleteStocksService = async (ids) => {
  const result = await Stock.deleteMany({});
  return result;
};
