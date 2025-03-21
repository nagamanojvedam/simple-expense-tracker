import { useTransactions } from "../contexts/TransactionContext";

function CustomDatesSelector() {
  const { customDates, setCustomDates } = useTransactions();
  return (
    <section className="mb-4 flex justify-center gap-8">
      <span className="flex flex-col gap-1">
        <label className="font-semibold">Start Date</label>
        <input
          type="date"
          className="rounded-sm bg-white px-3 py-2"
          value={customDates.startDate}
          onChange={(evnt) =>
            setCustomDates((prev) => {
              return { ...prev, startDate: evnt.target.value };
            })
          }
        />
      </span>
      <span className="flex flex-col gap-1">
        <label className="font-semibold">End Date</label>
        <input
          type="date"
          className="rounded-sm bg-white px-3 py-2"
          value={customDates.endDate}
          onChange={(evnt) =>
            setCustomDates((prev) => {
              return { ...prev, endDate: evnt.target.value };
            })
          }
        />
      </span>
    </section>
  );
}

export default CustomDatesSelector;
