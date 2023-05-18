import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useFetcher, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CartContext } from "./cart";
import Navbar from "./navBar";
import "../css/homeScreen.css";

function HomeScreen() {
  //const userId = props.userId;
  //console.log(`userId: ${userId}`);
  const [products, setProducts] = useState([]);
  const { cartItems, cartCount, addToCart, removeItem, total } =
    useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const searchProduct = (searchval) => {
    setSearchInput(searchval);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8090/products/")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const checkoutHandler = () => {
    navigate("/medicalStore/checkout", {
      state: {
        cartItems: cartItems,
        total: cartItems.reduce((a, c) => a + c.qty * c.price, 0),
      },
    });
  };

  const toggleShowCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div>
      <Navbar />
      <div className="cover">
        <h2>
          <strong>
            Medicine <span className="greeting store">Store.</span>
          </strong>
        </h2>
      </div>
      <strong className="common-heading">
        <h1>Common products</h1>
        <FontAwesomeIcon
          icon={faShoppingCart}
          onClick={toggleShowCart}
          className="cart-icon"
        />
        {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
      </strong>
      <div className="search-med">
        <input
          type="text"
          placeholder="Search"
          name="search-med"
          onChange={(e) => {
            searchProduct(e.target.value);
          }}
        />
      </div>
      {showCart && (
        <div className="cart-modal">
          <div className="cart-modal-content">
            <span className="close" onClick={toggleShowCart}>
              &times;
            </span>
            <h1 className="cart-heading">Cart</h1>
            {cartItems.length === 0 && (
              <div className="cart-empty">Cart is empty</div>
            )}

            {cartItems.map((item) => (
              <div className="cart-item" key={item.drug_name}>
                <div className="cart-item-info">
                  <div>{item.drug_name}</div>
                  <div>
                    Qty: {item.qty} Price: {item.price}
                  </div>
                </div>

                <div className="cart-item-actions">
                  <button
                    className="remove-from-cart"
                    onClick={() => removeItem(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {cartItems.length > 0 && (
              <div className="cart-total">
                <div>
                  Total: Rs. <span className="tot-price"> {total} </span>
                </div>
                <Link
                  to={{
                    pathname: "/medicineStore/checkout",
                    state: { cartItems: cartItems },
                  }}
                >
                  <button
                    className="checkout"
                    value={cartItems}
                    onClick={checkoutHandler}
                  >
                    Checkout
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="products">
        {products
          .filter((val) => {
            if (searchInput == "") {
              return val;
            } else if (
              val.drug_name.toLowerCase().includes(searchInput.toLowerCase())
            ) {
              return val;
            }
          })
          .map((product) => (
            <div className="product" key={product.drug_name}>
              <a href={`/medicineStore/product/${product.drug_name}`}>
                <p>
                  <strong> {product.drug_name} </strong>
                </p>
              </a>
              <div className="product-img">
                <a href={`/medicineStore/product/${product.drug_name}`}>
                  <img src={`${product.image}`} alt={`${product.drug_name}`} />
                </a>
              </div>
              <p className="product-price">Rs. {product.price}</p>
              <button
                className="add-to-cart"
                onClick={() => addToCart(product)}
              >
                {" "}
                Add to cart{" "}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HomeScreen;
