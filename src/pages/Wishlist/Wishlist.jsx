import {
    ArrowLeft,
    Heart,
    ShoppingCart,
    Trash2,
  } from "lucide-react";
  
  import { Link } from "react-router-dom";
  
  import {
    useDispatch,
    useSelector,
  } from "react-redux";
  
  import {
    removeFromWishlist,
  } from "../../store/wishlistSlice";
  
  import {
    addToCart,
  } from "../../store/cartSlice";
  
  
  function Wishlist() {
    const dispatch = useDispatch();
  
    const wishlistItems = useSelector(
      (state) => state.wishlist.items
    );
  
  
    const handleRemove = (productId) => {
      dispatch(
        removeFromWishlist(productId)
      );
    };
  
  
    const handleAddToCart = (product) => {
      dispatch(
        addToCart({
          ...product,
          quantity: 1,
        })
      );
    };
  
  
    // Empty Wishlist
  
    if (wishlistItems.length === 0) {
      return (
        <main className="wishlist-page">
  
          <div className="empty-wishlist">
  
            <Heart size={55} />
  
            <h1>
              Your Wishlist is Empty
            </h1>
  
            <p>
              Save products you love and find
              them here later.
            </p>
  
            <Link
              to="/products"
              className="continue-shopping-button"
            >
              <ArrowLeft size={18} />
              Explore Products
            </Link>
  
          </div>
  
        </main>
      );
    }
  
  
    return (
      <main className="wishlist-page">
  
  
        {/* Header */}
  
        <div className="wishlist-header">
  
          <div>
  
            <span className="section-eyebrow">
              SAVED PRODUCTS
            </span>
  
            <h1>
              My Wishlist
            </h1>
  
            <p>
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1
                ? "product"
                : "products"}{" "}
              saved
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
  
  
        {/* Products */}
  
        <section className="wishlist-grid">
  
          {wishlistItems.map(
            (product) => {
  
              const discount =
                product.originalPrice >
                product.price
                  ? Math.round(
                      ((product.originalPrice -
                        product.price) /
                        product.originalPrice) *
                        100
                    )
                  : 0;
  
  
              return (
                <article
                  key={product.id}
                  className="wishlist-card"
                >
  
  
                  {/* Image */}
  
                  <div className="wishlist-image-wrapper">
  
                    {discount > 0 && (
                      <span className="discount-badge">
                        {discount}% OFF
                      </span>
                    )}
  
  
                    {/* Remove */}
  
                    <button
                      type="button"
                      className="wishlist-remove-button"
                      onClick={() =>
                        handleRemove(
                          product.id
                        )
                      }
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={17} />
                    </button>
  
  
                    <Link
                      to={`/products/${product.id}`}
                    >
  
                      <img
                        src={product.image}
                        alt={product.title}
                        className="wishlist-image"
                      />
  
                    </Link>
  
                  </div>
  
  
                  {/* Info */}
  
                  <div className="wishlist-info">
  
                    <span className="product-category">
                      {product.category}
                    </span>
  
  
                    <Link
                      to={`/products/${product.id}`}
                      className="product-title-link"
                    >
  
                      <h2>
                        {product.title}
                      </h2>
  
                    </Link>
  
  
                    {/* Rating */}
  
                    <div className="product-rating">
  
                      <span>
                        ★
                      </span>
  
                      <strong>
                        {product.rating}
                      </strong>
  
                      <span>
                        ({product.reviews})
                      </span>
  
                    </div>
  
  
                    {/* Price */}
  
                    <div className="product-price">
  
                      <span className="current-price">
                        ₹{product.price}
                      </span>
  
                      {product.originalPrice >
                        product.price && (
  
                        <span className="original-price">
                          ₹{product.originalPrice}
                        </span>
  
                      )}
  
                    </div>
  
  
                    {/* View Product */}
  
                    <Link
                      to={`/products/${product.id}`}
                      className="wishlist-view-button"
                    >
  
                      <Heart size={17} />
  
                      View Product
  
                    </Link>
  
  
                    {/* Add Cart */}
  
                    <button
                      type="button"
                      className="add-cart-button"
                      onClick={() =>
                        handleAddToCart(product)
                      }
                    >
  
                      <ShoppingCart size={17} />
  
                      Add to Cart
  
                    </button>
  
                  </div>
  
                </article>
              );
            }
          )}
  
        </section>
  
      </main>
    );
  }
  
  export default Wishlist;