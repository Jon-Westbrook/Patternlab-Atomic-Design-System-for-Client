/* eslint-disable import/extensions */

import * as tables from "./modules/tables.js";
import * as sidebar from "./modules/sidebar.js";
import * as homeChart from "./modules/homeChart.js";
import * as modals from "./modules/modals.js";
import * as util from "./modules/util.js";
// Global Variables
const $window = $(window);
let saleAmount;

document.addEventListener("DOMContentLoaded", () => {
  $("#newSale").modal("show");

  // Toggle Filter Bar on Mobile
  $(".btn-filter").on("click", util.toggleDates);

  // Listen for Filter Button Clicks => Toggle the Text
  const filterBtn = document.querySelector("#filterBtn");
  if (filterBtn !== null) {
    filterBtn.addEventListener("click", () => {
      if (filterBtn.innerHTML === "Hide") {
        filterBtn.innerHTML = "Filter";
      } else {
        filterBtn.innerHTML = "Hide";
      }
    });
  }

  // Datatables - Init Invoice Preview Table
  tables.initInvoicePreviewTable();

  // Datatables - Init Invoice Preview Table
  tables.initReportingSalesTable();

  // Datatables - Init Invoice Preview Table
  tables.initReportingDepositsTable();

  // Init Datepickers
  initDatepickers();

  // Detect Current URL and give active class to menu item
  const current_path = location.pathname.split("/");
  activateMenuItem(current_path);

  // Sidebar Open/Close
  $("#sidebarCollapse").on("click", sidebar.openSidebar);
  $("#dismiss, .overlay").on("click", sidebar.closeSidebar);

  // Listen for Submit Events and Validate Form Fields
  window.addEventListener("load", initFormValidation);

  // Modal Button and Table Manipulations
  $(".pills-edit-tab").on("shown.bs.tab", modals.initEditPane);
  $(".pills-preview-tab").on("shown.bs.tab", modals.initPreviewPane);

  // Redraw Table when Modal is Shown Table Manipulations
  $("#sales-tab").on("shown.bs.tab", tables.adjustTableColumnsWidths);
  $("#deposits-tab").on("shown.bs.tab", tables.adjustTableColumnsWidths);
  $("#customerCreateInvoice").on(
    "shown.bs.modal",
    tables.adjustTableColumnsWidths
  );

  // Add a row in Invoice Table
  $(".add-additional").on("click", tables.addInvoiceEditTableRow);

  // Remove Table when Modal is Shown Table Manipulations
  $("#invoice-edit-table tbody").on(
    "click",
    ".icon-delete",
    tables.rmInvoiceEditTableRow
  );

  // Draw Homepage Chart
  homeChart.drawChart(homeChart.options);

  let modal;
  let header;
  let heading;
  let mainBox;

  function animateModalHeader() {
    var scrollTop = modal.scrollTop();
    if (scrollTop > 10) {
      header.addClass("shrink");
      if (header.height() < 160 && header.height() >= 76) {
        mainBox.css("z-index", 1010);
      }
    } else {
      header.removeClass("shrink");
      mainBox.css("z-index", 1020);
    }
  }

  // Animate modal headers when loaded
  $(".modal").on("shown.bs.modal", function() {
    modal = $(this);
    header = $(".modal.fade.show .modal-header");
    heading = $(".modal.fade.show .modal-header .heading-col");
    mainBox = $(".modal.fade.show .mainBox");
    modal.scroll(util.debounce(animateModalHeader, 5));
  });

  // Update Subtotal on New Sale Modal
  const amountEntered = document.querySelector("#amountOwed");
  if (amountEntered !== null) {
    amountEntered.addEventListener("blur", updateSubtotal);
  }

  // Apply Tax after Credit Card is entered
  const cardEntered = document.querySelector(".creditCard");
  if (cardEntered !== null) {
    cardEntered.addEventListener("blur", calculateTotals);
  }
}); // END DOM CONTENT LOADED

function updateSubtotal() {
  const amount = this;
  const parsedAmount = parseInt(this.value, 10);
  const subTotal = document.querySelector(".subTotal");
  if (!isNaN(parsedAmount)) {
    amount.value = parsedAmount.toFixed(2);
    saleAmount = parseInt(parsedAmount.toFixed(2), 10);
    subTotal.innerHTML = `$${parsedAmount.toFixed(2)}`;
  } else {
    amount.value = (0).toFixed(2);
    subTotal.innerHTML = (0).toFixed(2);
    taxRate.innerHTML = (0).toFixed(2);
    total.innerHTML = (0).toFixed(2);
  }
}

function calculateTotals() {
  const taxRate = document.querySelector(".taxRate");
  const total = document.querySelector(".total");
  const tax = parseFloat((saleAmount * 0.035).toFixed(2));
  taxRate.innerHTML = `$${tax}`;
  total.innerHTML = `$${saleAmount + tax}`;
  $(".charge").html(`Charge $${saleAmount + tax}`);
}

// Inject jQuery-UI Datepickers
function initDatepickers() {
  $(".date").datepicker({
    showOn: "both",
    buttonImage: "../../images/icons/calendar.svg",
    dateFormat: "M d, yy"
  });
}

// Give active state to current menu item
function activateMenuItem(current_path) {
  $(".main-link a").each(function() {
    var fullLink = $(this).attr("href");
    var lastPart = fullLink.split("/");
    if (
      current_path[current_path.length - 2] === lastPart[lastPart.length - 2]
    ) {
      $(this)
        .parent()
        .addClass("active");
    }
  });
}

// Prevent Submit and Validate Form Fields
function initFormValidation() {
  var forms = document.getElementsByClassName("needs-validation");
  // Loop over them and prevent submission
  var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener(
      "submit",
      function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
}
