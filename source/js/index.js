$(document).ready(function() {

  // HOUSEKEEPING
  var $ = jQuery;
  var $window = $(window);


  // Toggle Sidebar
  $("#sidebarCollapse").on("click", function() {
    $("#sidebar").toggleClass("active");
    $(".overlay").addClass("active");
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
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    series: [
      [800000, 1200000, 1400000, 1300000, 800000, 1200000, 800000, 1200000, 1400000, 1300000, 800000, 1200000],
      [800000, 1200000, 1400000, 1300000, 800000, 1200000, 800000, 1200000, 1400000, 1300000, 800000, 1200000]
    ]
  };
  var options = {
    stackBars: true,
    plugins: [
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
  if ($('.data-chart')[0]) {

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

  // Fire a modal immediately for debugging
  $('#customerNew').modal('show');

  // Begin Custom Modal Behavior
  // var $element = $('#modalBody');
  // var element_height = $element.outerHeight();
  // var element_top_position = $element.offset().top;
  // var element_bottom_position = (element_top_position + element_height);



  // Detect which modal is shown
  $('.modal').on('shown.bs.modal', function(){
    var modal = $(this);
    var header = $('.modal.fade.show .modal-header');
    var heading = $('.modal.fade.show .modal-header .heading-col');
    var mainBox = $('.modal.fade.show .mainBox');

    modal.scroll(function() {
      var scrollTop = modal.scrollTop();
      if (scrollTop > 0) {
        header.addClass('shrink');
        if (header.height() === 76) {
          console.log(header.height());
          mainBox.css('z-index', 1010 );
        }
      } else {
        header.removeClass('shrink');
        mainBox.css('z-index', 1020 );
      }
    });

  });







  // console.log(modal);

  var topOffset;

  // modal.scroll(function() {
  //   console.log(modal.scrollTop());
  //   menuHeight = Math.max(70, 170 - modal.scrollTop());
  //   topOffset = 100 - menuHeight;
  //   header.height(menuHeight);
  // });

});
