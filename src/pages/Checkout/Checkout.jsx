import { useState } from "react";

import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  MapPin,
  Package,
  ShieldCheck,
  Smartphone,
  Truck,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { clearCart } from "../../store/cartSlice";
import { placeOrder } from "../../store/orderSlice";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [deliveryMethod, setDeliveryMethod] =
    useState("standard");

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [errors, setErrors] = useState({});

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const deliveryCharge =
    deliveryMethod === "express"
      ? 99
      : 0;

  const total = subtotal + deliveryCharge;

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

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

    if (!formData.fullName.trim()) {
      newErrors.fullName =
        "Full name is required";
    }

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

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone number is required";
    } else if (
      !/^[6-9]\d{9}$/.test(
        formData.phone
      )
    ) {
      newErrors.phone =
        "Enter a valid 10-digit phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address =
        "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city =
        "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state =
        "State is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode =
        "Pincode is required";
    } else if (
      !/^\d{6}$/.test(
        formData.pincode
      )
    ) {
      newErrors.pincode =
        "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    const order = {
      items: cartItems,
      customer: formData,

      delivery: {
        method: deliveryMethod,
        charge: deliveryCharge,
      },

      paymentMethod,

      subtotal,
      total,
      totalItems,
    };

    dispatch(placeOrder(order));

    dispatch(clearCart());

    navigate("/orders");
  };

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <div className="empty-checkout">
          <div className="empty-checkout-icon">
            <Package size={48} />
          </div>

          <h1>Your Cart is Empty</h1>

          <p>
            Add some products to your cart
            before proceeding to checkout.
          </p>

          <Link
            to="/products"
            className="continue-shopping-button"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">

        {/* Header */}

        <div className="checkout-header">
          <Link
            to="/cart"
            className="checkout-back-link"
          >
            <ArrowLeft size={17} />
            Back to Cart
          </Link>

          <div>
            <span className="section-eyebrow">
              CHECKOUT
            </span>

            <h1>Complete Your Order</h1>

            <p>
              Enter your details and choose
              your preferred delivery and
              payment method.
            </p>
          </div>
        </div>

        <form
          className="checkout-layout"
          onSubmit={handlePlaceOrder}
        >

          {/* LEFT */}

          <div className="checkout-main">

            {/* Delivery Address */}

            <section className="checkout-card">
              <div className="checkout-card-header">
                <div className="checkout-card-icon">
                  <MapPin size={21} />
                </div>

                <div>
                  <h2>Delivery Address</h2>
                  <p>
                    Where should we deliver
                    your order?
                  </p>
                </div>
              </div>

              <div className="checkout-form-grid">

                <div className="checkout-field checkout-field-full">
                  <label htmlFor="fullName">
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />

                  {errors.fullName && (
                    <span className="field-error">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div className="checkout-field">
                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  {errors.email && (
                    <span className="field-error">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="checkout-field">
                  <label htmlFor="phone">
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    maxLength="10"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                  {errors.phone && (
                    <span className="field-error">
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div className="checkout-field checkout-field-full">
                  <label htmlFor="address">
                    Complete Address
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    placeholder="House no., street, area, landmark..."
                    value={formData.address}
                    onChange={handleChange}
                  />

                  {errors.address && (
                    <span className="field-error">
                      {errors.address}
                    </span>
                  )}
                </div>

                <div className="checkout-field">
                  <label htmlFor="city">
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleChange}
                  />

                  {errors.city && (
                    <span className="field-error">
                      {errors.city}
                    </span>
                  )}
                </div>

                <div className="checkout-field">
                  <label htmlFor="state">
                    State
                  </label>

                  <input
                    id="state"
                    name="state"
                    type="text"
                    placeholder="Enter state"
                    value={formData.state}
                    onChange={handleChange}
                  />

                  {errors.state && (
                    <span className="field-error">
                      {errors.state}
                    </span>
                  )}
                </div>

                <div className="checkout-field">
                  <label htmlFor="pincode">
                    Pincode
                  </label>

                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    inputMode="numeric"
                    maxLength="6"
                    placeholder="6-digit pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />

                  {errors.pincode && (
                    <span className="field-error">
                      {errors.pincode}
                    </span>
                  )}
                </div>

              </div>
            </section>

            {/* Delivery */}

            <section className="checkout-card">
              <div className="checkout-card-header">
                <div className="checkout-card-icon">
                  <Truck size={21} />
                </div>

                <div>
                  <h2>Delivery Method</h2>
                  <p>
                    Choose how quickly you
                    want your order.
                  </p>
                </div>
              </div>

              <div className="checkout-options">

                <label
                  className={
                    deliveryMethod ===
                    "standard"
                      ? "checkout-option selected"
                      : "checkout-option"
                  }
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="standard"
                    checked={
                      deliveryMethod ===
                      "standard"
                    }
                    onChange={(event) =>
                      setDeliveryMethod(
                        event.target.value
                      )
                    }
                  />

                  <div className="option-icon">
                    <Package size={20} />
                  </div>

                  <div className="option-content">
                    <strong>
                      Standard Delivery
                    </strong>

                    <span>
                      Delivered in 3–5 business
                      days
                    </span>
                  </div>

                  <strong className="option-price">
                    FREE
                  </strong>
                </label>

                <label
                  className={
                    deliveryMethod ===
                    "express"
                      ? "checkout-option selected"
                      : "checkout-option"
                  }
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="express"
                    checked={
                      deliveryMethod ===
                      "express"
                    }
                    onChange={(event) =>
                      setDeliveryMethod(
                        event.target.value
                      )
                    }
                  />

                  <div className="option-icon">
                    <Truck size={20} />
                  </div>

                  <div className="option-content">
                    <strong>
                      Express Delivery
                    </strong>

                    <span>
                      Delivered in 1–2 business
                      days
                    </span>
                  </div>

                  <strong className="option-price">
                    ₹99
                  </strong>
                </label>

              </div>
            </section>

            {/* Payment */}

            <section className="checkout-card">
              <div className="checkout-card-header">
                <div className="checkout-card-icon">
                  <CreditCard size={21} />
                </div>

                <div>
                  <h2>Payment Method</h2>
                  <p>
                    Select your preferred
                    payment option.
                  </p>
                </div>
              </div>

              <div className="checkout-options">

                <label
                  className={
                    paymentMethod === "cod"
                      ? "checkout-option selected"
                      : "checkout-option"
                  }
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={
                      paymentMethod === "cod"
                    }
                    onChange={(event) =>
                      setPaymentMethod(
                        event.target.value
                      )
                    }
                  />

                  <div className="option-icon">
                    <Package size={20} />
                  </div>

                  <div className="option-content">
                    <strong>
                      Cash on Delivery
                    </strong>

                    <span>
                      Pay when your order
                      arrives
                    </span>
                  </div>
                </label>

                <label
                  className={
                    paymentMethod === "upi"
                      ? "checkout-option selected"
                      : "checkout-option"
                  }
                >
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={
                      paymentMethod === "upi"
                    }
                    onChange={(event) =>
                      setPaymentMethod(
                        event.target.value
                      )
                    }
                  />

                  <div className="option-icon">
                    <Smartphone size={20} />
                  </div>

                  <div className="option-content">
                    <strong>
                      UPI
                    </strong>

                    <span>
                      Google Pay, PhonePe,
                      Paytm and more
                    </span>
                  </div>
                </label>

                <label
                  className={
                    paymentMethod === "card"
                      ? "checkout-option selected"
                      : "checkout-option"
                  }
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={
                      paymentMethod === "card"
                    }
                    onChange={(event) =>
                      setPaymentMethod(
                        event.target.value
                      )
                    }
                  />

                  <div className="option-icon">
                    <CreditCard size={20} />
                  </div>

                  <div className="option-content">
                    <strong>
                      Credit / Debit Card
                    </strong>

                    <span>
                      Visa, Mastercard and
                      other cards
                    </span>
                  </div>
                </label>

              </div>

              <div className="demo-payment-note">
                <ShieldCheck size={17} />

                <span>
                  Payment gateway integration
                  will be added later. This is
                  currently a frontend demo.
                </span>
              </div>
            </section>

          </div>

          {/* RIGHT */}

          <aside className="checkout-sidebar">

            <div className="checkout-summary-card">

              <h2>Order Summary</h2>

              <div className="checkout-summary-items">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="checkout-summary-item"
                  >
                    <div className="checkout-summary-image">
                      <img
                        src={item.image}
                        alt={item.title}
                      />

                      <span>
                        {item.quantity}
                      </span>
                    </div>

                    <div className="checkout-summary-item-info">
                      <strong>
                        {item.title}
                      </strong>

                      <span>
                        ₹{item.price} ×{" "}
                        {item.quantity}
                      </span>
                    </div>

                    <strong>
                      ₹
                      {item.price *
                        item.quantity}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="summary-divider" />

              <div className="summary-row">
                <span>
                  Subtotal ({totalItems}{" "}
                  {totalItems === 1
                    ? "item"
                    : "items"})
                </span>

                <strong>
                  ₹{subtotal}
                </strong>
              </div>

              <div className="summary-row">
                <span>
                  Delivery
                </span>

                <strong>
                  {deliveryCharge === 0
                    ? "FREE"
                    : `₹${deliveryCharge}`}
                </strong>
              </div>

              <div className="summary-divider" />

              <div className="summary-total">
                <span>
                  Total
                </span>

                <strong>
                  ₹{total}
                </strong>
              </div>

              <button
                type="submit"
                className="place-order-button"
              >
                <CheckCircle2 size={19} />
                Place Order
              </button>

              <div className="secure-checkout">
                <ShieldCheck size={17} />

                <span>
                  Your information is secure
                  and protected.
                </span>
              </div>

            </div>

          </aside>

        </form>
      </div>
    </main>
  );
}

export default Checkout;