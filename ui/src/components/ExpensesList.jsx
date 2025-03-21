import { useTransactions } from "../contexts/TransactionContext";
import Actions from "./Actions";

function ExpensesList() {
  const { transactions } = useTransactions();
  return (
    <table className="mx-auto my-4 w-[80%]">
      <thead className="bg-slate-300">
        <tr className="border-b-2 border-slate-400">
          <th className="p-2">S.No</th>
          <th className="p-2">Title</th>
          <th className="p-2">Category</th>
          <th className="p-2">Date</th>
          <th className="p-2">Type</th>
          <th className="p-2">Amount</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody className="bg-slate-200 text-center">
        {transactions.map((transaction, idx) => (
          <tr
            className={`border-b border-slate-400 hover:shadow-lg`}
            key={transaction._id}
          >
            <td className="p-2">{idx + 1}</td>
            <td className="p-2">
              {transaction.title.length > 20
                ? `${transaction.title.slice(0, 17)}...`
                : transaction.title}
            </td>
            <td className="p-2 capitalize">{transaction.category}</td>
            <td className="p-2">{transaction.transactionDate}</td>
            <td className="p-2 capitalize">{transaction.transactionType}</td>
            <td
              className={`${transaction.transactionType === "debit" ? "text-red-500" : "text-green-600"} p-2`}
            >
              {transaction.amount}
            </td>
            <Actions id={transaction._id} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpensesList;
