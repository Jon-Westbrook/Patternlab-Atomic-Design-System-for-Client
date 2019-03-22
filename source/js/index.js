/* eslint-disable import/extensions */
import * as tables from "./modules/tables.js";
import * as sidebar from "./modules/sidebar.js";
import * as homeChart from "./modules/homeChart.js";
import * as modals from "./modules/modals.js";
import * as util from "./modules/util.js";
import * as forms from "./modules/forms.js";

// Global Variables
const $window = $(window);

document.addEventListener("DOMContentLoaded", () => {
  // Trigger Modal Automagically, can be removed
  // $("#newSale").modal("show");

  // Reporting - Update the Button Copy after Selecting a Dropdown Item
  $(".contextual a").click(updatedButtonCopy);
  function updatedButtonCopy() {
    $(".contextual-btn").text($(this).text());
    $(".contextual-btn").val($(this).text());
  }

  // Animate modal headers when loaded
  $(".modal-full").on("shown.bs.modal", event => {
    modals.animateModalHeader(event.currentTarget);
  });

  // Toggle Filter Bar on Mobile
  $(".dates-toggle").on("click", util.toggleDates);

  // Listen for Filter Button Clicks => Toggle the Text
  const filterBtn = document.querySelector(".dates-toggle");
  if (filterBtn !== null) {
    filterBtn.addEventListener("click", () => {
      if (filterBtn.innerHTML === "Hide") {
        filterBtn.innerHTML = "Filter";
      } else {
        filterBtn.innerHTML = "Hide";
      }
    });
  }

  // Datatables - Init Invoice Modal Preview Table
  tables.initInvoicePreviewTable();

  // Datatables - Init Reporting Sales Table
  tables.initReportingSalesTable();

  // Datatables - Init Reporting Deposits Table
  tables.initReportingDepositsTable();

  // Init Datepickers Site-Wide
  forms.initDatepickers();

  // Highlight Current Sidebar Menu Item
  const current_path = window.location.pathname.split("/");
  sidebar.activateMenuItem(current_path);

  // Sidebar Open/Close
  $("#sidebarCollapse").on("click", sidebar.openSidebar);
  $("#dismiss, .overlay").on("click", sidebar.closeSidebar);

  // Listen for Submit Events and Validate Form Fields
  window.addEventListener("load", forms.initFormValidation);

  // Modal Button and Table Manipulations on Invoice Modal
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
