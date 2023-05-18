import { BrowserRouter, Route, Routes } from "react-router-dom";

/* medicineStore */
import HomeScreen from "./MedicineStore/homeScreen";
import ProductScreen from "./MedicineStore/ProductScreen";
import LoginForm from "./MedicineStore/loginScreen";
import Container from "react-bootstrap/Container";
import Checkout from "./MedicineStore/checkout.jsx";
import { CartProvider } from "./MedicineStore/cart";
import MyOrders from "./MedicineStore/myOrders";
import DentalHome from "./MedicineStore/Home";

/* Pharmacy Admin */
import DailySales from "./PharmacyManagement/PharmacyManagement/DailySales";
import InvoiceForm from "./PharmacyManagement/PharmacyManagement/InvoiceForm";
import MedicalStoreDash from "./PharmacyManagement/PharmacyManagement/medicalStoreDash";
import EditProduct from "./PharmacyManagement/PharmacyManagement/editProduct";
import PharmacyDashboard from "./PharmacyManagement/PharmacyManagement/dashboard";
function App() {
  return (
    <CartProvider>
      <>
        <BrowserRouter>
          <header></header>
          <main>
            <Container>
              <Routes>
                {/* Dental user interface */}
                <Route path="/DentalHome" element={<DentalHome />} />
                <Route path="/login" element={<LoginForm />} />
                <Route
                  path="/medicineStore/product/:drug_name"
                  element={<ProductScreen />}
                />
                <Route path="/medicineStore" element={<HomeScreen />} />
                <Route path="/medicineStore/checkout" element={<Checkout />} />
                <Route path="/medicineStore/myOrders" element={<MyOrders />} />

                {/* Pharmacy Admin */}
                <Route path="/pharmacy" element={<PharmacyDashboard />} />
                <Route path="/pharmacy/dailySales" element={<DailySales />} />
                <Route path="/pharmacy/invoice" element={<InvoiceForm />} />
                <Route
                  path="/pharmacy/medicalDash"
                  element={<MedicalStoreDash />}
                />
                <Route
                  path="/medicalDash/editProduct/:id"
                  element={<EditProduct />}
                />
              </Routes>
            </Container>
          </main>
          <footer></footer>
        </BrowserRouter>
      </>
    </CartProvider>
  );
}

export default App;
