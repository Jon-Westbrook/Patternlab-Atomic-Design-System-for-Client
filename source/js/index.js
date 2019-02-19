import * as sidebar from "./modules/sidebar";
import * as homeChart from "./modules/homeChart";

// Global Variables
const $window = $(window);
let rowCounter = 0;

// Hompage Chart Data and Options
let responsiveOptions;

const dataWeek = {
  labels: ["Mon", "Tu", "Wed", "Th", "Fri", "Sat", "Sun"],
  series: [
    [800000, 1200000, 1400000, 1300000, 800000, 1200000, 1400000],
    [800000, 1200000, 1400000, 1300000, 800000, 1200000, 1400000]
  ]
};

const dataMonth = {
  labels: ["01/07", "01/14", "01/21", "01/28"],
  series: [
    [800000, 1200000, 1400000, 1300000],
    [800000, 1200000, 1400000, 1300000]
  ]
};

const dataQuarter = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  series: [
    [800000, 1200000, 1400000, 1300000],
    [800000, 1200000, 1400000, 1300000]
  ]
};

const dataYear = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  series: [
    [
      800000,
      1200000,
      1400000,
      1300000,
      800000,
      1200000,
      800000,
      1200000,
      1400000,
      1300000,
      800000,
      1200000
    ],
    [
      800000,
      1200000,
      1400000,
      1300000,
      800000,
      1200000,
      800000,
      1200000,
      1400000,
      1300000,
      800000,
      1200000
    ]
  ]
};

$(document).ready(function() {
  const current_path = location.pathname.split("/");

  // Datatables - Init Edit Preview Table
  const invoiceEditTable = $("#invoice-edit-table").DataTable({
    scrollX: true,
    searching: false,
    paging: false,
    info: false,
    autoWidth: false,
    rowReorder: {
      selector: "td:last-child"
    },
    columnDefs: [
      { orderable: false, targets: "_all" },
      { targets: 0, width: "80%", visible: false }
    ]
  });

  // Datatables - Init Invoice Preview Table
  initInvoicePreviewTable();

  // Datatables - Init Invoice Preview Table
  initReportingSalesTable();

  // Datatables - Init Invoice Preview Table
  initReportingDepositsTable();

  // Init Datepickers
  initDatepickers();

  // Detect Current URL and give active class to menu item
  activateMenuItem(current_path);

  // Sidebar Open/Close
  $("#sidebarCollapse").on("click", sidebar.openSidebar);
  $("#dismiss, .overlay").on("click", sidebar.closeSidebar);

  // Listen for Submit Events and Validate Form Fields
  window.addEventListener("load", initFormValidation);

  // Modal Button and Table Manipulations
  $(".pills-edit-tab").on("shown.bs.tab", initEditPane);
  $(".pills-preview-tab").on("shown.bs.tab", initPreviewPane);

  // Redraw Table when Modal is Shown Table Manipulations
  $("#sales-tab").on("shown.bs.tab", adjustTableColumnsWidths);
  $("#deposits-tab").on("shown.bs.tab", adjustTableColumnsWidths);
  $("#customerCreateInvoice").on("shown.bs.modal", adjustTableColumnsWidths);

  $(".add-additional").on("click", addInvoiceEditTableRow);
  $("#invoice-edit-table tbody").on(
    "click",
    ".icon-delete",
    rmInvoiceEditTableRow
  );

  // Draw Homepage Chart
  homeChart.drawChart(homeChart.options);

  // Modal Animation - Needs Updating
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
}); // End document ready

// GLOBAL FUNCTIONS

// Build Reporting Sales Table
function initReportingSalesTable() {
  $("#sales-table").DataTable({
    scrollX: true,
    searching: false,
    paging: false,
    info: false,
    autoWidth: false,
    columnDefs: [
      { orderable: false, targets: "_all" },
      { targets: 0, visible: false }
    ]
  });
}

// Build Reporting Sales Table
function initReportingDepositsTable() {
  $("#deposits-table").DataTable({
    scrollX: true,
    searching: false,
    paging: false,
    info: false,
    autoWidth: false,
    columnDefs: [
      { orderable: false, targets: "_all" },
      { targets: 0, visible: false }
    ]
  });
}

// Build Modal Invoice Preview Table
function initInvoicePreviewTable() {
  $("#invoice-preview-table").DataTable({
    scrollX: false,
    ordering: false,
    searching: false,
    paging: false,
    info: false,
    autoWidth: true
  });
}

// Remove Modal Invoice Edit Row
function rmInvoiceEditTableRow(invoiceEditTable) {
  invoiceEditTable
    .row($(this).parents("tr"))
    .remove()
    .draw();
}

// Add Modal Invoice Edit Row
function addInvoiceEditTableRow() {
  var rowNode = invoiceEditTable.row
    .add([
      rowCounter,
      '<input type="text" class="w-100 bg-gray-light p-3" placeholder="Enter Item Name">',
      '<input type="text" class="w-100 bg-gray-light p-3" >',
      '<input type="text" class="w-100 bg-gray-light p-3" >',
      '<input type="text" class="w-100 bg-gray-light p-3" >',
      '<a href=""class="d-inline-block icon-delete"><img src="../../images/icons/close-gray.svg"></a>',
      '<a href=""class="d-inline-block handle-reorder"><img src="../../images/icons/handle-reorder.svg"></a>'
    ])
    .draw()
    .node();

  rowCounter++;

  $(rowNode)
    .css("color", "red")
    .animate({ color: "black" });
}

// Resize Table Rows
function adjustTableColumnsWidths() {
  $($.fn.dataTable.tables(true))
    .DataTable()
    .columns.adjust();
}

function initPreviewPane() {
  $(".invoice-save-draft").hide();
  $(".pills-edit-tab").show();
  $(".invoice-send").show();
  $(".pills-preview-tab").hide();
  $(".cancel").html("Close");
  $(".invoice-page-heading").html("Preview Invoice");
  $($.fn.dataTable.tables(true))
    .DataTable()
    .columns.adjust();
}

// Debouncer
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

function initEditPane() {
  $(".invoice-save-draft").show();
  $(".pills-edit-tab").hide();
  $(".invoice-send").hide();
  $(".pills-preview-tab").show();
  $(".invoice-page-heading").html("Create Invoice");
}
