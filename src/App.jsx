import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ArticleDetail from "./pages/ArticleDetail"; // Cukup ini saja

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Rute langsung ke detail artikel */}
        <Route path="/blog/:id" element={<ArticleDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
