import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL; // Adjust the base URL as needed

function App() {
  const [user, setUser] = useState(null); // State to hold the logged-in user
  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        />
        <Route path="/register" element={<Register setUser={setUser} />} />
        {/* Add other routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
