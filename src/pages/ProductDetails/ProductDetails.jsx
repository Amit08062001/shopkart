import { useState } from "react";
import {
    useDispatch,
    useSelector,
  } from "react-redux";
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { products } from "../../utils/products";
import { addToCart } from "../../store/cartSlice";
import { toggleWishlist } from "../../store/wishlistSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  // URL se aaye id ke basis par product find karo
  const product = products.find(
    (item) => String(item.id) === id
  );
  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );

  // Agar product nahi mila
  if (!product) {
    return (
      <main className="product-details-page">
        <div className="product-not-found">
          <h1>Product Not Found</h1>

          <p>
            Sorry, the product you are looking for does not exist.
          </p>

          <Link to="/products" className="back-products-button">
            <ArrowLeft size={18} />
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  // Discount calculate karo
  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  const increaseQuantity = () => {
    setQuantity((currentQuantity) => currentQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((currentQuantity) =>
      Math.max(1, currentQuantity - 1)
    );
  };
  const handleAddToCart = () => {
    console.log("ADD TO CART CLICKED");
    console.log("Product:", product);
    console.log("Quantity:", quantity);
  
    dispatch(
      addToCart({
        ...product,
        quantity,
      })
    );
  
    alert("Product added to cart");
  };

  return (
    <main className="product-details-page">

      {/* Back */}
      <Link to="/products" className="product-back-link">
        <ArrowLeft size={18} />
        Back to Products
      </Link>

      {/* Product Details */}
      <section className="product-details-container">

        {/* Product Image */}
        <div className="product-details-image-section">

          {discount > 0 && (
            <span className="product-details-discount">
              {discount}% OFF
            </span>
          )}

          <div className="product-details-image-wrapper">
            <img
              src={product.image}
              alt={product.title}
              className="product-details-image"
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="product-details-info">

          <span className="product-details-category">
            {product.category}
          </span>

          <h1>{product.title}</h1>

          {/* Rating */}
          <div className="product-details-rating">

            <span className="rating-star">
              ★
            </span>

            <strong>
              {product.rating}
            </strong>

            <span>
              ({product.reviews} reviews)
            </span>

          </div>

          {/* Price */}
          <div className="product-details-price">

            <span className="current-price">
              ₹{product.price}
            </span>

            {product.originalPrice > product.price && (
              <span className="original-price">
                ₹{product.originalPrice}
              </span>
            )}

          </div>

          {/* Description */}
          <div className="product-description">

            <h3>About this product</h3>

            <p>
              Discover the perfect combination of quality,
              style, and value with this product. Designed
              for everyday use, this product is a great
              addition to your shopping collection.
            </p>

          </div>

          {/* Quantity */}
          <div className="quantity-section">

            <span>Quantity</span>

            <div className="quantity-control">

              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity === 1}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={increaseQuantity}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>

            </div>

          </div>

          {/* Actions */}
          <div className="product-details-actions">

          <button
  type="button"
  className="add-to-cart-details-button"
  onClick={handleAddToCart}
>
  <ShoppingCart size={19} />
  Add to Cart
</button>

            <button
              type="button"
              className="wishlist-details-button"
              aria-label="Add to wishlist"
            >
              <Heart size={20} />
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}

export default ProductDetails;