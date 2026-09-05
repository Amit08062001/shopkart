import {
  Heart,
  ShoppingCart,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  toggleWishlist,
} from "../../store/wishlistSlice";

import {
  addToCart,
} from "../../store/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();


  // Wishlist

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );


  // Cart

  const cartItems = useSelector(
    (state) => state.cart.items
  );


  // Is product wishlisted?

  const isWishlisted =
    wishlistItems.some(
      (item) => item.id === product.id
    );


  // Is product already in cart?

  const cartItem = cartItems.find(
    (item) => item.id === product.id
  );


  // Discount

  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice -
            product.price) /
            product.originalPrice) *
            100
        )
      : 0;


  // Wishlist

  const handleWishlist = () => {
    dispatch(
      toggleWishlist(product)
    );
  };


  // Cart

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );
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


        {/* Product Image */}

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


      {/* Product Info */}

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


        {/* View Details */}

        <Link
          to={`/products/${product.id}`}
          className="view-details-button"
        >
          View Details
        </Link>


        {/* Add To Cart */}

        <button
          type="button"
          className="add-cart-button"
          onClick={handleAddToCart}
        >

          <ShoppingCart size={17} />

          {cartItem
            ? `Add Again (${cartItem.quantity})`
            : "Add to Cart"}

        </button>

      </div>

    </article>
  );
}

export default ProductCard;