import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

function ProductScreen() {
  const params = useParams();
  const { drug_name } = params;
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const calcTotal = (cartItems) => {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].price * cartItems[i].qty;
    }
    return total;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8090/products/${drug_name}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const addToCart = () => {
    const item = {
      product: product,
      qty: quantity,
    };
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const newCart = [...existingCart, item];
    localStorage.setItem("cart", JSON.stringify(newCart));
    alert("Product added to cart!");
  };

  return (
    <div>
      <div className="product-card">
        <div className="product-card-header">
          <h1>{drug_name}</h1>
        </div>
        <div className="product-info">
          <div className="product" key={product.drug_name}>
            <a href={`/medicalStore/product/${product.drug_name}`}>
              <img src={`${product.image}`} alt={product.drug_name} />
            </a>
            <div>
              <a href={`/medicalStore/product/${product.drug_name}`}>
                <p>
                  <strong> {product.drug_name} </strong>
                </p>
              </a>
              <p className="product-price">Rs. {product.price}</p>
              <strong>
                <p>description</p>
              </strong>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="item-checkout">
        <form className="checkout-form">
          <p> Quantity:</p>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <p> Total: Rs. {product.price * quantity}</p>
          <button type="button" onClick={addToCart}>
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductScreen;
