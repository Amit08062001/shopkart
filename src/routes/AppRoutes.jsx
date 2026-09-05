import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home/Home";
import Products from "../components/product/Products";

function ProductDetails() {
  return <h1>Product Details</h1>;
}

function Cart() {
  return <h1>Cart Page</h1>;
}

function Wishlist() {
  return <h1>Wishlist Page</h1>;
}

function Checkout() {
  return <h1>Checkout Page</h1>;
}

function Orders() {
  return <h1>Orders Page</h1>;
}

function Login() {
  return <h1>Login Page</h1>;
}

function Admin() {
  return <h1>Admin Dashboard</h1>;
}

function AppRoutes() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />

          <Route path="/cart" element={<Cart />} />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

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