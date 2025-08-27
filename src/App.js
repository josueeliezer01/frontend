// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/HomePage/HomePage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import BrandPage from "./pages/BrandPage/BrandPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import CartPage from "./pages/CartPage/CartPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import OutletPage from "./pages/OutletPage/OutletPage";
import { ProductList } from "./pages/admin/ProductList";
import { ProductForm } from "./pages/admin/ProductForm";
import { UserList } from "./pages/admin/UserList";
import { AdminRoute } from "./components/AdminRoute/AdminRoute";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}>
        {/* Home */}
        <Route
          index
          element={<Home />}
        />

        {/* Category and Brand */}
        <Route
          path="categories/:categoryId"
          element={<CategoryPage />}
        />
        <Route
          path="brands/:brandId"
          element={<BrandPage />}
        />
        <Route
          path="about"
          element={<AboutPage />}
        />
        <Route
          path="outlet"
          element={<OutletPage />}
        />

        {/* Product details */}
        <Route
          path="product/:productId"
          element={<ProductPage />}
        />

        {/* Auth */}
        <Route
          path="login"
          element={<LoginPage />}
        />
        <Route
          path="register"
          element={<RegisterPage />}
        />

        {/* Profile & Cart */}
        <Route
          path="profile"
          element={<ProfilePage />}
        />
        <Route
          path="cart"
          element={<CartPage />}
        />

        {/* Admin-only routes */}
        <Route element={<AdminRoute />}>
          <Route
            path="admin/products"
            element={<ProductList />}
          />
          <Route
            path="admin/products/new"
            element={<ProductForm />}
          />
          <Route
            path="admin/products/:id/edit"
            element={<ProductForm />}
          />
          <Route
            path="admin/users"
            element={<UserList />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
