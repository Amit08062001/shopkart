import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
} from "lucide-react";

import { useSelector } from "react-redux";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const search = searchParams.get("search") || "";

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = wishlistItems.length;

  const handleSearch = (event) => {
    const value = event.target.value;

    if (location.pathname !== "/products") {
      const params = new URLSearchParams();

      if (value.trim()) {
        params.set("search", value.trim());
      }

      window.location.href = `/shopkart/products${
        params.toString()
          ? `?${params.toString()}`
          : ""
      }`;

      return;
    }

    const params = new URLSearchParams();

    if (value.trim()) {
      params.set("search", value);
    }

    setSearchParams(params);
  };

  return (
    <header className="header">

      <div className="header-container">

        <Link
          to="/"
          className="logo"
        >
          ShopKart
        </Link>


        <div className="search-box">

          <Search size={20} />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearch}
          />

        </div>


        <nav className="header-actions">

          <Link
            to="/wishlist"
            className="header-wishlist"
            aria-label="Wishlist"
          >

            <Heart size={22} />

            {wishlistCount > 0 && (
              <span className="wishlist-count">
                {wishlistCount}
              </span>
            )}

          </Link>


          <Link
            to="/login"
            aria-label="Account"
          >
            <User size={22} />
          </Link>


          <Link
            to="/cart"
            className="header-cart"
            aria-label="Shopping cart"
          >

            <ShoppingCart size={22} />

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}

          </Link>

        </nav>

      </div>

    </header>
  );
}

export default Header;