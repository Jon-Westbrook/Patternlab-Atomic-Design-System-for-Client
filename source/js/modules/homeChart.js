const dataWeek = {
  labels: ["Mon", "Tu", "Wed", "Th", "Fri", "Sat", "Sun"],
  series: [
    [2200, 1100000, 1500000, 1300000, 800000, 1200000, 1400000],
    [1000, 1300000, 1300000, 1300000, 800000, 1200000, 1400000]
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

export const options = {
  stackBars: true,
  plugins: [
    Chartist.plugins.legend({
      legendNames: ["Credit", "Debit"],
      clickable: false
    }),
    Chartist.plugins.tooltip({
      currency: "$",
      class: "chart-tooltip",
      pointClass: "my-cool-point",
      appendToBody: false
    })
  ],
  axisX: {
    showGrid: false
  },
  axisY: {
    offset: 50,
    low: 0,
    onlyInteger: true,
    // divisor: 1000,
    labelInterpolationFnc(value) {
      // abbreviations for thousands, up to trillion
      var abbreviations = [ '', 'K', 'M', 'B', 'T' ];

      // get number of digits in whole number
      var length = Math.floor(value).toString().length;

      // find number of thousands i.e. 000 that can be abbreviated
      var thousandSets = Math.floor((length - 1) / 3);

      // limit abbreviation to thousand(K), million(M), billion(B), and trillion(T)
      var roundingSets = thousandSets > 4 ? 4 : thousandSets;

      // get simplified number to 2 decimals, or original value if not thousandSets
      var simplified = roundingSets > 0
        ? Chartist.roundWithPrecision(value / Math.pow(1000, roundingSets), 2)
        : value;

      return `$${simplified}${abbreviations[roundingSets]}`;
    }
  }
};


// xs: 0,
// sm: 576px,
// md: 768px,
// lg: 992px,
// xl: 1200px
export const responsiveOptions = [
  [
    'screen and (max-width: 575px)',
    {
      horizontalBars: true,
      reverseData: true,
      axisX: {
        showGrid: true,
        onlyInteger: true,
        low: 0,
        labelOffset: {
          x: -10
        },
        scaleMinSpace: 50,
        labelInterpolationFnc(value) {
          // abbreviations for thousands, up to trillion
          var abbreviations = [ '', 'K', 'M', 'B', 'T' ];

          // get number of digits in whole number
          var length = Math.floor(value).toString().length;

          // find number of thousands i.e. 000 that can be abbreviated
          var thousandSets = Math.floor((length - 1) / 3);

          // limit abbreviation to thousand(K), million(M), billion(B), and trillion(T)
          var roundingSets = thousandSets > 4 ? 4 : thousandSets;

          // get simplified number to 2 decimals, or original value if not thousandSets
          var simplified = roundingSets > 0
            ? Chartist.roundWithPrecision(value / Math.pow(1000, roundingSets), 2)
            : value;

          return `$${simplified}${abbreviations[roundingSets]}`;
        }
      },
      axisY: {
        showGrid: false,
        offset: 50,
        labelInterpolationFnc: Chartist.noop
      }
    }
  ]
]

// TODO: move bar width styling to scss
export function drawChart(crazy) {
  if ($(".data-chart")[0]) {
    var ctWeek = new Chartist.Bar(
      "#ct-week",
      dataWeek,
      options,
      responsiveOptions
    ).on("draw", function(data) {
      if (data.type === "bar") {
        data.element.attr({
          style: "stroke-width: 12px;"
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
          style: "stroke-width: 12px;"
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
          style: "stroke-width: 12px;"
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
          style: "stroke-width: 12px;"
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
}
