// Global Variables
const $window = $(window);
let rowCounter = 0;

// Hompage Chart Data and Options
let responsiveOptions;

let dataWeek = {
  labels: ["Mon", "Tu", "Wed", "Th", "Fri", "Sat", "Sun"],
  series: [[800000, 1200000, 1400000, 1300000, 800000, 1200000, 1400000], [800000, 1200000, 1400000, 1300000, 800000, 1200000, 1400000]]
};

let dataMonth = {
  labels: ["01/07", "01/14", "01/21", "01/28"],
  series: [[800000, 1200000, 1400000, 1300000], [800000, 1200000, 1400000, 1300000]]
};

let dataQuarter = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  series: [[800000, 1200000, 1400000, 1300000], [800000, 1200000, 1400000, 1300000]]
};

let dataYear = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  series: [[800000, 1200000, 1400000, 1300000, 800000, 1200000, 800000, 1200000, 1400000, 1300000, 800000, 1200000], [800000, 1200000, 1400000, 1300000, 800000, 1200000, 800000, 1200000, 1400000, 1300000, 800000, 1200000]]
};


$(document).ready(function () {

  let current_path = location.pathname.split('/');

  // Datatables - Init Edit Preview Table
  let invoiceEditTable = $('#invoice-edit-table').DataTable({
    "scrollX": true,
    "searching": false,
    "paging": false,
    "info": false,
    "autoWidth": false,
    "rowReorder": {
      "selector": "td:last-child"
    },
    "columnDefs": [
      { orderable: false, targets: '_all' },
      { "targets": 0, width: "80%", "visible": false }
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
  $("#sidebarCollapse").on("click", openSidebar);
  $("#dismiss, .overlay").on("click", closeSidebar);

  // Listen for Submit Events and Validate Form Fields
  window.addEventListener("load", initFormValidation);

  // Modal Button and Table Manipulations
  $(".pills-edit-tab").on("shown.bs.tab", initEditPane);
  $(".pills-preview-tab").on("shown.bs.tab", initPreviewPane);

  // Redraw Table when Modal is Shown Table Manipulations
  $("#sales-tab").on("shown.bs.tab", adjustTableColumnsWidths);
  $("#deposits-tab").on("shown.bs.tab", adjustTableColumnsWidths);
  $('#customerCreateInvoice').on('shown.bs.modal', adjustTableColumnsWidths);

  $("#sales-tab").on("shown.bs.tab", function() {
    console.log("Sales tab shown");
  });

  $('.add-additional').on('click', addInvoiceEditTableRow);
  $('#invoice-edit-table tbody').on('click', '.icon-delete', rmInvoiceEditTableRow);

  // Draw Homepage Chart
  var options = {
    stackBars: true,
    plugins: [
      Chartist.plugins.legend({
        legendNames: ["Credit", "Debit"],
        clickable: false
      }),
      Chartist.plugins.tooltip({
        currency: "$",
        class: "class1",
        pointClass: "my-cool-point",
        appendToBody: false
      })
    ],
    axisY: {
      labelInterpolationFnc: function (value) {
        return value / 1000 + "k";
      }
    }
  };
  drawHomepageChart(options);
  // End Draw Homepage Chart


  // Modal Animation - Needs Updating
  $(".modal").on("shown.bs.modal", function () {
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
  $('#sales-table').DataTable({
    "scrollX": true,
    "searching": false,
    "paging": false,
    "info": false,
    "autoWidth": false,
    "columnDefs": [
      { orderable: false, targets: '_all' },
      { "targets": 0, "visible": false }
    ]
  });
}

// Build Reporting Sales Table
function initReportingDepositsTable() {
  $('#deposits-table').DataTable({
    "scrollX": true,
    "searching": false,
    "paging": false,
    "info": false,
    "autoWidth": false,
    "columnDefs": [
      { orderable: false, targets: '_all' },
      { "targets": 0, "visible": false }
    ]
  });
}

// Build Modal Invoice Preview Table
function initInvoicePreviewTable() {
  $('#invoice-preview-table').DataTable({
    "scrollX": false,
    "ordering": false,
    "searching": false,
    "paging": false,
    "info": false,
    "autoWidth": true
  });
}

// Remove Modal Invoice Edit Row
function rmInvoiceEditTableRow(invoiceEditTable) {
  invoiceEditTable
    .row($(this).parents('tr'))
    .remove()
    .draw();
}

// Add Modal Invoice Edit Row
function addInvoiceEditTableRow() {
  var rowNode = invoiceEditTable
    .row.add([
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
    .css('color', 'red')
    .animate({ color: 'black' });
};

// Resize Table Rows
function adjustTableColumnsWidths() {
  $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
}

function initPreviewPane() {
  $(".invoice-save-draft").hide();
  $(".pills-edit-tab").show();
  $(".invoice-send").show();
  $(".pills-preview-tab").hide();
  $(".cancel").html("Close");
  $(".invoice-page-heading").html("Preview Invoice");
  $($.fn.dataTable.tables(true)).DataTable()
    .columns.adjust();
}

// Debouncer
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) { func.apply(context, args); }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) { func.apply(context, args); }
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
  $('.main-link a').each(function () {
    var fullLink = $(this).attr('href');
    var lastPart = fullLink.split('/');
    if (current_path[current_path.length - 2] === lastPart[lastPart.length - 2]) {
      $(this).parent().addClass('active');
    }
  });
}

// Open Sidebar
function openSidebar() {
  $("#sidebar").toggleClass("active");
  $(".overlay").addClass("active");
  document.getElementById("closeMenu").focus();
}

// Close Sidebar
function closeSidebar() {
  $("#sidebar").removeClass("active");
  // hide overlay
  $(".overlay").removeClass("active");
}

// Prevent Submit and Validate Form Fields
function initFormValidation() {
  var forms = document.getElementsByClassName("needs-validation");
  // Loop over them and prevent submission
  var validation = Array.prototype.filter.call(forms, function (form) {
    form.addEventListener("submit", function (event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    }, false);
  });
}


function initEditPane() {
  $(".invoice-save-draft").show();
  $(".pills-edit-tab").hide();
  $(".invoice-send").hide();
  $(".pills-preview-tab").show();
  $(".invoice-page-heading").html("Create Invoice");
}

function drawHomepageChart(options) {
  if ($(".data-chart")[0]) {
    var ctWeek = new Chartist.Bar("#ct-week", dataWeek, options, responsiveOptions).on("draw", function (data) {
      if (data.type === "bar") {
        data.element.attr({
          style: "stroke-width: 20px;"
        });
      }
    });
    var ctMonth = new Chartist.Bar("#ct-month", dataMonth, options, responsiveOptions).on("draw", function (data) {
      if (data.type === "bar") {
        data.element.attr({
          style: "stroke-width: 20px;"
        });
      }
    });
    var ctQuarter = new Chartist.Bar("#ct-quarter", dataQuarter, options, responsiveOptions).on("draw", function (data) {
      if (data.type === "bar") {
        data.element.attr({
          style: "stroke-width: 20px;"
        });
      }
    });
    var ctYear = new Chartist.Bar("#ct-year", dataYear, options, responsiveOptions).on("draw", function (data) {
      if (data.type === "bar") {
        data.element.attr({
          style: "stroke-width: 20px;"
        });
      }
    });
    $('a[data-toggle="pill"]').on("shown.bs.tab", function (event) {
      ctWeek.update();
      ctMonth.update();
      ctQuarter.update();
      ctYear.update();
    });
  }
}

