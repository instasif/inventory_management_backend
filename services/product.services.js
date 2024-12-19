const Brand = require("../models/Brand");
const Product = require("../models/Products");

exports.getProductService = async (filters, quaries) => {
  
  const product = await Product.find(filters)
    .skip(quaries.skip)
    .limit(quaries.limit)
    .select(quaries.fields)
    .sort(quaries.sortBy);
  const total = await Product.countDocuments(filters);
  const page = await Math.ceil(total / quaries.limit);
  return { total, page, product };
};

exports.createAProductService = async (data) => {
  const product = await Product.create(data);
  const { _id: productId, brand } = product;

  //Todo:  save the product id on the dedicated brand name data
  const res = await Brand.updateOne(
    //?kon brand a save korte chacchi
    { _id: brand.id },
    //?kon product ta save korte chacchi
    { $push: { products: productId } }
  );
  
  return product, res;
};

exports.updateAProductService = async (productId, data) => {
  // const result = await Product.updateOne(
  //   { _id: productId },
  //   { $set: data },
  //   { runValidators: true }
  // );

  const product = await Product.findById(productId);
  const result = await product.set(data).save();
  return result;
};

exports.bulkUpdateProductService = async (data) => {
  // const result = await Product.updateMany({ _id: data.ids }, data.datas, {
  //   runValidators: true,
  // });

  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });
  const result = await Promise.all(products);
  return result;
};

exports.daleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.bulkDaleteProductsService = async (ids) => {
  const result = await Product.deleteMany({});
  return result;
};
