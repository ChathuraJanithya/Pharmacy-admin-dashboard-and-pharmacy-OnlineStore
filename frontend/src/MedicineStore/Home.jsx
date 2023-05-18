import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./navBar";

const DentalHome = () => {
  return (
    <div className="dental-home">
      <Navbar />

      <div className="home-cover">
        <h2>
          <strong>
            Dental <span className="greeting store">Management.</span>
          </strong>
        </h2>
      </div>

      <section class="about">
        <div class="about-img"></div>
        <div></div>
      </section>

      <section class="aboutus">
        <div class="row">
          <div class="content">
            <span class="title-span">WHO WE ARE</span>
            <h2>
              We are Dental <span class="orange-span">Management.</span>
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, illo
              saepe! Magnam, unde explicabo amet perferendis voluptate
              distinctio facilis quae ipsa quas! Officiis veritatis aut est vero
              id, debitis pariatur?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
              soluta laboriosam. Laborum aspernatur laboriosam deserunt
              cupiditate laudantium illum commodi. Vero.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
              soluta laboriosam. Laborum aspernatur laboriosam deserunt
              cupiditate laudantium illum commodi. Vero. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Itaque, soluta laboriosam.
              Laborum aspernatur laboriosam deserunt cupiditate Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Itaque, soluta
              laboriosam. Laborum aspernatur laboriosam deserunt cupiditate
            </p>
          </div>
          <div class="image">
            <img src="/images/about1.jpeg" alt="" />
          </div>
        </div>

        <div class="row">
          <div class="image">
            <img src="/images/about2.jpeg" alt="" />
          </div>
          <div class="content">
            <h2>
              We provide amazing <span class="orange-span">service.</span>
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, illo
              saepe! Magnam, unde explicabo amet perferendis voluptate
              distinctio facilis quae ipsa quas! Officiis veritatis aut est vero
              id, debitis pariatur?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
              soluta laboriosam. Laborum aspernatur laboriosam deserunt
              cupiditate laudantium illum commodi. Vero. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Itaque, soluta laboriosam.
              Laborum aspernatur laboriosam deserunt cupiditate laudantium illum
              commodi. Vero. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Itaque, soluta laboriosam. Laborum aspernatur laboriosam
              deserunt cupiditate Lorem ipsum dolor sit amet consectetur
              adipisicing elit.
            </p>
            <a href="#">
              <button class="btn-get">Read More</button>
            </a>
          </div>
        </div>

        <div class="cards">
          <div class="child-card">
            <div class="card-icon">
              <i
                style={{ color: "#ff4a17" }}
                class="fa fa-2x fa-solid fa-location-dot"
              ></i>
            </div>
            <div class="card-info">
              <h2>Our Office</h2>
              <p>New Kandy Rd, Malabe 10115</p>
            </div>
          </div>
          <div class="child-card">
            <div class="card-icon">
              <i
                style={{ color: "red" }}
                class="fa fa-2x fa-solid fa-envelope"
              ></i>
            </div>
            <div className="card-info">
              <h2>Email Us</h2>
              <p>Dental@gmail.com</p>
            </div>
          </div>
          <div className="child-card">
            <div class="card-icon">
              <i className="fa fa-2x fa-solid fa-phone"></i>
            </div>
            <div className="card-info">
              <h2>Call Us</h2>
              <p>+94 71XXXXXXX</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DentalHome;
