/* eslint-disable func-names */
/* eslint-disable import/extensions */

import * as tables from "./modules/tables.js";
import * as sidebar from "./modules/sidebar.js";
import * as homeChart from "./modules/homeChart.js";
import * as modals from "./modules/modals.js";
import * as util from "./modules/util.js";

// Global Variables
const $window = $(window);

document.addEventListener("DOMContentLoaded", () => {
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

  // Modal Animation - Needs Updating
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this;

      var args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  $(".modal").on("shown.bs.modal", function() {
    var modal = $(this);
    var header = $(".modal.fade.show .modal-header");
    var heading = $(".modal.fade.show .modal-header .heading-col");
    var mainBox = $(".modal.fade.show .mainBox");

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
    modal.scroll(debounce(animateModalHeader, 10));
  });
}); // End DOM Content Loaded

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
