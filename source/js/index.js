/* eslint-disable import/extensions */

import * as tables from "./modules/tables.js";
import * as sidebar from "./modules/sidebar.js";
import * as homeChart from "./modules/homeChart.js";
import * as modals from "./modules/modals.js";
import * as util from "./modules/util.js";
// Global Variables
const $window = $(window);

document.addEventListener("DOMContentLoaded", () => {
  // Trigger Modal Automagically, can be removed
  // $("#newSale").modal("show");

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
  const current_path = window.location.pathname.split("/");
  sidebar.activateMenuItem(current_path);

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
  $(".modal").on("shown.bs.modal", () => {
    modal = $(this);
    header = $(".modal.fade.show .modal-header");
    heading = $(".modal.fade.show .modal-header .heading-col");
    mainBox = $(".modal.fade.show .mainBox");
    $(modal).scroll(util.debounce(animateModalHeader, 5));
  });

  // Update Subtotal on New Sale Modal
  const amountEntered = document.querySelector("#amountOwed");
  if (amountEntered !== null) {
    amountEntered.addEventListener("blur", modals.updateSubtotal);
  }

  // Apply Tax after Credit Card is entered
  const cardEntered = document.querySelector(".creditCard");
  if (cardEntered !== null) {
    cardEntered.addEventListener("blur", modals.calculateTotals);
  }
}); // END DOM CONTENT LOADED

// Inject jQuery-UI Datepickers
function initDatepickers() {
  $(".date").datepicker({
    showOn: "both",
    buttonImage: "../../images/icons/calendar.svg",
    dateFormat: "M d, yy"
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
