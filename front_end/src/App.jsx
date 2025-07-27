import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserContextProvider } from "./Contexts/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Header from "./components/Header";
import Place from "./pages/Place";

// axios.defaults.baseURL =
//   import.meta.env.MODE === "devolopment"
//     ? "http://localhost:4000/api"
//     : "https://hashbnb-youtube-wk45.onrender.com/";

// Set base URL for production
if (import.meta.env.PROD) {
  axios.defaults.baseURL = 'https://hashbnb-youtube-wk45.onrender.com/api'
} else {
  axios.defaults.baseURL = 'http://localhost:4000/api'
}

axios.defaults.withCredentials = true;



function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/:subpage/:action?/:id?" element={<Account />} />
          <Route path="/place/:id" element={<Place />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
