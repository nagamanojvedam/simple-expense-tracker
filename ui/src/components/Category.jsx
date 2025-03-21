import { useEffect } from "react";
import { useTransactions } from "../contexts/TransactionContext";
import { useState } from "react";
import CategoryItem from "./CategoryItem";

function Category({ type }) {
  const { transactions } = useTransactions();
  const [data, setData] = useState([
    {
      name: "",
      amount: 0,
    },
  ]);

  useEffect(() => {
    const categories = {};

    transactions.forEach((item) => {
      if (item.transactionType === type)
        if (!categories[item.category]) categories[item.category] = item.amount;
        else categories[item.category] += item.amount;
    });

    const newObj = Object.entries(categories).map((item) => {
      return { name: item[0], amount: item[1] };
    });
    setData(newObj);
  }, [transactions, type]);

  const totalAmount = data.reduce((res, curr) => res + curr.amount, 0);
  return (
    <section className="rounded-sm">
      <h3 className="bg-slate-600 px-3 py-2 text-lg font-semibold text-white">
        Categorywise {type === "credit" ? "Income" : "Expense"}
      </h3>
      <div className="flex max-h-[280px] flex-col gap-1 overflow-y-auto bg-slate-200 px-6 py-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-track]:bg-gray-50">
        {data.map((el, idx) => (
          <CategoryItem
            item={el}
            key={el.name}
            totalAmount={totalAmount}
            idx={idx}
          />
        ))}
      </div>
    </section>
  );
}

export default Category;
