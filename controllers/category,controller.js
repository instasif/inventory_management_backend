const categoryService = require("../services/category.services");

exports.createACategory = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await categoryService.createACategoryService(data);
    res.status(200).json({
      status: "Successful",
      message: "Successfully created the category",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "couldn't create the category",
      error: error,
    });
  }
};

exports.deleteACategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await categoryService.deleteACategoryService(id);
    res.status(200).json({
      status: "successful",
      message: "Deleted the data",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "couldn't delete the category",
      error: error,
    });
  }
};
