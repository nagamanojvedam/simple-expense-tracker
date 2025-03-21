import Header from "./Header";
import Expenses from "./Expenses";

function AppLayout() {
  return (
    <main className="flex min-h-dvh flex-col bg-indigo-100 p-4 text-slate-500">
      <Header />
      <Expenses />
    </main>
  );
}

export default AppLayout;
