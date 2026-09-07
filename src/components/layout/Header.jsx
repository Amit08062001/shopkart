import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  Search,
  Heart,
  ShoppingCart,
  User,
  LogOut,
} from "lucide-react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { logout } from "../../store/authSlice";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const user = useSelector((state) => state.auth.user);

  const search = searchParams.get("search") || "";

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = wishlistItems.length;

  const handleSearch = (event) => {
    const value = event.target.value;

    if (location.pathname === "/products") {
      const params = new URLSearchParams(searchParams);

      if (value.trim()) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      setSearchParams(params);

      return;
    }

    const params = new URLSearchParams();

    if (value.trim()) {
      params.set("search", value);
    }

    navigate({
      pathname: "/products",
      search: params.toString()
        ? `?${params.toString()}`
        : "",
    });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">

        {/* LOGO */}

        <Link to="/" className="logo">
          ShopKart
        </Link>

        {/* SEARCH */}

        <div className="search-box">
          <Search size={20} />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        {/* ACTIONS */}

        <nav className="header-actions">

          {/* WISHLIST */}

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

          {/* USER */}

          {user ? (
            <div className="user-menu">

              <Link
                to="/profile"
                className="header-user"
                aria-label="My Profile"
                title="My Profile"
              >
                <User size={21} />

                <span>
                  {user.name}
                </span>
              </Link>

              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
                aria-label="Logout"
                title="Logout"
              >
                <LogOut size={19} />
              </button>

            </div>
          ) : (
            <Link
              to="/login"
              aria-label="Login"
              className="header-login"
            >
              <User size={22} />
            </Link>
          )}

          {/* CART */}

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