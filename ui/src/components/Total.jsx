import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useTransactions } from "../contexts/TransactionContext";
import { useState } from "react";
import { useEffect } from "react";

const COLORS = ["#00c42a", "#ff4242"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function Total({ type = "turnover" }) {
  const { transactions } = useTransactions();
  const [data, setData] = useState([
    { name: "Income", value: 0 },
    { name: "Expense", value: 0 },
  ]);

  useEffect(() => {
    const expenseData = transactions.reduce(
      (res, curr) =>
        curr.transactionType === "debit"
          ? type === "transactions"
            ? res + 1
            : res + curr.amount
          : res,
      0,
    );
    const incomeData = transactions.reduce(
      (res, curr) =>
        curr.transactionType === "credit"
          ? type === "transactions"
            ? res + 1
            : res + curr.amount
          : res,
      0,
    );
    setData([
      { name: "Income", value: incomeData },
      { name: "Expense", value: expenseData },
    ]);
  }, [transactions, type]);

  return (
    <section className="bg-slate-100">
      <h3 className="bg-slate-600 px-3 py-2 text-lg font-semibold text-white capitalize">
        Total {type}: {data[0].value + data[1].value}
      </h3>
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-1 py-1">
          <p className="font-semibold text-green-500">
            Income(+) : {data[0].value}
          </p>
          <p className="font-semibold text-red-500">
            Expense(-) : {data[1].value}
          </p>
        </div>
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
    </section>
  );
}

export default Total;
