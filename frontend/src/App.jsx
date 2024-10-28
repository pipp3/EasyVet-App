import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./home/Home";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ForgotPassword from "./auth/ForgotPassword";
import ChangePassword from "./auth/ChangePassword";
import ProtectedRoute from "./auth/ProtectedRoute";
import ConfirmAccount from "./auth/ConfirmAccount";

import NotFound from "./auth/NotFound";
function App() {
  return (
    <div className="bg-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route element={<ProtectedRoute />} >
            <Route path="/change-password/:token" element={<ChangePassword />} />
          </Route>
          <Route path="/confirm-account/:token" element={<ConfirmAccount />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
