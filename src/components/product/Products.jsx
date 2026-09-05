import { useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "./ProductCard";
import { products } from "../../utils/products";

function Products() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const search =
    searchParams.get("search") || "";

  const category =
    searchParams.get("category") || "All";

  const sort =
    searchParams.get("sort") || "default";

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home",
    "Beauty",
  ];

  const updateParams = (key, value) => {
    const params = new URLSearchParams(
      searchParams
    );

    if (
      !value ||
      value === "All" ||
      value === "default"
    ) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params);
  };

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const searchText =
        search.trim().toLowerCase();

      const matchesSearch =
        !searchText ||
        product.title
          .toLowerCase()
          .includes(searchText);

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

    if (sort === "price-low") {
      return [...result].sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "price-high") {
      return [...result].sort(
        (a, b) => b.price - a.price
      );
    }

    if (sort === "rating") {
      return [...result].sort(
        (a, b) => b.rating - a.rating
      );
    }

    return result;
  }, [search, category, sort]);

  const handleSearchChange = (event) => {
    updateParams(
      "search",
      event.target.value
    );
  };

  const clearSearch = () => {
    updateParams("search", "");
  };

  return (
    <main className="products-page">

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
            Discover products selected for
            everyday shopping.
          </p>

        </div>

        <span className="product-count">

          {filteredProducts.length}{" "}
          {filteredProducts.length === 1
            ? "product"
            : "products"}

        </span>

      </section>


      {/* =========================
          FILTER TOOLBAR
      ========================== */}

      <section className="products-toolbar">

        {/* Search */}

        <div className="products-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            aria-label="Search products"
          />

          {search && (
            <button
              type="button"
              className="clear-search-button"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}

        </div>


        {/* Categories */}

        <div className="category-filters">

          <SlidersHorizontal
            size={18}
          />

          <div className="category-filter-list">

            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={
                  category === item
                    ? "category-filter active"
                    : "category-filter"
                }
                onClick={() =>
                  updateParams(
                    "category",
                    item
                  )
                }
              >
                {item}
              </button>
            ))}

          </div>

        </div>


        {/* Sort */}

        <select
          className="sort-select"
          value={sort}
          onChange={(event) =>
            updateParams(
              "sort",
              event.target.value
            )
          }
          aria-label="Sort products"
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
          ACTIVE SEARCH INFO
      ========================== */}

      {search && (
        <div className="search-result-info">

          <span>
            Showing results for{" "}
            <strong>"{search}"</strong>
          </span>

          <button
            type="button"
            onClick={clearSearch}
          >
            Clear
          </button>

        </div>
      )}


      {/* =========================
          PRODUCT GRID
      ========================== */}

      <section className="products-list">

        {filteredProducts.length > 0 ? (

          <div className="product-grid">

            {filteredProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            )}

          </div>

        ) : (

          <div className="no-products">

            <div className="no-products-icon">
              <Search size={28} />
            </div>

            <h2>
              No products found
            </h2>

            <p>
              Try changing your search,
              category, or sorting option.
            </p>

            <button
              type="button"
              className="clear-filters-button"
              onClick={() =>
                setSearchParams({})
              }
            >
              Clear All Filters
            </button>

          </div>

        )}

      </section>

    </main>
  );
}

export default Products;