import React, { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "./Sidebar";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

const PharmacyDashboard = () => {
  const [dailySales, setDailySales] = useState("");
  const [totalGain, setTotalGain] = useState(0);

  //sales data
  useEffect(() => {
    //to calculate the total gain
    const total = () => {
      let total = 0;
      if (Array.isArray(dailySales)) {
        dailySales.forEach((pharmacyInvoice) => {
          const totalBill = pharmacyInvoice.totalBill;
          const discount = pharmacyInvoice.discount;
          const tax = pharmacyInvoice.tax;
          const totalGain =
            totalBill - (totalBill * discount) / 100 + (totalBill * tax) / 100;
          total += totalGain;
        });
      }

      setTotalGain(total.toFixed(2));
    };

    axios
      .get("http://localhost:8090/pharmacyInvoice/")
      .then((res) => {
        setDailySales(res.data);
        total();
      })
      .catch((err) => {
        alert(err.message);
      });
  });

  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <MDBContainer className="py-5">
        <center className="p-3">
          <h2>Admin Profile</h2>
        </center>
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="my-4 mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                <p className="mb-1 font-bold text-muted">Admin</p>
                <p className="mb-4 text-muted">Pharmacy Admin</p>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="list-none rounded-3">
                  <MDBListGroupItem className="p-3 d-flex justify-content-between align-items-center">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    <MDBCardText>https://mdbootstrap.com</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="p-3 d-flex justify-content-between align-items-center">
                    <MDBIcon
                      fab
                      icon="github fa-lg"
                      style={{ color: "#333333" }}
                    />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="p-3 d-flex justify-content-between align-items-center">
                    <MDBIcon
                      fab
                      icon="twitter fa-lg"
                      style={{ color: "#55acee" }}
                    />
                    <MDBCardText>@mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      Johnatan Smith
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      example@example.com
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      (097) 234-5678
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      (098) 765-4321
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      Bay Area, San Francisco, CA
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="4">
                {/* <MDBCard className="mb-4 card bg-danger mb-md-0">
                        <MDBCardBody>
                            <center>
                                <h2>No of Requests</h2>
                            </center>
                        </MDBCardBody>
                    </MDBCard> */}

                <MDBCard className="mt-3 mb-4 card bg-primary mb-md-0">
                  <MDBCardBody>
                    <center>
                      <h2>Income </h2>
                      <h2>{totalGain}</h2>
                    </center>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="4">
                <MDBCard className="mt-3 mb-4 card bg-warning mb-md-0">
                  <MDBCardBody>
                    <center>
                      <h2>Total Sales</h2>
                      <h2>{dailySales.length}</h2>
                    </center>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              {/*               <MDBCol md="4">
                <MDBCard className="mt-3 mb-4 card bg-danger mb-md-0">
                  <MDBCardBody>
                    <center>
                      <h2>Total Tests</h2>
                      <h2></h2>
                    </center>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol> */}
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default PharmacyDashboard;
