const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");

const daysToMilliSecondsMultiplier = 24 * 60 * 60 * 1000;

const getDateRange = (frequency, customDates = {}) => {
  const range = {
    $gte: new Date(
      customDates.startDate ||
        Date.now() - frequency * daysToMilliSecondsMultiplier
    )
      .toISOString()
      .split("T")[0],
    $lte: new Date(customDates.endDate || Date.now())
      .toISOString()
      .split("T")[0],
  };

  return range;
};

exports.getAllTransactions = async (req, res, next) => {
  try {
    const { customDates } = req.query;
    let filter = {};
    if (req.query.userId) filter = { ...filter, user: req.query.userId };
    if (req.query.transactionType)
      filter = { ...filter, transactionType: req.query.transactionType };
    if (req.query.transactionDate)
      filter = {
        ...filter,
        transactionDate: getDateRange(+req.query.transactionDate, customDates),
      };

    const transactions = await Transaction.find(filter);

    return res.status(200).json({
      status: "success",
      length: transactions.length,
      data: {
        transactions,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: "error",
      message: "cannot get all transactions",
    });
  }
};

exports.createTransaction = async (req, res, next) => {
  try {
    const {
      title,
      description,
      amount,
      category,
      transactionType,
      transactionDate,
      user,
    } = req.body;

    if (
      !title ||
      !description ||
      !amount ||
      !category ||
      !transactionType ||
      !transactionDate ||
      !user
    )
      return res
        .status(400)
        .json({ status: "error 1", message: "Please provide all the fields" });

    const currUser = await User.findById(user);

    if (!currUser)
      return res.status(404).json({
        status: "error 2",
        message: "No user found with this id",
      });

    const newTransaction = await Transaction.create({
      title,
      description,
      amount,
      category,
      transactionType,
      transactionDate,
      user,
    });

    if (!newTransaction)
      return res.status(400).json({
        status: "error 3",
        message: "Cannot create transaction",
      });

    currUser.transactions.push(newTransaction._id);
    await currUser.save({ validateBeforeSave: false });

    return res.status(200).json({
      status: "success",
      data: {
        transaction: newTransaction,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "error last",
      message: err.message,
    });
  }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    const { transactionId } = req.params;

    const deletedTransaction =
      await Transaction.findByIdAndDelete(transactionId);

    if (!deletedTransaction)
      return res.status(400).json({
        status: "error 1",
        message: "No transaction found",
      });

    const user = await User.findOne({ _id: deletedTransaction.user });

    user.transactions = user.transactions.filter(
      (transaction) => transaction !== transactionId
    );

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error final",
      message: err.message,
    });
  }
};

exports.editTransaction = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const data = req.body;

    const editedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      data,
      { runValidators: false, new: true }
    );

    if (!editedTransaction)
      return res.status(400).json({
        status: "error",
        message: "Cannot edit the transaction",
      });

    return res.status(200).json({
      status: "success",
      data: {
        transaction: editedTransaction,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getTransactionById = async (req, res, next) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Transaction.findById(transactionId);

    return res.status(200).json({
      status: "success",
      data: {
        transaction,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: "error",
      message: "Transaction not found",
    });
  }
};
