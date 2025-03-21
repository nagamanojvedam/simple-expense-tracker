const express = require("express");

const transactionController = require("../controllers/transactionController");

const router = express.Router();

router
  .route("/")
  .get(transactionController.getAllTransactions)
  .post(transactionController.createTransaction);

router
  .route("/:transactionId")
  .get(transactionController.getTransactionById)
  .patch(transactionController.editTransaction)
  .delete(transactionController.deleteTransaction);

module.exports = router;
