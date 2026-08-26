import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h2>ShopKart</h2>
          <p>
            Your modern online shopping destination.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/orders">Orders</Link>
        </div>

        <div>
          <h3>Support</h3>

          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 ShopKart. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
