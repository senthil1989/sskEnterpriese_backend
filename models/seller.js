const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const sellerSchema = new mongoose.Schema(
    {
        companyname: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: 32
          },
        address: {
            type: String,
            trim: true,
            required: true,
            maxlength: 400
        },
        user: { type: ObjectId, ref: "Users" },
        history: {
            type: Array,
            default: []
          },
        phonenum: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Seller", sellerSchema);