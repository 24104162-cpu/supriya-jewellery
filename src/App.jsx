import React, { useEffect, useState } from "react";
import "./App.css";

const fallbackImage =
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85";

const defaultProducts = [
  {
    id: 1,
    name: "Royal Layered Chain",
    category: "Chains",
    price: 89999,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Elegant Diamond Necklace",
    category: "Necklaces",
    price: 159999,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Temple Gold Necklace",
    category: "Necklaces",
    price: 189999,
    image:
      "https://images.unsplash.com/photo-1617038260897-41a31f9a1d1c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Minimal Gold Chain",
    category: "Chains",
    price: 67999,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "Classic Diamond Ring",
    category: "Rings",
    price: 74999,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "Ruby Drop Earrings",
    category: "Earrings",
    price: 45999,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    name: "Layered Gold Pendant",
    category: "Chains",
    price: 82999,
    image:
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 8,
    name: "Diamond Link Bracelet",
    category: "Bracelets",
    price: 98999,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 9,
    name: "Pearl Heritage Necklace",
    category: "Necklaces",
    price: 112999,
    image:
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 10,
    name: "Infinity Gold Chain",
    category: "Chains",
    price: 91999,
    image:
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 11,
    name: "Emerald Statement Ring",
    category: "Rings",
    price: 68999,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 12,
    name: "Pearl Drop Earrings",
    category: "Earrings",
    price: 32499,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 13,
    name: "Classic Gold Bracelet",
    category: "Bracelets",
    price: 56999,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 14,
    name: "Royal Solitaire Ring",
    category: "Rings",
    price: 48999,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 15,
    name: "Heritage Gold Necklace",
    category: "Necklaces",
    price: 124999,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 16,
    name: "Modern Link Chain",
    category: "Chains",
    price: 77999,
    image:
      "https://images.unsplash.com/photo-1617038260897-41a31f9a1d1c?auto=format&fit=crop&w=900&q=85",
  },
];

const categories = [
  {
    name: "Chains",
    subtitle: "Elegant everyday layers",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Necklaces",
    subtitle: "Statement pieces",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Rings",
    subtitle: "Made for your moments",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Earrings",
    subtitle: "Details that shine",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=85",
  },
];

function App() {
  const [products, setProducts] = useState(defaultProducts);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");

  useEffect(() => {
    fetch("https://supriya-jewellery.onrender.com/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        const mongoProducts = data.map((product) => ({
          ...product,
          id: product._id,
        }));

        if (mongoProducts.length > 0) {
          setProducts(mongoProducts);
        }

        setProductsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load products:", error);
        setProductsError("Unable to load products from MongoDB. Showing sample products.");
        setProductsLoading(false);
      });
  }, []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderLoading, setOrderLoading] = useState(false);

  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [weight, setWeight] = useState("");
  const [goldRate, setGoldRate] = useState("7450");
  const [makingCharge, setMakingCharge] = useState("12");
  const [calculatedPrice, setCalculatedPrice] = useState(null);

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existing = currentItems.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setCartOpen(true);
  };

  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" ||
      product.category === activeCategory;

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(searchText.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const calculateGoldPrice = () => {
    const w = parseFloat(weight);
    const rate = parseFloat(goldRate);
    const makingPercentage = parseFloat(makingCharge);

    if (
      !w ||
      w <= 0 ||
      !rate ||
      rate <= 0 ||
      !makingPercentage ||
      makingPercentage < 0
    ) {
      setCalculatedPrice(null);
      return;
    }

    const goldValue = w * rate;
    const making = goldValue * (makingPercentage / 100);
    const gst = (goldValue + making) * 0.03;
    const total = goldValue + making + gst;

    setCalculatedPrice(Math.round(total));
  };

  const scrollToCollection = () => {
    document
      .getElementById("collections")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <div className="website">

      {/* TOP BAR */}
      <div className="top-bar">
        <span>COMPLIMENTARY SHIPPING ABOVE ₹25,000</span>
        <span>CERTIFIED JEWELLERY</span>
        <span>LIFETIME EXCHANGE</span>
      </div>

      {/* HEADER */}
      <header className="header">

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Menu
        </button>

        <nav className={menuOpen ? "nav active" : "nav"}>
          <a href="#home">Home</a>

          <a href="#collections">
            Collections
          </a>

          <a href="#categories">
            Jewellery
          </a>

          <a href="#calculator">
            Gold Calculator
          </a>
        </nav>

        <div className="logo">
          <span className="logo-main">
            SUPRIYA
          </span>

          <span className="logo-sub">
            FINE JEWELLERY
          </span>
        </div>

        <div className="header-actions">

          <button
            className="header-link"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            Search
          </button>

          <a
            className="header-link"
            href="#about"
          >
            Our Story
          </a>

          <button
            className="cart-button"
            onClick={() => setCartOpen(true)}
          >
            Cart
            <span>{cartCount}</span>
          </button>

        </div>

      </header>

      {/* SEARCH */}
      {searchOpen && (
        <div className="search-panel">

          <div className="search-inner">

            <input
              type="text"
              placeholder="Search jewellery..."
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
              autoFocus
            />

            <button
              onClick={() => {
                setSearchOpen(false);
                scrollToCollection();
              }}
            >
              Browse
            </button>

            <button
              className="search-close"
              onClick={() =>
                setSearchOpen(false)
              }
            >
              Close
            </button>

          </div>

        </div>
      )}

      {/* CART */}
      {cartOpen && (
        <div className="cart-overlay">

          <div
            className="cart-backdrop"
            onClick={() => setCartOpen(false)}
          ></div>

          <aside className="cart-drawer">

            <div className="cart-header">

              <div>
                <span className="small-label">
                  YOUR SELECTION
                </span>

                <h2>
                  Shopping Cart
                </h2>
              </div>

              <button
                className="close-x"
                onClick={() =>
                  setCartOpen(false)
                }
              >
                ×
              </button>

            </div>

            {cartItems.length === 0 ? (

              <div className="empty-cart">

                <div className="empty-circle">
                  S
                </div>

                <h3>
                  Your cart is empty
                </h3>

                <p>
                  Discover something beautiful
                  from our collection.
                </p>

                <button
                  className="gold-button"
                  onClick={() => {
                    setCartOpen(false);
                    scrollToCollection();
                  }}
                >
                  Explore Jewellery
                </button>

              </div>

            ) : (

              <>

                <div className="cart-items">

                  {cartItems.map((item) => (

                    <div
                      className="cart-item"
                      key={item.id}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        onError={(e) => {
                          e.currentTarget.src =
                            fallbackImage;
                        }}
                      />

                      <div className="cart-item-details">

                        <span>
                          {item.category}
                        </span>

                        <h3>
                          {item.name}
                        </h3>

                        <strong>
                          ₹
                          {item.price.toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                        <div className="quantity-row">

                          <button
                            onClick={() =>
                              decreaseQuantity(
                                item.id
                              )
                            }
                          >
                            −
                          </button>

                          <span>
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(
                                item.id
                              )
                            }
                          >
                            +
                          </button>

                          <button
                            className="remove-button"
                            onClick={() =>
                              removeFromCart(
                                item.id
                              )
                            }
                          >
                            Remove
                          </button>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

                <div className="cart-summary">

                  <div className="summary-line">
                    <span>
                      Subtotal
                    </span>

                    <strong>
                      ₹
                      {cartTotal.toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>

                  <p>
                    Shipping calculated at checkout.
                  </p>

                  <button
                    className="checkout-button"
                    onClick={() =>
                      setCheckoutOpen(true)
                    }
                  >
                    Proceed to Checkout
                  </button>

                  <div className="cart-trust">

                    <span>
                      Free Shipping
                    </span>

                    <span>
                      Certified
                    </span>

                    <span>
                      Lifetime Exchange
                    </span>

                  </div>

                </div>

              </>

            )}

          </aside>

        </div>
      )}

      {/* CHECKOUT MODAL */}
      {checkoutOpen && (
        <div className="checkout-overlay">

          <div className="checkout-modal">

            <button
              className="checkout-close"
              onClick={() =>
                setCheckoutOpen(false)
              }
            >
              ×
            </button>

            <span className="small-label">
              SUPRIYA JEWELLERY
            </span>

            <h2>
              Checkout
            </h2>

            <p>
              Your jewellery selection is ready.
            </p>

            <div className="checkout-box">

              <div>
                <span>
                  Items
                </span>

                <strong>
                  {cartCount}
                </strong>
              </div>

              <div>
                <span>
                  Order Total
                </span>

                <strong>
                  ₹
                  {cartTotal.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

            </div>

            <input
              type="text"
              placeholder="Full Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />

            <input
              type="text"
              placeholder="Delivery Address"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
            />

            <button
              className="checkout-pay"
              disabled={orderLoading}
              onClick={async () => {
                if (
                  !customerName.trim() ||
                  !customerPhone.trim() ||
                  !customerAddress.trim()
                ) {
                  alert("Please fill in all customer details.");
                  return;
                }

                if (cartItems.length === 0) {
                  alert("Your cart is empty.");
                  return;
                }

                setOrderLoading(true);

                const orderData = {
                  customerName: customerName.trim(),
                  phone: customerPhone.trim(),
                  address: customerAddress.trim(),
                  items: cartItems.map((item) => ({
                    productId: String(item.id),
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                  })),
                  total: cartTotal,
                };

                try {
                  const response = await fetch(
                    "https://supriya-jewellery.onrender.com/api/orders",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(orderData),
                    }
                  );

                  const data = await response.json();

                  if (!response.ok) {
                    throw new Error(
                      data.message || "Failed to place order"
                    );
                  }

                  alert(
                    "Thank you. Your order has been placed successfully."
                  );

                  setCartItems([]);
                  setCustomerName("");
                  setCustomerPhone("");
                  setCustomerAddress("");
                  setCheckoutOpen(false);
                  setCartOpen(false);
                } catch (error) {
                  console.error("Order placement failed:", error);
                  alert(
                    "Unable to place your order. Please make sure the backend server is running."
                  );
                } finally {
                  setOrderLoading(false);
                }
              }}
            >
              {orderLoading ? "Placing Order..." : "Confirm Order"}
            </button>

          </div>

        </div>
      )}

      {/* HERO */}
      <section
        className="hero"
        id="home"
      >

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <span className="hero-label">
            THE ART OF TIMELESS BEAUTY
          </span>

          <h1>
            Jewellery
            <br />
            <em>That Tells Your Story</em>
          </h1>

          <p>
            Discover thoughtfully crafted jewellery
            designed to become part of your most
            beautiful moments.
          </p>

          <div className="hero-buttons">

            <a
              href="#collections"
              className="gold-button"
            >
              Explore Collection
            </a>

            <a
              href="#about"
              className="outline-button"
            >
              Discover Our Story
            </a>

          </div>

        </div>

        <div className="hero-bottom">

          <span>
            EST. 2026
          </span>

          <span>
            CRAFTED WITH PRECISION
          </span>

          <span>
            MADE FOR GENERATIONS
          </span>

        </div>

      </section>

      {/* INTRO */}
      <section className="intro">

        <span className="section-label">
          WELCOME TO SUPRIYA JEWELLERY
        </span>

        <h2>
          Where craftsmanship
          <br />
          becomes{" "}
          <em>
            an heirloom.
          </em>
        </h2>

        <p>
          From everyday elegance to unforgettable
          celebrations, our jewellery is created to
          carry stories, memories and moments from
          one generation to another.
        </p>

      </section>

      {/* CATEGORIES */}
      <section
        className="categories-section"
        id="categories"
      >

        <div className="section-heading">

          <div>

            <span className="section-label">
              SHOP BY CATEGORY
            </span>

            <h2>
              Find Your Signature
            </h2>

          </div>

          <p>
            Explore carefully curated jewellery
            collections designed for every expression
            of style.
          </p>

        </div>

        <div className="category-grid">

          {categories.map((category) => (

            <button
              className="category-card"
              key={category.name}
              onClick={() => {
                setActiveCategory(
                  category.name
                );

                scrollToCollection();
              }}
            >

              <img
                src={category.image}
                alt={category.name}
                onError={(e) => {
                  e.currentTarget.src =
                    fallbackImage;
                }}
              />

              <div className="category-overlay">

                <span>
                  EXPLORE
                </span>

                <h3>
                  {category.name}
                </h3>

                <p>
                  {category.subtitle}
                </p>

              </div>

            </button>

          ))}

        </div>

      </section>

      {/* COLLECTION */}
      <section
        className="collection-section"
        id="collections"
      >

        <div className="collection-header">

          <div>

            <span className="section-label">
              THE SIGNATURE COLLECTION
            </span>

            <h2>
              Pieces Made to Be Remembered
            </h2>

          </div>

          <button
            className="view-all"
            onClick={() => {
              setActiveCategory("All");
              setSearchText("");
            }}
          >
            View All Jewellery
          </button>

        </div>

        {/* FILTERS */}
        <div className="filter-row">

          {[
            "All",
            "Chains",
            "Necklaces",
            "Rings",
            "Earrings",
            "Bracelets",
          ].map((category) => (

            <button
              key={category}
              className={
                activeCategory === category
                  ? "filter active"
                  : "filter"
              }
              onClick={() =>
                setActiveCategory(category)
              }
            >
              {category}
            </button>

          ))}

        </div>

        {productsLoading && (
          <div className="products-status">
            Loading jewellery from MongoDB...
          </div>
        )}

        {productsError && (
          <div className="products-status error">
            {productsError}
          </div>
        )}

        <div className="product-grid">

          {filteredProducts.map((product) => (

            <article
              className="product-card"
              key={product.id}
            >

              <div className="product-image">

                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.src =
                      fallbackImage;
                  }}
                />

                <span className="product-tag">
                  NEW
                </span>

                <button
                  className="quick-add"
                  onClick={() =>
                    addToCart(product)
                  }
                >
                  Add to Cart
                </button>

              </div>

              <div className="product-info">

                <span>
                  {product.category}
                </span>

                <h3>
                  {product.name}
                </h3>

                <strong>
                  ₹
                  {product.price.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

            </article>

          ))}

        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">

            <h3>
              No jewellery found
            </h3>

            <p>
              Try another search or category.
            </p>

          </div>
        )}

      </section>

      {/* FEATURE */}
      <section className="feature-banner">

        <div className="feature-image">
          <img
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85"
            alt="Jewellery"
            onError={(e) => {
              e.currentTarget.src =
                fallbackImage;
            }}
          />
        </div>

        <div className="feature-content">

          <span className="section-label">
            THE SUPRIYA PROMISE
          </span>

          <h2>
            Crafted with
            <br />
            <em>meaning.</em>
          </h2>

          <p>
            Every piece is carefully designed and
            finished with attention to detail, so
            your jewellery feels as special as the
            moment you wear it.
          </p>

          <div className="promise-list">

            <div>
              <strong>
                01
              </strong>

              <span>
                Certified Gold & Diamonds
              </span>
            </div>

            <div>
              <strong>
                02
              </strong>

              <span>
                Expert Craftsmanship
              </span>
            </div>

            <div>
              <strong>
                03
              </strong>

              <span>
                Lifetime Care & Support
              </span>
            </div>

          </div>

        </div>

      </section>

      {/* CALCULATOR */}
      <section
        className="calculator-section"
        id="calculator"
      >

        <div className="calculator-intro">

          <span className="section-label">
            GOLD PRICE CALCULATOR
          </span>

          <h2>
            Know the value
            <br />
            before you{" "}
            <em>
              shine.
            </em>
          </h2>

          <p>
            Get an estimated jewellery price based
            on gold weight, rate and making charges.
          </p>

          <button
            className="gold-button"
            onClick={() =>
              setCalculatorOpen(
                !calculatorOpen
              )
            }
          >
            {calculatorOpen
              ? "Close Calculator"
              : "Calculate Gold Price"}
          </button>

        </div>

        {calculatorOpen && (

          <div className="calculator-box">

            <span className="small-label">
              GOLD ESTIMATOR
            </span>

            <h3>
              Calculate Your Jewellery Value
            </h3>

            <label>
              Gold Weight (grams)
            </label>

            <input
              type="number"
              placeholder="Example: 10"
              value={weight}
              onChange={(e) =>
                setWeight(e.target.value)
              }
            />

            <label>
              Gold Rate per gram
            </label>

            <input
              type="number"
              value={goldRate}
              onChange={(e) =>
                setGoldRate(e.target.value)
              }
            />

            <label>
              Making Charges (%)
            </label>

            <input
              type="number"
              value={makingCharge}
              onChange={(e) =>
                setMakingCharge(
                  e.target.value
                )
              }
            />

            <button
              className="calculate-button"
              onClick={calculateGoldPrice}
            >
              Calculate Price
            </button>

            {calculatedPrice && (

              <div className="calculation-result">

                <span>
                  Estimated Jewellery Value
                </span>

                <strong>
                  ₹
                  {calculatedPrice.toLocaleString(
                    "en-IN"
                  )}
                </strong>

                <small>
                  Includes making charges and
                  3% GST
                </small>

              </div>

            )}

          </div>

        )}

      </section>

      {/* ABOUT */}
      <section
        className="about-section"
        id="about"
      >

        <div className="about-content">

          <span className="section-label">
            OUR STORY
          </span>

          <h2>
            Jewellery is not
            <br />
            just{" "}
            <em>
              what you wear.
            </em>
          </h2>

          <p>
            It is the memory of a celebration,
            the gift that marked a milestone,
            and the piece that quietly becomes
            part of your identity.
          </p>

          <p>
            Supriya Jewellery brings together
            contemporary design and timeless
            craftsmanship to create pieces that
            stay meaningful long after the moment
            has passed.
          </p>

          <button className="dark-button">
            Read Our Story
          </button>

        </div>

        <div className="about-visual">

          <div className="about-frame">

            <img
              src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85"
              alt="Gold jewellery"
              onError={(e) => {
                e.currentTarget.src =
                  fallbackImage;
              }}
            />

          </div>

        </div>

      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">

        <span className="section-label">
          STAY IN THE LOOP
        </span>

        <h2>
          Be the first to discover
          <br />
          <em>what's new.</em>
        </h2>

        <p>
          Sign up for new collections, jewellery
          stories and exclusive offers.
        </p>

        <div className="newsletter-form">

          <input
            type="email"
            placeholder="Your email address"
          />

          <button>
            Subscribe
          </button>

        </div>

      </section>

      {/* FOOTER */}
      <footer>

        <div className="footer-main">

          <div className="footer-brand">

            <div className="footer-logo">
              SUPRIYA
            </div>

            <span>
              FINE JEWELLERY
            </span>

            <p>
              Timeless jewellery crafted for
              meaningful moments.
            </p>

          </div>

          <div className="footer-column">

            <h4>
              SHOP
            </h4>

            <a href="#collections">
              Chains
            </a>

            <a href="#collections">
              Necklaces
            </a>

            <a href="#collections">
              Rings
            </a>

            <a href="#collections">
              Earrings
            </a>

          </div>

          <div className="footer-column">

            <h4>
              HELP
            </h4>

            <a href="#home">
              Contact Us
            </a>

            <a href="#home">
              Shipping
            </a>

            <a href="#home">
              Returns
            </a>

            <a href="#home">
              Care Guide
            </a>

          </div>

          <div className="footer-column">

            <h4>
              ABOUT
            </h4>

            <a href="#about">
              Our Story
            </a>

            <a href="#about">
              Craftsmanship
            </a>

            <a href="#calculator">
              Gold Calculator
            </a>

          </div>

        </div>

        <div className="footer-bottom">

          <span>
            © 2026 Supriya Jewellery
          </span>

          <span>
            Designed with timeless elegance
          </span>

        </div>

      </footer>

    </div>
  );
}

export default App;