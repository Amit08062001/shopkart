import {
    ArrowLeft,
    CheckCircle2,
    Clock3,
    Package,
    Truck,
    CreditCard,
    MapPin,
  } from "lucide-react";
  
  import { Link } from "react-router-dom";
  
  import { useSelector } from "react-redux";
  
  function Orders() {
    const orders = useSelector(
      (state) => state.orders.items
    );
  
    if (orders.length === 0) {
      return (
        <main className="orders-page">
          <div className="empty-orders">
  
            <div className="empty-orders-icon">
              <Package size={48} />
            </div>
  
            <span className="section-eyebrow">
              MY ORDERS
            </span>
  
            <h1>No Orders Yet</h1>
  
            <p>
              Once you place an order,
              you'll find all your orders
              here.
            </p>
  
            <Link
              to="/products"
              className="continue-shopping-button"
            >
              <ArrowLeft size={18} />
              Start Shopping
            </Link>
  
          </div>
        </main>
      );
    }
  
    return (
      <main className="orders-page">
  
        <div className="orders-container">
  
          <div className="orders-header">
  
            <div>
              <span className="section-eyebrow">
                ORDER HISTORY
              </span>
  
              <h1>My Orders</h1>
  
              <p>
                Track and view your previous
                ShopKart orders.
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
  
          <section className="orders-list">
  
            {orders.map((order) => {
  
              const orderDate =
                new Date(
                  order.createdAt
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                );
  
              const orderTime =
                new Date(
                  order.createdAt
                ).toLocaleTimeString(
                  "en-IN",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                );
  
              const paymentLabel =
                order.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : order.paymentMethod === "upi"
                  ? "UPI"
                  : "Credit / Debit Card";
  
              const deliveryLabel =
                order.delivery?.method === "express"
                  ? "Express Delivery"
                  : "Standard Delivery";
  
              return (
                <article
                  key={order.id}
                  className="order-card"
                >
  
                  {/* ORDER HEADER */}
  
                  <div className="order-card-header">
  
                    <div>
                      <span className="order-label">
                        ORDER ID
                      </span>
  
                      <strong className="order-id">
                        {order.id}
                      </strong>
                    </div>
  
                    <div className="order-date">
                      <Clock3 size={15} />
  
                      <span>
                        {orderDate}
                        {" • "}
                        {orderTime}
                      </span>
                    </div>
  
                  </div>
  
                  {/* STATUS */}
  
                  <div className="order-status">
  
                    <CheckCircle2
                      size={19}
                    />
  
                    <div>
                      <strong>
                        {order.status}
                      </strong>
  
                      <span>
                        Your order has been
                        successfully placed.
                      </span>
                    </div>
  
                  </div>
  
                  {/* PRODUCTS */}
  
                  <div className="order-products">
  
                    {order.items.map(
                      (item) => (
  
                        <div
                          key={item.id}
                          className="order-product"
                        >
  
                          <div className="order-product-image">
  
                            <img
                              src={item.image}
                              alt={item.title}
                            />
  
                            <span>
                              {item.quantity}
                            </span>
  
                          </div>
  
                          <div className="order-product-info">
  
                            <span className="product-category">
                              {item.category}
                            </span>
  
                            <h3>
                              {item.title}
                            </h3>
  
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
  
                      )
                    )}
  
                  </div>
  
                  {/* ORDER DETAILS */}
  
                  <div className="order-details-grid">
  
                    {/* DELIVERY */}
  
                    <div className="order-detail-box">
  
                      <span>
                        DELIVERY
                      </span>
  
                      <div className="order-detail-value">
  
                        <Truck
                          size={18}
                          strokeWidth={1.8}
                        />
  
                        <strong>
                          {deliveryLabel}
                        </strong>
  
                      </div>
  
                    </div>
  
                    {/* PAYMENT */}
  
                    <div className="order-detail-box">
  
                      <span>
                        PAYMENT
                      </span>
  
                      <div className="order-detail-value">
  
                        <CreditCard
                          size={18}
                          strokeWidth={1.8}
                        />
  
                        <strong>
                          {paymentLabel}
                        </strong>
  
                      </div>
  
                    </div>
  
                    {/* ADDRESS */}
  
                    <div className="order-detail-box">
  
                      <span>
                        DELIVER TO
                      </span>
  
                      <div className="order-detail-value">
  
                        <MapPin
                          size={18}
                          strokeWidth={1.8}
                        />
  
                        <strong>
                          {order.customer.fullName}
                        </strong>
  
                      </div>
  
                      <p>
                        {order.customer.address},{" "}
                        {order.customer.city},{" "}
                        {order.customer.state} -{" "}
                        {order.customer.pincode}
                      </p>
  
                    </div>
  
                  </div>
  
                  {/* TOTAL */}
  
                  <div className="order-total">
  
                    <span>
                      Order Total
                    </span>
  
                    <strong>
                      ₹{order.total}
                    </strong>
  
                  </div>
  
                </article>
              );
            })}
  
          </section>
  
        </div>
  
      </main>
    );
  }
  
  export default Orders;