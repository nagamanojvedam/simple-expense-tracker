import User from "./User";

function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-xl font-semibold">Expense Mangement System</h1>
      <User />
    </header>
  );
}

export default Header;
