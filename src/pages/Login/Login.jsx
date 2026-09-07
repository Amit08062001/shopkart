import { useState } from "react";

import {
  LockKeyhole,
  LogIn,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
} from "react-redux";

import { login } from "../../store/authSlice";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] =
    useState({});

  const [isLoading, setIsLoading] =
    useState(false);

  const from =
    location.state?.from || "/";

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password =
        "Password is required";
    } else if (
      formData.password.length < 6
    ) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const name = formData.email
        .split("@")[0]
        .replace(/[._-]/g, " ")
        .replace(/\b\w/g, (letter) =>
          letter.toUpperCase()
        );

      dispatch(
        login({
          name,
          email: formData.email,
        })
      );

      setIsLoading(false);

      navigate(from, {
        replace: true,
      });
    }, 500);
  };

  return (
    <main className="login-page">
      <div className="login-container">

        <section className="login-visual">

          <div className="login-visual-content">

            <span className="section-eyebrow">
              WELCOME TO SHOPKART
            </span>

            <h1>
              Shop smarter.
              <br />
              Live better.
            </h1>

            <p>
              Sign in to manage your
              orders, save your favorite
              products, and enjoy a
              smoother shopping
              experience.
            </p>

            <div className="login-benefit-list">

              <div className="login-benefit">
                <ShieldCheck size={19} />

                <span>
                  Secure account experience
                </span>
              </div>

              <div className="login-benefit">
                <PackageIcon />

                <span>
                  Track all your orders
                </span>
              </div>

              <div className="login-benefit">
                <HeartIcon />

                <span>
                  Save your favorite products
                </span>
              </div>

            </div>

          </div>

        </section>

        <section className="login-card">

          <div className="login-card-header">

            <div className="login-icon">
              <UserRound size={23} />
            </div>

            <span className="section-eyebrow">
              ACCOUNT
            </span>

            <h2>
              Welcome back
            </h2>

            <p>
              Sign in to continue to
              ShopKart.
            </p>

          </div>

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            <div className="login-field">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="login-input-wrapper">
                <Mail size={17} />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>

              {errors.email && (
                <span className="field-error">
                  {errors.email}
                </span>
              )}

            </div>

            <div className="login-field">

              <label htmlFor="password">
                Password
              </label>

              <div className="login-input-wrapper">
                <LockKeyhole size={17} />

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
              </div>

              {errors.password && (
                <span className="field-error">
                  {errors.password}
                </span>
              )}

            </div>

            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              <LogIn size={18} />

              {isLoading
                ? "Signing in..."
                : "Sign In"}
            </button>

          </form>

          <div className="login-demo-note">
            <ShieldCheck size={16} />

            <span>
              Demo authentication:
              use any valid email and a
              password with 6+ characters.
            </span>
          </div>

          <div className="login-footer">
            <span>
              New to ShopKart?
            </span>

            <Link to="/products">
              Continue Shopping
            </Link>
          </div>

        </section>

      </div>
    </main>
  );
}

function PackageIcon() {
  return (
    <span className="login-benefit-icon">
      📦
    </span>
  );
}

function HeartIcon() {
  return (
    <span className="login-benefit-icon">
      ♡
    </span>
  );
}

export default Login;