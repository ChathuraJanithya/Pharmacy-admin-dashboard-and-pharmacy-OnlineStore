import React, { useEffect } from "react";
import $ from "jquery";
import "../../css/sidebar.css";

export default function Sidebar() {
  useEffect(() => {
    const trigger = $(".hamburger");
    const overlay = $(".overlay");
    let isClosed = false;

    const hamburgerCross = () => {
      if (isClosed) {
        overlay.hide();
        trigger.removeClass("is-open");
        trigger.addClass("is-closed");
        isClosed = false;
      } else {
        overlay.show();
        trigger.removeClass("is-closed");
        trigger.addClass("is-open");
        isClosed = true;
      }
    };

    trigger.on("click", hamburgerCross);

    $('[data-toggle="offcanvas"]').on("click", () => {
      $("#wrapper").toggleClass("toggled");
    });

    // Return a cleanup function to remove event listeners
    return () => {
      trigger.off("click", hamburgerCross);
      $('[data-toggle="offcanvas"]').off("click");
    };
  }, []);

  return (
    <div id="wrapper">
      <div class="overlay"></div>

      <nav
        class="navbar navbar-inverse fixed-top "
        id="sidebar-wrapper"
        role="navigation"
      >
        <ul class="nav sidebar-nav">
          <div class="sidebar-header">
            <div class="sidebar-brand">
              <a href="/pharmacy">Pharmacy</a>
            </div>
          </div>
          <li>
            <a href="/pharmacy">Dashboard</a>
          </li>
          <li>
            <a href="/pharmacy/invoice">Invoice</a>
          </li>
          <li>
            <a href="/pharmacy/dailySales">Sales</a>
          </li>
          <li>
            <a href="/pharmacy/medicalDash">Medical-Store</a>
          </li>
          <li>
            <a href="/pharmacy/logout">logout</a>
          </li>
        </ul>
      </nav>
      <div id="page-content-wrapper">
        <button
          type="button"
          class="hamburger animated fadeInLeft is-closed"
          data-toggle="offcanvas"
        >
          <span class="hamb-top"></span>
          <span class="hamb-middle"></span>
          <span class="hamb-bottom"></span>
        </button>

        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-lg-offset-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
