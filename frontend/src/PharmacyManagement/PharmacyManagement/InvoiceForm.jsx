import React, { useEffect, useState } from "react";
import { uid } from "uid";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
//import incrementString from "../helpers/incrementString";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import IncrementString from "../../helpers/incrementString";

const date = new Date();
const today = date.toLocaleDateString("en-GB", {
  month: "numeric",
  day: "numeric",
  year: "numeric",
});

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  //const [discount, setDiscount] = useState("");
  //const [tax, setTax] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierName, setCashierName] = useState("");
  const [customerName, setCustomerName] = useState("");
  //const [totalBill, setTotalBill] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [invoiceDate, setInvoiceDate] = useState(Date.now());

  const [items, setItems] = useState([
    {
      id: uid(6),
      name: "",
      qty: 1,
      price: "1.00",
    },
  ]);
  //toast message
  const showToastMessage = () => {
    toast.success("Invoice recorded Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  //save invoice info to state
  const sendData = (e) => {
    e.preventDefault();
    //alert("Added Successfully");

    const newInvoice = {
      discount,
      tax,
      invoiceNumber,
      cashierName,
      customerName,
      totalBill,
      items,
      date,
    };

    axios
      .post("http://localhost:8090/pharmacyInvoice/addInvoice", newInvoice)
      .then(() => {
        showToastMessage();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const addNextInvoiceHandler = () => {
    setInvoiceNumber((prevNumber) => IncrementString(prevNumber));
    setItems([
      {
        id: uid(6),
        name: "",
        qty: 1,
        price: "1.00",
      },
    ]);
  };

  const addItemHandler = () => {
    const id = uid(6);
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        name: "",
        qty: 1,
        price: "1.00",
      },
    ]);
  };

  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const edtiItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newItems = items.map((items) => {
      for (const key in items) {
        if (key === editedItem.name && items.id === editedItem.id) {
          items[key] = editedItem.value;
        }
      }
      return items;
    });

    setItems(newItems);
  };

  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);
  const taxRate = (tax * subtotal) / 100;
  const discountRate = (discount * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;

  useEffect(() => {
    const taxRate = (tax * subtotal) / 100;
    const discountRate = (discount * subtotal) / 100;
    const total = subtotal - discountRate + taxRate;
    setTotalBill(total);
  }, [subtotal, tax, discount]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    sendData(event);
    reviewInvoiceHandler(event);
  };
  //console.log(today);
  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>
      <ToastContainer />
      <div className="flex mx-auto max-w-7xl space-x-60">
        <form
          className="relative flex flex-col px-2 space-y-40 md:flex-row"
          onSubmit={handleOnSubmit}
        >
          <div className="flex-1 p-4 my-6 space-y-2 bg-white rounded-md shadow-sm sm:space-y-2 md:p-6">
            <div className="flex flex-col justify-between pb-4 space-y-2 border-b border-gray-900/10 md:flex-row md:items-center md:space-y-0">
              <div className="flex space-x-2">
                <span className="font-bold">Current Date: </span>
                <input
                  value={today}
                  onChange={(event) => setInvoiceDate(event.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="font-bold" htmlFor="invoiceNumber">
                  Invoice Number:
                </label>
                <input
                  required
                  className="max-w-[130px]"
                  type="number"
                  name="invoiceNumber"
                  id="invoiceNumber"
                  min="1"
                  step="1"
                  value={invoiceNumber}
                  onChange={(event) => setInvoiceNumber(event.target.value)}
                />
              </div>
            </div>
            <h1 className="text-lg font-bold text-center">INVOICE</h1>
            <div className="grid grid-cols-2 gap-2 pt-4 pb-8">
              <label
                htmlFor="cashierName"
                className="text-sm font-bold sm:text-base"
              >
                Cashier:
              </label>
              <input
                required
                className="flex-1"
                placeholder="Cashier name"
                type="text"
                name="cashierName"
                id="cashierName"
                value={cashierName}
                autoComplete="off"
                onChange={(event) => setCashierName(event.target.value)}
              />
              <label
                htmlFor="customerName"
                className="col-start-2 row-start-1 text-sm font-bold md:text-base"
              >
                Customer:
              </label>
              <input
                required
                className="flex-1"
                placeholder="Customer name"
                type="text"
                name="customerName"
                id="customerName"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
              />
            </div>
            <table className="w-full p-4 text-left">
              <thead>
                <tr className="text-sm border-b border-white md:text-base">
                  <th>ITEM</th>
                  <th>QTY</th>
                  <th>PRICE</th>
                  <th className="mr-3"> ACTION</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <InvoiceItem
                    key={item.id}
                    name={item.name}
                    id={item.id}
                    qty={item.qty}
                    price={item.price}
                    onDeleteItem={deleteItemHandler}
                    onEdtiItem={edtiItemHandler}
                    onChange={(event) => setItems(event.target.value)}
                  />
                ))}
              </tbody>
            </table>

            <button
              className="px-4 py-2 text-sm text-white bg-green-600 rounded-md shadow-sm hover:bg-green-800"
              type="button"
              onClick={addItemHandler}
            >
              Add Item
            </button>
            <div className="flex flex-col items-end pt-6 space-y-2">
              <div className="flex justify-between w-full md:w-1/2">
                <span className="font-bold">Subtotal:</span>

                <input name="subtotal" value={subtotal.toFixed(2)}></input>
              </div>
              <div className="flex justify-between w-full md:w-1/2">
                <span className="font-bold">Discount:</span>
                <input
                  value={discountRate.toFixed(2)}
                  name="discount"
                  onChange={(event) => setDiscount(event.target.value)}
                ></input>
              </div>
              <div className="flex justify-between w-full md:w-1/2">
                <span className="font-bold">Tax:</span>
                <input
                  value={taxRate.toFixed(2)}
                  name="tax"
                  onChange={(event) => setTax(event.target.value)}
                ></input>
              </div>
              <div className="flex justify-between w-full pt-2 border-t border-gray-900/10 md:w-1/2">
                <span className="font-bold">Total:</span>
                <input
                  name="totalBill"
                  value={total.toFixed(2)}
                  onChange={(event) => setTotalBill(event.target.value)}
                  className="font-bold"
                ></input>
              </div>
            </div>
          </div>
          <div className="bg-transparent basis-1/4">
            <div className="sticky top-0 z-10 pb-8 space-y-4 divide-y divide-gray-900/10 md:pl-4 md:pt-6">
              <button
                className="w-full py-2 text-sm text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600"
                type="submit"
              >
                Review Invoice
              </button>
              <InvoiceModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                invoiceInfo={{
                  invoiceNumber,
                  cashierName,
                  customerName,
                  subtotal,
                  taxRate,
                  discountRate,
                  total,
                }}
                items={items}
                onAddNextInvoice={addNextInvoiceHandler}
              />
              <div className="py-2 space-y-4">
                <div className="space-y-2">
                  <label
                    className="text-sm font-bold md:text-base"
                    htmlFor="tax"
                  >
                    Tax rate:
                  </label>
                  <div className="flex items-center">
                    <input
                      className="w-full bg-white rounded-r-none shadow-sm"
                      type="number"
                      name="tax"
                      id="tax"
                      min="0.00"
                      step="0.00"
                      placeholder="0.0"
                      value={tax}
                      onChange={(event) => setTax(event.target.value)}
                    />
                    <span className="px-4 py-2 text-gray-500 bg-gray-200 shadow-sm rounded-r-md">
                      %
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-bold md:text-base"
                    htmlFor="discount"
                  >
                    Discount rate:
                  </label>
                  <div className="flex items-center">
                    <input
                      className="w-full bg-white rounded-r-none shadow-sm"
                      type="number"
                      name="discount"
                      id="discount"
                      min="0"
                      step="0.01"
                      placeholder="0.0"
                      value={discount}
                      onChange={(event) => setDiscount(event.target.value)}
                    />
                    <span className="px-4 py-2 text-gray-500 bg-gray-200 shadow-sm rounded-r-md">
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
