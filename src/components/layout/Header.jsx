import { Link } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";

function Header() {
  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = wishlistItems.length;

  return (
    <header className="header">
      <div className="header-container">

        {/* Logo */}
        <Link to="/" className="logo">
          ShopKart
        </Link>

        {/* Search */}
        <div className="search-box">
          <Search size={20} />

          <input
            type="text"
            placeholder="Search products..."
          />
        </div>

        {/* Actions */}
        <nav className="header-actions">

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="header-wishlist"
            aria-label={`Wishlist, ${wishlistCount} items`}
          >
            <Heart size={22} />

            {wishlistCount > 0 && (
              <span className="wishlist-count">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Account */}
          <Link
            to="/login"
            aria-label="Account"
          >
            <User size={22} />
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="header-cart"
            aria-label={`Shopping cart, ${cartCount} items`}
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