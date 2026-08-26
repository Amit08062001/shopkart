import { Link } from "react-router-dom";
import { Search, Heart, ShoppingCart, User } from "lucide-react";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          ShopKart
        </Link>

        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search products..."
          />
        </div>

        <nav className="header-actions">
          <Link to="/wishlist" aria-label="Wishlist">
            <Heart size={22} />
          </Link>

          <Link to="/login" aria-label="Account">
            <User size={22} />
          </Link>

          <Link to="/cart" aria-label="Shopping cart">
            <ShoppingCart size={22} />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
