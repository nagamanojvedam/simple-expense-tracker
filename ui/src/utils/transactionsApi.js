import axios from "axios";

const apiURL = "http://localhost:3000";

const getAllTransactions = async (params) => {
  const {
    data: {
      data: { transactions },
    },
  } = await axios(`${apiURL}/api/v1/transactions`, {
    params,
  });
  return transactions;
};

const createTransaction = async (data) => {
  console.log(data);
  try {
    const response = await axios(`${apiURL}/api/v1/transactions`, {
      method: "POST",
      data,
    });

    console.log(response.data);
  } catch (error) {
    console.error(
      "Error creating transaction:",
      error.response || error.message,
    );
  }
};

const deleteTransaction = async (id) => {
  try {
    await axios(`${apiURL}/api/v1/transactions/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.err("Error deleting transaction: ", err.response || err.message);
  }
};

const updateTransaction = async (id, data) => {
  try {
    await axios(`${apiURL}/api/v1/transactions/${id}`, {
      method: "PATCH",
      data,
    });
  } catch (err) {
    console.err("Error updating transaction: ", err.response || err.message);
  }
};

const getTransaction = async (id) => {
  try {
    const {
      data: {
        data: { transaction },
      },
    } = await axios(`${apiURL}/api/v1/transactions/${id}`);

    return transaction;
  } catch (err) {
    console.err(
      "Error getting transaction details: ",
      err.response || err.message,
    );
  }
};

export {
  getAllTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
  getTransaction,
};
