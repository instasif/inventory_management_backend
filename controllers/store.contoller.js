const storeServices = require("../services/store.services");

exports.getStores = async (req, res, next) => {
  try {
    const filter = {};
    const result = await storeServices.getStoresService(filter);
    res.status(200).json({
      status: "successful",
      message: "All the stores",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "cant find stores",
      error: error,
    });
  }
};

exports.createAStore = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await storeServices.createAStoreService(data);
    res.status(200).json({
      status: "Successful",
      message: "created a store",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "can't create a store",
      error: error,
    });
  }
};

exports.deleteAStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await storeServices.deleteAStoreByIdService(id);
    res.status(200).json({
      status: "Successful",
      message: "successfully deleted the store",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "can't delete the store",
      error: error,
    });
  }
};
