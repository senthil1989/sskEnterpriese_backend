const formidable = require("formidable");
const  _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        err: "Product not found",
      });
    }
    req.product = product;
    next();
  });
};

exports.read =(req,res)=>{
    req.product.photo =undefined;
    return res.json(
        req.product)
}

exports.remove=(req,res)=>{
    let product= req.product;
    product.remove((err,deleteProduct)=>{
        if(err){
            return res.status(400).json({
                err: errorHandler(err),
        })
    }
   res.json({
        message:"Product was sucessfully deleted"
    })
})
}
exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image couldn't be uploaded",
      });
    }
    // check all the fields
    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    const product = new Product(fields);
    if (files.photo) {
      console.log("PHOTO FILES", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size ",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, data) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }
      res.json({ data });
    });
  });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image couldn't be uploaded",
        });
      }
      // check all the fields
      const { name, description, price, category, quantity, shipping } = fields;
      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !quantity ||
        !shipping
      ) {
        return res.status(400).json({
          error: "All fields are required",
        });
      }
      let product = req.product;
      product =_.extend(product,fields)
      if (files.photo) {
        console.log("PHOTO FILES", files.photo);
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            error: "Image should be less than 1mb in size ",
          });
        }
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }
      product.save((err, data) => {
        if (err) {
          return res.status(400).json({
            err: errorHandler(err),
          });
        }
        res.json({ data });
      });
    });
  };
