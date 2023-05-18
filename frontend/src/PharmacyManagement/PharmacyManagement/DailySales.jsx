import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InvoiceItem from "./InvoiceItem";
import Sidebar from "./Sidebar";

const DailySales = () => {
  const [dailySales, setDailySales] = useState([]);
  const [totalGain, setTotalGain] = useState(0);
  const [date, setDate] = useState();
  const [rowData, setRowData] = useState([]);

  //useStates for the update form
  const [invoiceNumber, setInvoiceNumber] = useState();
  const [cashierName, setCashierName] = useState();
  const [customerName, setCustomerName] = useState();
  //const [totalBill, setTotalBill] = useState(0);
  const [discount, setDiscount] = useState();
  const [tax, setTax] = useState();
  const [totalBill, setTotalBill] = useState();
  const [invoiceDate, setInvoiceDate] = useState();
  const [id, setId] = useState("");

  const [items, setItems] = useState();

  const showToastMessage = () => {
    toast.error("no Data found on the selected date !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  //to get the daily sales
  useEffect(() => {
    axios
      .get("http://localhost:8090/pharmacyInvoice/")
      .then((res) => {
        setDailySales(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  //to get all the sales
  const filterAllData = () => {
    axios
      .get("http://localhost:8090/pharmacyInvoice/")
      .then((res) => {
        setDailySales(res.data);
      })
      .catch((err) => {
        showToastMessage();
      });
  };

  //delete the invoice
  const deleteInvoice = (id) => {
    axios
      .delete(`http://localhost:8090/pharmacyInvoice/deleteInvoice/${id}`)
      .then((res) => {
        console.log(res.data);
        toast.success("Invoice Deleted Successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        filterAllData();
      });
  };

  //update the invoice
  const updatedData = {
    invoiceNumber: invoiceNumber,
    cashierName: cashierName,
    customerName: customerName,
    totalBill: totalBill,
    discount: discount,
    tax: tax,
    invoiceDate: invoiceDate,
    items: items,
  };
  const updateInvoice = (id) => {
    axios
      .put(
        `http://localhost:8090/pharmacyInvoice/updateInvoice/${id}`,
        updatedData
      )
      .then(() => {
        toast.success("Invoice Updated Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        filterAllData();
      });
  };
  //to generate the pdf
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.addFont("Arimo-Bold.ttf", "Arimo", "bold");
    doc.setTextColor(0, 94, 184);
    doc.setFontSize(18);
    doc.text("Daily Sales Report", 10, 10);
    doc.text("--------------------------------------------------", 10, 15);
    doc.addFont("Arimo-Regular.ttf", "Arimo", "normal");
    doc.setFillColor("#f2f2f2");
    doc.setFontSize(15);
    doc.text(`Date: ${date}`, 10, 20);
    doc.text(`Total Sales: ${dailySales.length}`, 10, 30);
    doc.text(`Cashier Name: ${dailySales[0].cashierName}`, 10, 40);
    doc.text(`Customer Name: ${dailySales[0].customerName}`, 10, 50);
    doc.text(`Discount: ${dailySales[0].discount}`, 10, 80);
    doc.text(`Tax: ${dailySales[0].tax}`, 10, 90);
    doc.text(
      `Date of Invoice: ${new Date(dailySales[0].date).toLocaleDateString()}`,
      10,
      100
    );
    doc.text(`--------------------------------------------------`, 10, 120);
    doc.text(`Total Gain: ${totalGain}                         `, 10, 125);
    doc.text(`--------------------------------------------------`, 10, 130);
    doc.save("DailySalesReport.pdf");
  };

  //filter the daily sales
  const filterDailySales = (today) => {
    axios
      .get(`http://localhost:8090/PharmacyInvoice/getInvoicefor/${date}`)
      .then((res) => {
        setDailySales(res.data);
      })
      .catch((err) => {
        showToastMessage();
      });
  };

  //to calculate the total gain
  useEffect(() => {
    let total = 0;
    dailySales.forEach((pharmacyInvoice) => {
      const totalBill = pharmacyInvoice.totalBill;
      const discount = pharmacyInvoice.discount;
      const tax = pharmacyInvoice.tax;
      const totalGain =
        totalBill - (totalBill * discount) / 100 + (totalBill * tax) / 100;
      total += totalGain;
    });
    setTotalGain(total.toFixed(2));
  }, [dailySales]);

  //handle the update form
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleupdateFormClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseFormClick = () => {
    setIsFormVisible(false);
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

  //return method
  return (
    <div>
      {/* SideBar */}
      <div>
        <Sidebar />
      </div>
      <div className="text-5xl font-semibold text-center uppercase text-black/90">
        Sales
      </div>
      <div className="min-h-screen mx-12 my-4 bg-white table-auto">
        <div className="mx-auto max-w-7xl"></div>

        <div className="mt-8 ">
          <table className="table bg-white">
            <thead>
              <tr>
                <th scope="col">Discount</th>
                <th scope="col">Tax</th>
                <th scope="col">Invoice Number</th>
                <th scope="col">Cashier Name</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Items</th>
                <th scope="col">Total Bill</th>
                <th scope="col">Date of Invoice</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dailySales.map((pharmacyInvoice) => (
                <tr key={pharmacyInvoice._id}>
                  <td>{pharmacyInvoice.discount} </td>
                  <td>{pharmacyInvoice.tax}</td>
                  <td>{pharmacyInvoice.invoiceNumber}</td>
                  <td>{pharmacyInvoice.cashierName}</td>
                  <td>{pharmacyInvoice.customerName}</td>
                  <td>
                    {pharmacyInvoice.items.map((item) => (
                      <p key={item.id}>
                        {item.name} - Q:{item.qty} - {item.price}
                      </p>
                    ))}
                  </td>
                  <td>{pharmacyInvoice.totalBill.toFixed(2)}</td>
                  <td>{new Date(pharmacyInvoice.date).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleupdateFormClick();
                        setRowData(pharmacyInvoice);
                        setId(pharmacyInvoice._id);
                      }}
                    >
                      <i className="material-icons">&#xE254;</i>
                    </button>
                    <button
                      onClick={deleteInvoice.bind(null, pharmacyInvoice._id)}
                    >
                      <i className="material-icons">&#xE872;</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="float-right font-bold">Total Gain: {totalGain}</div>
          <div>
            <label htmlFor="date" className="text-2xl text-black/100">
              Select Date
            </label>
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              className=""
            />
            <br></br>
            <button className="p-generate-btn" onClick={filterDailySales}>
              <span>Search</span>
            </button>
            <button className="p-generatePDF-btn" onClick={generatePDF}>
              <span>GeneratePDF</span>
            </button>
            <br></br>
            <br></br> <br></br>
            <button className="p-generate-btn" onClick={filterAllData}>
              <span>All sales Data</span>
            </button>
          </div>
        </div>
      </div>
      {/*update form*/}

      {isFormVisible && (
        <div className="form-container">
          <form
            className="form"
            onSubmit={updateInvoice.bind(null, rowData._id)}
          >
            <h2 className="form-title">Update Form</h2>
            <div className="flex">
              <label htmlFor="discount" className="upload-form-label">
                Discount
              </label>
              <input
                type="number"
                placeholder="Discount"
                defaultValue={rowData.discount || ""}
                onChange={(e) => setDiscount(e.target.value)}
              />

              <label htmlFor="tax" className="upload-form-label">
                Tax
              </label>
              <input
                type="text"
                placeholder="Tax"
                defaultValue={rowData.tax || ""}
                onChange={(e) => setTax(e.target.value)}
              />
            </div>
            <label htmlFor="invoice-no" className="upload-form-label">
              Invoice Number
            </label>
            <input
              type="number"
              placeholder="invoice Number"
              defaultValue={rowData.invoiceNumber || ""}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="input-field"
            />
            <div className="flex">
              <label htmlFor="cachier-name" className="upload-form-label">
                Cachier Name
              </label>
              <input
                type="text"
                placeholder="cashier Name"
                defaultValue={rowData.cashierName || ""}
                onChange={(e) => setCashierName(e.target.value)}
                className="input-field"
                required
              />

              <label htmlFor="customer-name" className="upload-form-label">
                Customer-name
              </label>
              <input
                type="text"
                placeholder="customer Name"
                className="input-field"
                defaultValue={rowData.customerName || ""}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>

            <tr>
              <th>ITEM</th>
              <th>QTY</th>
              <th>PRICE</th>
            </tr>
            <tbody>
              {rowData.items.map((item) => (
                <InvoiceItem
                  Key={item.id}
                  id={item.id}
                  name={item.name}
                  qty={item.qty}
                  price={item.price}
                  onDeleteItem={deleteItemHandler}
                  onEdtiItem={edtiItemHandler}
                  onChange={(e) => setItems(e.target.value)}
                />
              ))}
            </tbody>

            <label htmlFor="total-bill" className="upload-form-label">
              total-bill
            </label>
            <input
              type="number"
              placeholder="total-bill"
              className="input-field"
              Value={rowData.totalBill || ""}
              onChange={(e) => setTotalBill(e.target.value)}
            />
            <label htmlFor="date-of-invoice" className="upload-form-label">
              Date of invoice
            </label>
            <input
              type="text"
              placeholder="date-of-invoice"
              className="input-field"
              defaultValue={new Date(rowData.date).toLocaleDateString() || ""}
              onChange={(e) => setDate(e.target.value)}
            />
            <button type="submit" className="form-button" value={rowData._id}>
              update info
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

export default DailySales;
