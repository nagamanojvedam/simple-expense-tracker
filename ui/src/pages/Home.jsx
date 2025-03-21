import { useTransactions } from "../contexts/TransactionContext";
import AppLayout from "../components/AppLayout";
import ExpenseFormModal from "../components/ExpenseFormModal";

function Home() {
  const {
    isOpen,
    isEditSession: { value: isEdit, transactionId },
  } = useTransactions();

  return (
    <div className="relative">
      <AppLayout />
      {isOpen &&
        (isEdit ? (
          <ExpenseFormModal type="Edit" id={transactionId} />
        ) : (
          <ExpenseFormModal />
        ))}
    </div>
  );
}

export default Home;
