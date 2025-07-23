let productModel = require("../../model/products.model");

let productInsert = async (req, res) => {
  try {
    let {
      p_name,
      p_varient,
      p_discount,
      p_displayPrice,
      p_price,
      p_code,
      p_brand,
      p_color,
      p_display,
      p_camera,
      p_processor,
      p_battery,
      p_condition,
      p_discription,
      p_accessories,
    } = req.body;

    let p_images = "";
    if (req.file) {
      p_images = req.file.filename;
    }

    const product = new productModel({
      p_name,
      p_varient,
      p_discount,
      p_displayPrice,
      p_price,
      p_code,
      p_brand,
      p_color,
      p_display,
      p_camera,
      p_processor,
      p_battery,
      p_condition,
      p_discription,
      p_accessories,
      p_images,
    });

    await product.save();

    res.send({ status: 1, message: "Product Inserted Successfully", product });
  } catch (err) {
    console.log("Error in saving product:", err);
    res
      .status(500)
      .send({ status: 0, message: "Error saving product", error: err.message });
  }
};

let productsList = async (req, res) => {
  let productList = await productModel.find();
  res
    .status(200)
    .json({ status: 1, message: "Products List", data: productList });
};

let deleteProduct = async (req, res) => {
  let productId = req.params.id;
  let deleteProduct = await productModel.deleteOne({ _id: productId });

  res.send({
    status: 1,
    message: "Product Deleted Sucessfully",
    id: productId,
    delRes: deleteProduct,
  });
};
let updateProduct = async (req, res) => {
  let productId = req.params.id;
  try {
    let {
      p_name,
      p_varient,
      p_discount,
      p_displayPrice,
      p_price,
      p_code,
      p_brand,
      p_color,
      p_display,
      p_camera,
      p_processor,
      p_battery,
      p_condition,
      p_discription,
      p_accessories,
    } = req.body;

    let updateProduct = {
      p_name,
      p_varient,
      p_discount,
      p_displayPrice,
      p_price,
      p_code,
      p_brand,
      p_color,
      p_display,
      p_camera,
      p_processor,
      p_battery,
      p_condition,
      p_discription,
      p_accessories,
    };

    if (req.file) {
      updateProduct.p_images = req.file.filename;
    }

    let updateRes = await productModel.updateOne(
      { _id: productId },
      updateProduct
    );

    res.send({ status: 1, message: "Product Updated Successfully", updateRes });
  } catch (err) {
    console.log("Error in updating product:", err);
    res.status(500).send({
      status: 0,
      message: "Error updating product",
      error: err.message,
    });
  }
};

module.exports = { productInsert, productsList, deleteProduct, updateProduct };
