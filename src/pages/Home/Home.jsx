import { ArrowRight, ShieldCheck, Truck, Headphones } from "lucide-react";
import ProductCard from "../../components/product/ProductCard";
import { products } from "../../utils/products";

function Home() {
  return (
    <div className="home-page">

      {/* Hero */}

      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-eyebrow">
            SHOP SMART. LIVE BETTER.
          </span>

          <h1>
            Discover products
            <br />
            you'll love.
          </h1>

          <p>
            Explore carefully selected products across
            fashion, electronics, home and more.
          </p>

          <a href="#featured-products" className="hero-button">
            Shop Now
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="hero-visual">
          <div className="hero-circle">
            SHOP
          </div>
        </div>
      </section>

      {/* Categories */}

      <section className="categories-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">
              EXPLORE
            </span>

            <h2>Shop by category</h2>
          </div>
        </div>

        <div className="category-grid">
          <div className="category-card">
            <span>📱</span>
            <h3>Electronics</h3>
            <p>Latest tech & gadgets</p>
          </div>

          <div className="category-card">
            <span>👟</span>
            <h3>Fashion</h3>
            <p>Style for every occasion</p>
          </div>

          <div className="category-card">
            <span>🏠</span>
            <h3>Home</h3>
            <p>Make your space better</p>
          </div>

          <div className="category-card">
            <span>✨</span>
            <h3>Beauty</h3>
            <p>Feel good, look good</p>
          </div>
        </div>
      </section>

      {/* Products */}

      <section
        className="products-section"
        id="featured-products"
      >
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">
              TRENDING NOW
            </span>

            <h2>Featured products</h2>
          </div>

          <a href="/shopkart/products" className="view-all">
            View all
            <ArrowRight size={17} />
          </a>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      {/* Benefits */}

      <section className="benefits-section">
        <div className="benefit">
          <Truck size={30} />
          <div>
            <h3>Fast Delivery</h3>
            <p>Quick delivery to your doorstep.</p>
          </div>
        </div>

        <div className="benefit">
          <ShieldCheck size={30} />
          <div>
            <h3>Secure Payments</h3>
            <p>Your payments are always protected.</p>
          </div>
        </div>

        <div className="benefit">
          <Headphones size={30} />
          <div>
            <h3>24/7 Support</h3>
            <p>We're here whenever you need us.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;