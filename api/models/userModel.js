const mongoose = require("mongoose");
const validator = require("email-validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name is required"],
  },
  email: {
    type: String,
    required: [true, "An email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.validate, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must be atleast 8 characters"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (value) {
        // console.log(value, this.password);
        return this.password === value;
      },
      message: "Passwords do not match",
    },
  },
  avatar: {
    type: String,
    default: "./avatars/default.png",
  },
  isAvatarSet: {
    type: Boolean,
    default: false,
  },
  transactions: {
    type: [mongoose.Schema.ObjectId],
    ref: "Transaction",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  passwordChangedAt: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.populate({ path: "transactions", select: "-__v" });
  next();
});

module.exports = mongoose.model("User", userSchema);
