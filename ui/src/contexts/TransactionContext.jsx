import { createContext, useContext, useEffect, useState } from "react";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransaction,
  updateTransaction,
} from "../utils/transactionsApi";

const TransactionContext = createContext();

function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");
  const [frequency, setFrequency] = useState("");
  const [customDates, setCustomDates] = useState({
    startDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    endDate: new Date(Date.now()).toISOString().split("T")[0],
  });
  const [isEditSession, setIsEditSession] = useState({
    value: false,
    transactionId: "",
  });

  const [view, setView] = useState("table");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const getTransactions = async (options) =>
    setTransactions(await getAllTransactions(options));

  useEffect(() => {
    if (!user) return;

    const duration =
      frequency === "custom"
        ? (new Date(customDates.endDate) - new Date(customDates.startDate)) /
            (24 * 60 * 60 * 1000) +
          1
        : frequency;
    if (!isOpen || customDates || type || frequency || user)
      getTransactions({
        userId: user._id,
        transactionType: type,
        transactionDate: duration,
        customDates,
      });
  }, [isOpen, type, customDates, frequency, user]);

  const handleCreateTransaction = async (data) => {
    data.amount = +data.amount;
    await createTransaction(data);
  };

  const handleDeleteTransaction = async (id) => {
    await deleteTransaction(id);
    await getTransactions();
  };

  const handleUpdateTransaction = async (id, data) =>
    await updateTransaction(id, data);

  const handleResetFilters = () => {
    setType("");
    setFrequency("");
    setCustomDates({ startDate: "", endDate: "" });
  };

  const handleGetTransactionById = async (id) => await getTransaction(id);
  return (
    <TransactionContext.Provider
      value={{
        transactions,
        isOpen,
        isEditSession,
        type,
        frequency,
        customDates,
        view,
        user,
        setUser,
        setView,
        setCustomDates,
        setFrequency,
        setType,
        setIsEditSession,
        handleCreateTransaction,
        handleDeleteTransaction,
        handleUpdateTransaction,
        handleGetTransactionById,
        handleResetFilters,
        openModal,
        closeModal,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

function useTransactions() {
  const context = useContext(TransactionContext);

  if (context === undefined)
    throw new Error("Transactions context cannot be used outside its provider");

  return context;
}

export { TransactionProvider, useTransactions };
