import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const discount = Math.round(
    ((product.originalPrice - product.price) /
      product.originalPrice) *
      100
  );

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </Link>

        <button
          className="wishlist-button"
          aria-label={`Add ${product.title} to wishlist`}
        >
          <Heart size={19} />
        </button>

        <span className="discount-badge">
          {discount}% OFF
        </span>
      </div>

      <div className="product-info">
        <span className="product-category">
          {product.category}
        </span>

        <Link
          to={`/products/${product.id}`}
          className="product-title"
        >
          {product.title}
        </Link>

        <div className="product-rating">
          <Star size={15} fill="currentColor" />

          <span>{product.rating}</span>

          <span className="review-count">
            ({product.reviews})
          </span>
        </div>

        <div className="product-price">
          <strong>₹{product.price.toLocaleString()}</strong>

          <span className="original-price">
            ₹{product.originalPrice.toLocaleString()}
          </span>
        </div>

        <button className="add-cart-button">
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;