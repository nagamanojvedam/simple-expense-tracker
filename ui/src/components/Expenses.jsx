import Filters from "./Filters";
import ResetFilters from "./ResetFilters";
import ExpensesList from "./ExpensesList";
import CustomDatesSelector from "./CustomDatesSelector";
import { useTransactions } from "../contexts/TransactionContext";
import ExpensesChart from "./ExpensesChart";

function Expenses() {
  const { view, frequency } = useTransactions();
  return (
    <section className="flex grow flex-col gap-3">
      <Filters />
      {frequency === "custom" && <CustomDatesSelector />}
      <ResetFilters />
      {view === "table" ? <ExpensesList /> : <ExpensesChart />}
    </section>
  );
}

export default Expenses;
