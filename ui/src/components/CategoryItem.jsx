import { colors } from "../utils/helpers";

function CategoryItem({ item, totalAmount, idx }) {
  const percentage = Math.round((item.amount / totalAmount) * 100);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between px-1 font-semibold">
        <span className="capitalize">{item.name}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-6 w-full rounded-lg bg-white">
        <div
          className="h-full rounded-lg bg-slate-400"
          style={{ width: `${percentage}%`, backgroundColor: `${colors[idx]}` }}
          // className={`h-full rounded-lg w-[${percentage}%] bg-[${colors[idx]}]`}
        ></div>
      </div>
    </div>
  );
}
export default CategoryItem;
