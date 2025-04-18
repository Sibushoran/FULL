import React, { useState } from "react";
import productData from "./products.json"; // Importing from separate file
import "./Shop.css";

const Shop = () => {
  const allBrands = ["Apple", "Asus", "Dell", "LG", "Samsung", "Sony"];
  const allRatings = [5, 4, 3, 2, 1];

  const [products] = useState(productData);
  const [filteredProducts, setFilteredProducts] = useState(productData);

  const [statusFilters, setStatusFilters] = useState(["All"]);
  const [priceRange, setPriceRange] = useState([40, 1500]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const changePage = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStatusChange = (e, status) => {
    const isChecked = e.target.checked;
    if (status === "All") {
      setStatusFilters(["All"]);
    } else {
      const updated = isChecked
        ? [...statusFilters.filter((s) => s !== "All"), status]
        : statusFilters.filter((s) => s !== status);
      setStatusFilters(updated.length === 0 ? ["All"] : updated);
    }
  };

  const handleBrandChange = (e, brand) => {
    const isChecked = e.target.checked;
    setSelectedBrands((prev) =>
      isChecked ? [...prev, brand] : prev.filter((b) => b !== brand)
    );
  };

  const handleRatingChange = (e, rating) => {
    const isChecked = e.target.checked;
    setSelectedRatings((prev) =>
      isChecked ? [...prev, rating] : prev.filter((r) => r !== rating)
    );
  };

  const applyFilters = () => {
    let filtered = [...products];

    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (!statusFilters.includes("All")) {
      filtered = filtered.filter((product) =>
        statusFilters.includes(product.tag)
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    if (selectedRatings.length > 0) {
      filtered = filtered.filter((product) =>
        selectedRatings.includes(product.rating)
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="shop-page">
      <div className="shop-banner">
        <img src="/src/assets/contact-1.jpeg" alt="Shop Banner" className="banner-img" />
        <div className="banner-overlay">
          <h1>Shop</h1>
          <p>Home &gt; Shop</p>
        </div>
      </div>

      <div className="shop-content">
        <div className="filter-panel">
          <h3>Product status</h3>
          {["All", "Featured", "On Sale"].map((status, idx) => (
            <label key={idx}>
              <input
                type="checkbox"
                checked={statusFilters.includes(status)}
                onChange={(e) => handleStatusChange(e, status)}
              />{" "}
              {status}
            </label>
          ))}

          <hr />

          <h3>Filter by price</h3>
          <input
            type="range"
            min="40"
            max="1500"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([40, Number(e.target.value)])}
          />
          <p>Price: ${priceRange[0]} — ${priceRange[1]}</p>
          <button className="filter-btn" onClick={applyFilters}>Filter</button>

          <hr />

          <h3>Product brands</h3>
          {allBrands.map((brand, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={(e) => handleBrandChange(e, brand)}
              />{" "}
              {brand}
            </label>
          ))}

          <hr />

          <h3>Filter by rating</h3>
          {allRatings.map((rating) => (
            <label key={rating}>
              <input
                type="checkbox"
                checked={selectedRatings.includes(rating)}
                onChange={(e) => handleRatingChange(e, rating)}
              />{" "}
              {rating} star{rating > 1 && "s"}
            </label>
          ))}

          <hr />

          <h3>Filter by color</h3>
          {["Black", "Blue", "Brown", "Green", "Grey"].map((color, index) => (
            <div className="color-option" key={index}>
              <span className={`color-circle ${color.toLowerCase()}`}></span> {color}
            </div>
          ))}
        </div>

        <div className="shop-main">
          <div className="shop-toolbar">
            <div className="sort-dropdown">
              <label>Sort By :</label>
              <select>
                <option>Default sorting</option>
                <option>Price low to high</option>
                <option>Price high to low</option>
              </select>
            </div>
            <div className="show-dropdown">
              <label>Show :</label>
              <select>
                <option>12</option>
                <option>24</option>
                <option>36</option>
              </select>
            </div>
          </div>

          <div className="product-grid">
            {currentProducts.length === 0 ? (
              <p>No products found matching your filters.</p>
            ) : (
              currentProducts.map((product, index) => (
                <div key={index} className="product-card">
                  {product.tag && (
                    <span className={`product-tag ${product.tag.toLowerCase()}`}>
                      {product.tag}
                    </span>
                  )}
                  <img src={product.image} alt={product.name} />
                  <p className="category">{product.category}</p>
                  <h4>{product.name}</h4>
                  <div className="price-section">
                    <p className="price">${product.price}</p>
                    {product.originalPrice && (
                      <span className="old-price">${product.originalPrice}</span>
                    )}
                  </div>
                  {product.colors && (
                    <div className="color-dots">
                      {product.colors.map((clr, i) => (
                        <span
                          key={i}
                          className="dot"
                          style={{ backgroundColor: clr }}
                        ></span>
                      ))}
                    </div>
                  )}
                  <p className="rating">Rating: {product.rating} ★</p>
                </div>
              ))
            )}
          </div>

          <div className="pagination">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => changePage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
