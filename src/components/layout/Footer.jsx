import {
  Heart,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}

        <div className="footer-brand">

          <Link
            to="/"
            className="footer-logo"
          >
            ShopKart
          </Link>

          <p>
            Your modern online shopping
            destination.
          </p>

          <div className="footer-trust">

            <ShieldCheck size={16} />

            <span>
              Secure & reliable shopping
            </span>

          </div>

        </div>

        {/* QUICK LINKS */}

        <div className="footer-column">

          <h3>
            Quick Links
          </h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/products">
            Products
          </Link>

          <Link to="/wishlist">
            Wishlist
          </Link>

          <Link to="/orders">
            Orders
          </Link>

        </div>

        {/* SUPPORT */}

        <div className="footer-column">

          <h3>
            Support
          </h3>

          <a href="mailto:support@shopkart.com">
            <Mail size={15} />
            Contact
          </a>

          <a href="tel:+911234567890">
            <Phone size={15} />
            +91 12345 67890
          </a>

          <Link to="/">
            Privacy Policy
          </Link>

          <Link to="/">
            Terms & Conditions
          </Link>

        </div>

      </div>

      {/* COPYRIGHT */}

      <div className="footer-bottom">

        <p>
          © 2026 ShopKart. All rights reserved.
        </p>

        <p className="footer-made-with">
          Made with
          <Heart
            size={14}
            fill="currentColor"
          />
          for better shopping.
        </p>

      </div>

    </footer>
  );
}

export default Footer;