import Total from "./Total";
import Category from "./Category";

function ExpensesChart() {
  return (
    <section className="mx-auto grid w-[80%] grow grid-cols-2 grid-rows-2 justify-center gap-8 px-8 pt-8 md:w-[60%]">
      <Total type="transactions" />
      <Total type="turnover" />
      <Category type="credit" />
      <Category type="debit" />
    </section>
  );
}

export default ExpensesChart;
