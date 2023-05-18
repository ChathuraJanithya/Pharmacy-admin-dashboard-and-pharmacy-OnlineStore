import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import Sidebar from "./Sidebar";
import "../../css/medicalStoreDash.css";
const MedicalStoreDash = () => {
  const [rowData, setRowData] = useState({});
  //show success message
  const showSuccessMessage = () => {
    toast.success("product uploaded successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  //show error message
  const showErrorMessage = () => {
    toast.error("upload failed", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  //upload product form
  const [drug_name, setDrugName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");

  //Scheduled orders
  const [scheduledOrders, setScheduledOrders] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [isHiddenProducts, setIsHiddenProducts] = useState(true);

  //fetch scheduled orders
  const fetchScheduledOrders = async () => {
    setIsHidden(!isHidden);
    const response = await axios.get(
      "http://localhost:8090/orders/getScheduledOrders"
    );
    console.log(response);
    if (response.status === 200) {
      setScheduledOrders(response.data);
    }
  };

  //fetch products
  const fetchProducts = async () => {
    setIsHiddenProducts(!isHiddenProducts);
    const response = await axios.get("http://localhost:8090/products/");
    console.log(response);
    if (response.status === 200) {
      setProducts(response.data);
    }
  };

  //upload products
  const uploadData = async () => {
    const data = {
      drug_name,
      category,
      description,
      image,
      price,
      countInStock,
      brand,
    };
    axios
      .post("http://localhost:8090/stores/addmed", data)
      .then(() => {
        toast.success("Invoice Updated Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invoice Update Failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  //Delete product
  const deleteProduct = async (id) => {
    axios.delete(`http://localhost:8090/stores/delete/${id}`).then(() => {
      toast.success("Product Deleted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchProducts();
    });
  };

  const converttoBase64 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isproductsVisible, setproductsVisible] = useState(false);

  const handleAddProductClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseFormClick = () => {
    setIsFormVisible(false);
  };

  const [products, setProducts] = useState([]);

  const handleFetchProductsClick = () => {
    setproductsVisible(true);
    fetchProducts();
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleEditClick = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  // Send reminder email
  const handleReminderClick = async (orderId) => {
    try {
      const res = await axios.post(
        "http://localhost:8090/orders/sendReminder",
        { orderId }
      );
      console.log(res.data.message);
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to send reminder email");
    }
  };

  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <h1 className="text-3xl text-center text-black/100">
        {" "}
        - Medical Store Dashboard -
      </h1>
      <br />
      <div>
        <div className="flex flex-col">
          <button
            className="button hover:stroke-zinc-50"
            onClick={handleFetchProductsClick}
          >
            All Available products
          </button>
          <button className="button" onClick={fetchScheduledOrders}>
            Scheduled orders
          </button>

          <button className="button" onClick={handleAddProductClick}>
            Add products
          </button>
        </div>
      </div>
      <div className={`sh-orders mt-5 ${isHidden ? "hidden" : ""}`}>
        <h1 className="text-3xl text-center text-black/100">
          {" "}
          - Scheduled Orders -
        </h1>
        <br />
        <table className="table table-striped table-hover">
          <tr>
            <th>Order ID :</th>
            <th>Customer Name :</th>
            <th>Scheduled Date</th>
            <th>Scheduled Email address</th>
            <th>Cotact</th>
            <th></th>
          </tr>
          <tbody>
            {scheduledOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.scheduledCustomerName}</td>
                <td>{new Date(order.scheduledDate).toLocaleDateString()}</td>
                <td>{order.scheduledEmailAdress}</td>
                <td>{order.customerContact}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleReminderClick(order._id)}
                  >
                    Send Reminder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Displaying available products -------------------------------------------------*/}
      <div className={`${isHiddenProducts ? "hidden" : ""}`}>
        <h1 className="pt-5 text-3xl text-center text-black/100">
          {" "}
          - Available Products -
        </h1>
        <br />
        {products.map((drug) => (
          <div className={`myProducts `}>
            <div key={drug._id}>
              <div className="items">
                <br />
                <center>
                  <img
                    id="imgdiv"
                    className="object-cover w-40 h-40"
                    src={drug.image}
                    alt={drug.drug_name}
                  />
                  <div className="px-3 py-3">
                    <h2 className="text-xl font-semibold">{drug.drug_name}</h2>
                    <p className="mt-2 text-gray-500">
                      Category: {drug.category}
                    </p>
                    <p className="mt-2 text-gray-500">
                      Description: {drug.description}
                    </p>
                    <p className="mt-2 text-gray-500">Price: ${drug.price}</p>
                    <p className="mt-2 text-gray-500">
                      Count in Stock: {drug.countInStock}
                    </p>
                    <p className="mt-2 text-gray-500">Brand: {drug.brand}</p>
                    <br />
                    <div className="flex space-x-2">
                      <a href={`/medicalDash/editProduct/${drug._id}`}>
                        <button
                          id="edit-butn"
                          className="float-right btn btn-primary"
                          onClick={() => {
                            handleEditClick(drug._id);
                            setRowData(drug);
                          }}
                        >
                          Edit
                        </button>
                      </a>
                      <button
                        className="float-right btn btn-danger"
                        onClick={deleteProduct.bind(null, drug._id)}
                      >
                        Delete
                      </button>
                    </div>
                    <br />

                    <hr />
                  </div>
                </center>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add product form --------------------------------------------------------*/}

      {isFormVisible && (
        <div className="form-container">
          <form className="form" onSubmit={uploadData}>
            <h2 className="form-title">Add Product</h2>

            <label htmlFor="product-name" className="upload-form-label">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Product Name"
              className="input-field"
              onChange={(event) => setDrugName(event.target.value)}
              required
            />
            <label htmlFor="product-category" className="upload-form-label">
              Product Category
            </label>
            <input
              type="text"
              placeholder="Product Category"
              className="input-field"
              onChange={(event) => setCategory(event.target.value)}
              required
            />

            <label htmlFor="product-description" className="upload-form-label">
              Product Description
            </label>
            <input
              type="text"
              placeholder="Product Description"
              className="input-field"
              onChange={(event) => setDescription(event.target.value)}
              required
            />

            <label htmlFor="product-image" className="upload-form-label">
              Product Image
            </label>
            <input
              type="file"
              placeholder="Product Image"
              className="input-field"
              accept="image/*"
              onChange={converttoBase64}
              required
            />
            {image === "" || image == null ? (
              " "
            ) : (
              <img width={50} height={50} src={image} alt="" />
            )}

            <label htmlFor="product-price" className="upload-form-label">
              Product Price
            </label>
            <input
              type="text"
              placeholder="Product Price"
              className="input-field"
              onChange={(event) => setPrice(event.target.value)}
              required
            />

            <label htmlFor="product-quantity" className="upload-form-label">
              Product Quantity
            </label>
            <input
              type="text"
              placeholder="Product Quantity"
              className="input-field"
              onChange={(event) => setCountInStock(event.target.value)}
              required
            />

            <label htmlFor="product-brand" className="upload-form-label">
              Product Brand
            </label>
            <input
              type="text"
              placeholder="Product Brand"
              className="input-field"
              onChange={(event) => setBrand(event.target.value)}
              required
            />

            <button
              type="submit"
              className="form-button"
              onClick={showSuccessMessage}
            >
              Submit
            </button>
          </form>
          <button className="close-button" onClick={handleCloseFormClick}>
            Close
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default MedicalStoreDash; //exporting the component
