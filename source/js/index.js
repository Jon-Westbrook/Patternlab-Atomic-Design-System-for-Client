$(document).ready(function() {
  // HOUSEKEEPING
  var $ = jQuery;
  var $window = $(window);

  // Toggle Sidebar
  $("#sidebarCollapse").on("click", function() {
    $("#sidebar").toggleClass("active");
    $(".overlay").addClass("active");
    document.getElementById("closeMenu").focus();
  });

  $("#dismiss, .overlay").on("click", function() {
    // hide sidebar
    $("#sidebar").removeClass("active");
    // hide overlay
    $(".overlay").removeClass("active");
  });

  // Listen for Submit Events and Validate Form Field
  window.addEventListener(
    "load",
    function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
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

            // if ($(form).find(".form-control").hasClass(":invalid")) {
            //   console.log("Somethin is wrong")
            //   form.querySelector('.primary-2').style.color = ("green");
            // }
          },
          false
        );
      });
    },
    false
  );

  // To Make Homepage Chart
  var dataWeek = {
    labels: ["Mon", "Tu", "Wed", "Th", "Fri", "Sat", "Sun"],
    series: [
      [800000, 1200000, 1400000, 1300000, 800000, 1200000, 1400000],
      [800000, 1200000, 1400000, 1300000, 800000, 1200000, 1400000]
    ]
  };

  var dataMonth = {
    labels: ["01/07", "01/14", "01/21", "01/28"],
    series: [
      [800000, 1200000, 1400000, 1300000],
      [800000, 1200000, 1400000, 1300000]
    ]
  };

  var dataQuarter = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    series: [
      [800000, 1200000, 1400000, 1300000],
      [800000, 1200000, 1400000, 1300000]
    ]
  };

  var dataYear = {
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
  var options = {
    stackBars: true,
    plugins: [
      Chartist.plugins.legend({
        legendNames: ["Credit", "Debit"]
      }),
      Chartist.plugins.tooltip({
        currency: "$",
        class: "class1",
        pointClass: "my-cool-point",
        appendToBody: false
      })
    ],
    axisY: {
      labelInterpolationFnc: function(value) {
        return value / 1000 + "k";
      }
    }
  };

  var responsiveOptions = "";

  // If chart container exists on page, init
  if ($(".data-chart")[0]) {
    var ctWeek = new Chartist.Bar(
      "#ct-week",
      dataWeek,
      options,
      responsiveOptions
    ).on("draw", function(data) {
      if (data.type === "bar") {
        data.element.attr({
          style: "stroke-width: 20px;"
        });
      }
    });

    var ctMonth = new Chartist.Bar(
      "#ct-month",
      dataMonth,
      options,
      responsiveOptions
    ).on("draw", function(data) {
      if (data.type === "bar") {
        data.element.attr({
          style: "stroke-width: 20px;"
        });
      }
    });

    var ctQuarter = new Chartist.Bar(
      "#ct-quarter",
      dataQuarter,
      options,
      responsiveOptions
    ).on("draw", function(data) {
      if (data.type === "bar") {
        data.element.attr({
          style: "stroke-width: 20px;"
        });
      }
    });

    var ctYear = new Chartist.Bar(
      "#ct-year",
      dataYear,
      options,
      responsiveOptions
    ).on("draw", function(data) {
      if (data.type === "bar") {
        data.element.attr({
          style: "stroke-width: 20px;"
        });
      }
    });

    $('a[data-toggle="pill"]').on("shown.bs.tab", function(event) {
      ctWeek.update();
      ctMonth.update();
      ctQuarter.update();
      ctYear.update();
    });
  }
  // End Chart Init

  // Debounce
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // Modal Animation
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

  $(".pills-edit-tab").hide();
  $(".invoice-send").hide();
  // $('#customerCreateInvoice').modal('show');

  // Modal Invoice - Hide/Show Modify Header when switching tabs

  // Datatables - Modal Invoice
  var editTable = $('#invoice-edit-table').DataTable({
    "scrollX": true,
    "searching": false,
    "rowReorder":  true,
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

  // Datatables - Modal Invoice
  $('#invoice-preview-table').DataTable({
    "scrollX": true,
    "ordering": false,
    "searching": false,
    "paging": false,
    "info": false,
    "autoWidth": false,
    "columnDefs": [
      { "width": "50%", "targets": 0 },
      { "width": "20%", "targets": 0 },
      { "width": "20%", "targets": 0 },
      { "width": "10%", "targets": 0 }
    ]
  });

  $("button.pills-edit-tab").on("shown.bs.tab", function(e) {
    $(".invoice-save-draft").show();
    $(".pills-edit-tab").hide();
    $(".invoice-send").hide();
    $(".pills-preview-tab").show();
    $(".invoice-page-heading").html("Create Invoice");
  });

  $("button.pills-preview-tab").on("shown.bs.tab", function(e) {
    $(".invoice-save-draft").hide();
    $(".pills-edit-tab").show();
    $(".invoice-send").show();
    $(".pills-preview-tab").hide();
    $(".invoice-page-heading").html("Preview Invoice");
    $($.fn.dataTable.tables(true)).DataTable()
      .columns.adjust();
  });

  $('#customerCreateInvoice').on('shown.bs.modal', function(e){
    $($.fn.dataTable.tables(true)).DataTable()
      .columns.adjust();
  });

  var rowCounter = 3;
  $('.add-additional').on('click', function(){
    console.log(rowCounter);
    var rowNode = editTable
      .row.add([
        rowCounter,
        '<input type=\"text\" class=\"w-100 bg-gray-light p-3\" placeholder=\"Enter Item Name\">',
        '<input type=\"text\" class=\"w-100 bg-gray-light p-3\" >',
        '<input type=\"text\" class=\"w-100 bg-gray-light p-3\" >',
        '<input type=\"text\" class=\"w-100 bg-gray-light p-3\" >',
        '<a href=\"\"class=\"d-inline-block icon-delete\"><img src=\"../../images/icons/close-gray.svg\"></a>',
        '<a href=\"\"class=\"d-inline-block handle-reorder\"><img src=\"../../images/icons/handle-reorder.svg\"></a>'
      ])
      .draw()
      .node();

      rowCounter++;

    $( rowNode )
      .css( 'color', 'red' )
      .animate( { color: 'black' } );
  });

  $('#invoice-edit-table tbody').on( 'click', '.icon-delete', function () {
    editTable
      .row( $(this).parents('tr') )
      .remove()
      .draw();
    });

});
// End document ready
