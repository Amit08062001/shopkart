import { useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "./ProductCard";
import { products } from "../../utils/products";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read current values from URL
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";
  const sort = searchParams.get("sort") || "default";

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home",
    "Beauty",
  ];

  /*
   * Update only the required URL parameter.
   * Existing parameters are preserved.
   */
  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (!value || value === "All" || value === "default") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params);
  };

  /*
   * Filter and sort products.
   */
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.title
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesCategory =
          category === "All" ||
          product.category === category;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sort === "price-low") {
          return a.price - b.price;
        }

        if (sort === "price-high") {
          return b.price - a.price;
        }

        if (sort === "rating") {
          return b.rating - a.rating;
        }

        return 0;
      });
  }, [search, category, sort]);

  return (
    <div className="products-page">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <section className="products-header">
        <div>
          <span className="section-eyebrow">
            OUR COLLECTION
          </span>

          <h1>All Products</h1>

          <p>
            Discover products selected for everyday
            shopping.
          </p>
        </div>

        <span className="product-count">
          {filteredProducts.length} products
        </span>
      </section>

      {/* =========================
          FILTER TOOLBAR
      ========================== */}

      <section className="products-toolbar">

        {/* Search */}

        <div className="products-search">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(event) =>
              updateParams("search", event.target.value)
            }
          />
        </div>

        {/* Categories */}

        <div className="category-filters">
          <SlidersHorizontal size={18} />

          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item
                  ? "category-filter active"
                  : "category-filter"
              }
              onClick={() =>
                updateParams("category", item)
              }
            >
              {item}
            </button>
          ))}
        </div>

        {/* Sort */}

        <select
          className="sort-select"
          value={sort}
          onChange={(event) =>
            updateParams("sort", event.target.value)
          }
        >
          <option value="default">
            Sort by
          </option>

          <option value="price-low">
            Price: Low to High
          </option>

          <option value="price-high">
            Price: High to Low
          </option>

          <option value="rating">
            Highest Rated
          </option>
        </select>

      </section>

      {/* =========================
          PRODUCT GRID
      ========================== */}

      <section className="products-list">

        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <h2>No products found</h2>

            <p>
              Try changing your search or category.
            </p>
          </div>
        )}

      </section>

    </div>
  );
}

export default Products;