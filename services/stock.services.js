const Stock = require("../models/Stock");

exports.getStockService = async (filters, quaries) => {
  console.log(quaries);
  const product = await Stock.find(filters)
    .skip(quaries.skip)
    .limit(quaries.limit)
    .select(quaries.fields)
    .sort(quaries.sortBy);
  const total = await Stock.countDocuments(filters);
  const page = await Math.ceil(total / quaries.limit);
  return { total, page, product };
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
