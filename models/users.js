const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: 32
    },
    hashed_password: {
      type: String,
      required: true
    },
    details: {
      type: String,
      trim: true
    },
    salt: String,
    role: {
      type: Number,
      default: 0
    },
    history: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
);

// Virtual Field
userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });
userSchema.methods = {
  authenticate: function(text){
    return this.encryptPassword(text) === this.hashed_password; 
  },
  encryptPassword: function(password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      console.log(err);
      return "";
    }
  }
};
module.exports = mongoose.model("Users", userSchema);
