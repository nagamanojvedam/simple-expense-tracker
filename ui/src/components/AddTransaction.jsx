import { useTransactions } from "../contexts/TransactionContext";

function AddTransaction() {
  const { openModal } = useTransactions();
  return (
    <div>
      <button
        onClick={openModal}
        className="rounded-sm bg-blue-600 p-2 text-slate-200"
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
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
}

export default AddTransaction;
