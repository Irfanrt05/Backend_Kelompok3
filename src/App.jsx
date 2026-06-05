import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public
import LandingPage from "./pages/LandingPage";
import ArticleDetail from "./pages/ArticleDetail";
import Login from "./pages/login";
import Register from "./pages/register";

// User
import UserLayout from "./layouts/UserLayout";
import UserDashboard from "./pages/Dashboard";

// Admin
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Blogs from "./pages/admin/Blogs";
import Reports from "./pages/admin/Reports";
import Recipes from "./pages/admin/Recipes";
import Profile from "./pages/admin/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog/:id" element={<ArticleDetail />} />

        {/* User */}
        <Route path="/dashboard" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="reports" element={<Reports />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
