const express = require('express');
const router = express.Router();
const {sellerValidator}=require('../validator')
const {
    create
} = require("../controllers/seller");
const {requireSignin, isAuth}=require("../controllers/auth");

const {userById}=require("../controllers/user");
router.post('/seller/create/:userId',requireSignin, isAuth,sellerValidator,create);
router.param('userId',userById);
module.exports =router;
