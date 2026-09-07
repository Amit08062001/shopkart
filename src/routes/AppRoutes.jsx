import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { useSelector } from "react-redux";

import MainLayout from "../components/layout/MainLayout";

import Home from "../pages/Home/Home";
import Products from "../components/product/Products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Wishlist from "../pages/Wishlist/Wishlist";
import Checkout from "../pages/Checkout/Checkout";
import Orders from "../pages/Orders/Orders";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";

function ProtectedRoute() {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{
          from:
            location.pathname +
            location.search,
        }}
        replace
      />
    );
  }

  return <Outlet />;
}

function Admin() {
  return (
    <main className="placeholder-page">
      <h1>
        Admin Dashboard
      </h1>

      <p>
        Admin functionality will be added later.
      </p>
    </main>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter
      basename={import.meta.env.BASE_URL}
    >
      <Routes>

        <Route element={<MainLayout />}>

          {/* PUBLIC */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          {/* PROTECTED */}

          <Route element={<ProtectedRoute />}>

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/orders"
              element={<Orders />}
            />

          </Route>

          {/* ADMIN */}

          <Route
            path="/admin"
            element={<Admin />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;