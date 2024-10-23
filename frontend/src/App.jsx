import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import Register from "./auth/Register";
function App() {
  return (
    <div className="bg-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
