import {
  Heart,
  ShoppingCart,
} from "lucide-react";

import { Link } from "react-router-dom";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import { toggleWishlist } from "../../store/wishlistSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );

  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice -
            product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <article className="product-card">

      {/* Image */}
      <div className="product-image-wrapper">

        {discount > 0 && (
          <span className="discount-badge">
            {discount}% OFF
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          className={
            isWishlisted
              ? "wishlist-button active"
              : "wishlist-button"
          }
          onClick={handleWishlist}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <Heart
            size={18}
            fill={
              isWishlisted
                ? "currentColor"
                : "none"
            }
          />
        </button>

        <Link
          to={`/products/${product.id}`}
        >
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </Link>

      </div>

      {/* Information */}
      <div className="product-info">

        <span className="product-category">
          {product.category}
        </span>

        <Link
          to={`/products/${product.id}`}
          className="product-title-link"
        >
          <h3 className="product-title">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="product-rating">
          <span>★</span>

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

        {/* Details */}
        <Link
          to={`/products/${product.id}`}
          className="view-details-button"
        >
          View Details
        </Link>

        {/* Cart */}
        <button
          type="button"
          className="add-cart-button"
        >
          <ShoppingCart size={17} />
          Add to Cart
        </button>

      </div>

    </article>
  );
}

export default ProductCard;