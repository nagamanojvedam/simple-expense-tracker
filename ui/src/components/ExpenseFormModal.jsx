import { useTransactions } from "../contexts/TransactionContext";
import { useForm } from "react-hook-form";

const initialState = {
  title: "vegetables",
  amount: "120",
  category: "groceries",
  description: "bought vegetables",
  transactionDate: "2025-03-15",
  transactionType: "credit",
};
// const initialState = {};

function ExpenseFormModal({ id, type = "Add" }) {
  const {
    handleCreateTransaction,
    handleGetTransactionById,
    handleUpdateTransaction,
    closeModal,
    setIsEditSession,
  } = useTransactions();

  const { handleSubmit, register, reset } = useForm({
    defaultValues:
      type === "Edit"
        ? async () => await handleGetTransactionById(id)
        : initialState,
  });

  const { _id: userId } = JSON.parse(localStorage.getItem("user"));
  console.log(userId);

  const handleClearForm = () => reset();

  const onSubmit = async (data) => {
    if (type === "Edit")
      await handleUpdateTransaction(id, {
        title: data.title,
        amount: data.amount,
        description: data.description,
        transactionDate: data.transactionDate,
        transactionType: data.transactionType,
        user: userId,
        category: data.category,
      });
    else await handleCreateTransaction({ ...data, user: userId });
    reset();
    closeModal();
    setIsEditSession({ value: false, transactionId: "" });
  };

  return (
    <div
      onClick={closeModal}
      className="absolute top-0 left-0 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-900/70"
    >
      <div
        onClick={(evnt) => evnt.stopPropagation()}
        className="flex w-[540px] flex-col divide-y-1 divide-slate-200 rounded-lg bg-white"
      >
        <header className="flex justify-between p-4">
          <h2 className="text-xl font-semibold">{type} Transaction Details</h2>
          <button
            onClick={closeModal}
            className="cursor-pointer hover:text-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 px-4 py-5"
        >
          <div className="flex flex-col space-y-2">
            <span>Title</span>
            <input
              type="text"
              placeholder="Enter Transaction Title"
              {...register("title")}
              className="rounded-sm border-1 border-slate-300 px-3 py-1 focus:border-blue-400 focus:outline-2 focus:outline-blue-300/80"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <span>Amount</span>
            <input
              type="number"
              {...register("amount")}
              className="rounded-sm border-1 border-slate-300 px-3 py-1 focus:border-blue-400 focus:outline-2 focus:outline-blue-300/80"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <span>Category</span>
            <div className="relative">
              <select
                name="category"
                id="category"
                {...register("category")}
                className="w-full appearance-none rounded-sm border-1 border-slate-300 px-3 py-1 focus:border-blue-400 focus:outline-2 focus:outline-blue-300/80"
              >
                <option value="">Choose...</option>
                <option value="groceries">Groceries</option>
                <option value="rent">Rent</option>
                <option value="salary">Salary</option>
                <option value="tip">Tip</option>
                <option value="food">Food</option>
                <option value="medical">Medical</option>
                <option value="utilities">Utilities</option>
                <option value="entertainment">Entertainment</option>
                <option value="transportation">Transportation</option>
                <option value="other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <span>Description</span>
            <textarea
              name="description"
              {...register("description")}
              className="h-24 rounded-sm border-1 border-slate-300 px-3 py-1 focus:border-blue-400 focus:outline-2 focus:outline-blue-300/80"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <span>Transaction Type</span>
            <div className="relative">
              <select
                name="transactionType"
                {...register("transactionType")}
                className="w-full appearance-none rounded-sm border-1 border-slate-300 px-3 py-1 pr-8 focus:border-blue-400 focus:outline-2 focus:outline-blue-300/80"
              >
                <option value="">Choose...</option>
                <option value="debit">Debit</option>
                <option value="credit">Credit</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.0}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <span>Date</span>
            <input
              type="date"
              name="transactionDate"
              {...register("transactionDate")}
              className="rounded-sm border-1 border-slate-300 px-3 py-1 focus:border-blue-400 focus:outline-2 focus:outline-blue-300/80"
            />
          </div>
        </form>
        <section className="flex justify-end gap-2 p-4">
          <button
            onClick={() => handleClearForm()}
            className="cursor-pointer rounded-md bg-stone-500 px-3 py-1.5 text-slate-200"
          >
            Clear
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="cursor-pointer rounded-md bg-blue-600 px-3 py-1.5 text-slate-200"
          >
            Submit
          </button>
        </section>
      </div>
    </div>
  );
}

export default ExpenseFormModal;
