import {
    ArrowLeft,
    Minus,
    Plus,
    ShoppingBag,
    Trash2,
  } from "lucide-react";
  
  import { Link } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  
  import {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } from "../../store/cartSlice";
  
  function Cart() {
    const dispatch = useDispatch();
  
    const cartItems = useSelector(
      (state) => state.cart.items
    );
  
    const subtotal = cartItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  
    const totalItems = cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  
    if (cartItems.length === 0) {
      return (
        <main className="cart-page">
          <div className="empty-cart">
  
            <ShoppingBag size={55} />
  
            <h1>Your Cart is Empty</h1>
  
            <p>
              Looks like you haven't added anything
              to your cart yet.
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
      <main className="cart-page">
  
        {/* Header */}
        <div className="cart-header">
  
          <div>
            <span className="section-eyebrow">
              SHOPPING BAG
            </span>
  
            <h1>Your Cart</h1>
  
            <p>
              {totalItems}{" "}
              {totalItems === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>
  
          <Link
            to="/products"
            className="continue-shopping-link"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>
  
        </div>
  
        <div className="cart-layout">
  
          {/* Cart Items */}
          <section className="cart-items">
  
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="cart-item"
              >
  
                {/* Image */}
                <div className="cart-item-image">
                  <img
                    src={item.image}
                    alt={item.title}
                  />
                </div>
  
                {/* Info */}
                <div className="cart-item-info">
  
                  <span className="cart-item-category">
                    {item.category}
                  </span>
  
                  <h2>
                    {item.title}
                  </h2>
  
                  <div className="cart-item-price">
                    ₹{item.price}
                  </div>
  
                  {/* Quantity */}
                  <div className="cart-item-bottom">
  
                    <div className="cart-quantity">
  
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            decreaseQuantity(item.id)
                          )
                        }
                      >
                        <Minus size={15} />
                      </button>
  
                      <span>
                        {item.quantity}
                      </span>
  
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            increaseQuantity(item.id)
                          )
                        }
                      >
                        <Plus size={15} />
                      </button>
  
                    </div>
  
                    <button
                      type="button"
                      className="remove-cart-item"
                      onClick={() =>
                        dispatch(
                          removeFromCart(item.id)
                        )
                      }
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
  
                  </div>
  
                </div>
  
              </article>
            ))}
  
          </section>
  
          {/* Summary */}
          <aside className="cart-summary">
  
            <h2>Order Summary</h2>
  
            <div className="summary-row">
              <span>
                Subtotal
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
                FREE
              </strong>
            </div>
  
            <div className="summary-divider" />
  
            <div className="summary-total">
              <span>
                Total
              </span>
  
              <strong>
                ₹{subtotal}
              </strong>
            </div>
  
            <Link
              to="/checkout"
              className="checkout-button"
            >
              Proceed to Checkout
            </Link>
  
          </aside>
  
        </div>
  
      </main>
    );
  }
  
  export default Cart;