/* eslint-disable func-names */
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
  // Animate modal headers when loaded
  $(".modal-full").on("shown.bs.modal", event => {
    modals.animateModalHeader(event.currentTarget);

    // Focus First Input - too specific currently, needs extending for all modals
    // $("#validationCustom01").trigger("focus");
  });

  // Hide the Carousel on Close
  $(".caro-close").on("click", util.hideCarousel);

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

  // Swap Between Invoice Modal Edit and Preview
  $(".pills-preview-tab").on("click", function(e) {
    e.preventDefault();
    $(this).tab("show");
    $(".pills-edit-tab").removeClass("active show");
  });
  $(".pills-edit-tab").on("click", function(e) {
    e.preventDefault();
    $(this).tab("show");
    $(".pills-preview-tab").removeClass("active show");
  });

  // Datatables - Init Reporting Sales Table
  tables.initReportingSalesTable();

  // Datatables - Init Reporting Deposits Table
  tables.initReportingDepositsTable();

  // Datatables - Init Invoice Edit Table
  const invoiceEditTable = tables.initInvoiceEditTable();

  // Add a row in Invoice Table
  $(".add-additional").on("click", function() {
    tables.addRow(invoiceEditTable);
  });

  // Remove Table when Modal is Shown Table Manipulations
  $("#invoice-edit-table tbody").on("click", ".icon-delete", function() {
    const row = $(this).parents("tr");
    tables.removeRow(invoiceEditTable, row);
  });

  // Init Datepickers Site-Wide
  forms.initDatepickers();

  // init credit card input formatting
  const creditCardModals = [
    "newSale",
    "customerEditCard",
    "lightbox-long",
    "lightbox-short"
  ];

  creditCardModals.forEach(modalId => {
    $(`#${modalId}`).on("shown.bs.modal", function(e) {
      $(this)
        .find(".creditCard")
        .toArray()
        .forEach(el => forms.formatCreditCard(el));

      $(this)
        .find(".exp-date")
        .toArray()
        .forEach(el => forms.formatExpDate(el));
    });
  });

  // Highlight Current Sidebar Menu Item
  const current_path = window.location.pathname.split("/");
  sidebar.activateMenuItem(current_path);

  // Sidebar Open/Close
  $("#sidebarCollapse").on("click", sidebar.openSidebar);
  $("#dismiss, .overlay").on("click", sidebar.closeSidebar);

  // Listen for Submit Events and Validate Form Fields
  window.addEventListener("load", forms.initFormValidation);

  // Reset Data on Invoice When Closed and Shown Again
  $("#customerCreateInvoice").on("hidden.bs.modal", modals.resetInvoice);

  // Modal Button and Table Manipulations on Invoice Modal
  $(".pills-edit-tab").on("shown.bs.tab", modals.initEditPane);
  $(".pills-preview-tab").on("shown.bs.tab", modals.initPreviewPane);

  // Redraw Table when Modal is Shown Table Manipulations
  $("#sales-tab").on("shown.bs.tab", tables.adjustTableColumnsWidths);
  $("#deposits-tab").on("shown.bs.tab", tables.adjustTableColumnsWidths);
  $("#customerCreateInvoice").on("shown.bs.modal", function() {
    var $transitionEl = $(this).find(".modal-dialog");

    $transitionEl.on("transitionend", function transitionHandler() {
      setTimeout(tables.adjustTableColumnsWidths, 250);
      $transitionEl.off("transitionend", transitionHandler);
    });
  });

  $("#customerCreateInvoice")
    .find(".nav-pills [data-toggle]")
    .on("shown.bs.tab", function() {
      tables.adjustTableColumnsWidths();
    });

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
