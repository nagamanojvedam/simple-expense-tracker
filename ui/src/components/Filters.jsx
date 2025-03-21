import AddTransaction from "./AddTransaction";
import Dropdown from "./Dropdown";
import Switch from "./Switch";
import { useTransactions } from "../contexts/TransactionContext";

function Filters() {
  const { type, setType, frequency, setFrequency } = useTransactions();
  return (
    <div className="mx-auto my-4 flex w-[80%] items-end justify-between p-4 lg:w-[60%]">
      <div className="flex flex-col gap-2">
        <span className="mr-4 font-semibold">Select Frequency</span>
        <Dropdown>
          <select
            name="frequency"
            id="frequency"
            className="w-full appearance-none rounded-sm bg-white px-2 py-1 outline-0"
            value={frequency}
            onChange={(evnt) => setFrequency(evnt.target.value)}
          >
            <option value="">All</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="365">Last 365 Days</option>
            <option value="custom">Custom</option>
          </select>
        </Dropdown>
      </div>
      <div className="flex flex-col gap-2">
        <span className="mr-4 font-semibold">Select Type</span>
        <Dropdown>
          <select
            name="type"
            id="type"
            className="w-full appearance-none rounded-sm bg-white px-2 py-1 outline-0"
            value={type}
            onChange={(evnt) => setType(evnt.target.value)}
          >
            <option value="">All</option>
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
          </select>
        </Dropdown>
      </div>
      <Switch />
      <AddTransaction />
    </div>
  );
}

export default Filters;
