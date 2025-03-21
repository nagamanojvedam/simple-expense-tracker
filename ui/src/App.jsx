import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "./pages/Login";
import ProtectedLayout from "./pages/ProtectedLayout";
import { TransactionProvider } from "./contexts/TransactionContext";
import Register from "./pages/Register";
import SetAvatar from "./pages/SetAvatar";

function App() {
  return (
    <TransactionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="setavatar/:userId" element={<SetAvatar />} />

          <Route
            path="/"
            element={
              <ProtectedLayout>
                {" "}
                <Home />
              </ProtectedLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TransactionProvider>
  );
}

export default App;
