import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Sidebar from "./Sidebar";

const EditProduct = () => {
  //get single data student
  const { id } = useParams("");
  const navigate = useNavigate();
  console.log(id);

  const [inputdata, setInputdata] = useState({});

  const getProductData = async () => {
    const res = await fetch(`http://localhost:8090/stores/get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setInputdata(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getProductData();
  });

  const [drug_name, setDrugName] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [price, setPrice] = useState();
  const [countInStock, setCountInStock] = useState();
  const [brand, setBrand] = useState();

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

  const updatedData = {
    drug_name: drug_name,
    category: category,
    description: description,
    image: image,
    price: price,
    countInStock: countInStock,
    brand: brand,
  };

  //edit product
  const handleEditProduct = (id) => {
    axios
      .put(`http://localhost:8090/stores/edit/${id}`, updatedData)
      .then(() => {
        toast.success("product Updated Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }, navigate("/pharmacy/medicalDash"));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <Sidebar />
      </div>
      <form
        onSubmit={handleEditProduct.bind(null, inputdata._id)}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
      >
        <div className="mb-6">
          <label
            htmlFor="drug_name"
            className="block mb-1 font-medium text-gray-700"
          >
            Drug Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            id="drug_name"
            name="drug_name"
            defaultValue={inputdata.drug_name}
            onChange={(e) => setDrugName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block mb-1 font-medium text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            id="category"
            name="category"
            defaultValue={inputdata.category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-1 font-medium text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            id="description"
            name="description"
            defaultValue={inputdata.description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="image"
            className="block mb-1 font-medium text-gray-700"
          >
            Image
          </label>
          <img
            src={inputdata.image}
            alt={inputdata.image}
            className="object-cover w-20 h-20 mb-2"
          />
          <input
            type="file"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            id="image"
            name="image"
            onChange={(e) => converttoBase64(e)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="price"
            className="block mb-1 font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            id="price"
            name="price"
            defaultValue={inputdata.price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="countInStock"
            className="block mb-1 font-medium text-gray-700"
          >
            Count In Stock
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            id="countInStock"
            name="countInStock"
            defaultValue={inputdata.countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="brand"
            className="block mb-1 font-medium text-gray-700"
          >
            Brand
          </label>

          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            id="brand"
            name="brand"
            defaultValue={inputdata.brand}
            onChange={(e) => setBrand(e.target.value)}
          />

          <button className="mt-4 btn btn-primary">Save Changes</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditProduct;
