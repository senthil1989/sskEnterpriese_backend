const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const ReviewSchema = new mongoose.Schema(
    {
      rating: {
        type: Number,
        default: 0
        },
        name:{
          type:String
        },
        isreviewed:{
          type: Boolean,
          default: false
        },
      productId: { type: ObjectId, ref: "Product" },
      userId: { type: ObjectId, ref: "Users" },
      content: {
        type: String,
        required: true,
        maxlength: 2000
        },
    },
    { timestamps: true }
  );
module.exports = mongoose.model("Reviews", ReviewSchema);