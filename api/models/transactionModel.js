const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A title for transaction is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "A Description is required"],
  },
  amount: {
    type: Number,
    required: [true, "An Amount is required"],
  },
  category: {
    type: String,
    required: [true, "A Category is required"],
  },
  transactionType: {
    type: String,
    enum: ["credit", "debit"],
    required: [true, "A Transaction type is required"],
  },
  transactionDate: {
    type: String,
    required: [true, "A Transaction date is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A User is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
