import { useTransactions } from "../contexts/TransactionContext";

function ResetFilters() {
  const { handleResetFilters } = useTransactions();
  return (
    <div className="flex">
      <button
        className="mx-auto cursor-pointer rounded-sm bg-blue-600 px-3 py-2 text-slate-200"
        onClick={handleResetFilters}
      >
        Reset Filters
      </button>
    </div>
  );
}

export default ResetFilters;
