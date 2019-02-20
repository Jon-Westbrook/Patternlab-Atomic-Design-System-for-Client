export let responsiveOptions;

const dataWeek = {
  labels: ["Mon", "Tu", "Wed", "Th", "Fri", "Sat", "Sun"],
  series: [
    [2200, 1200000, 1400000, 1300000, 800000, 1200000, 1400000],
    [1000, 1200000, 1400000, 1300000, 800000, 1200000, 1400000]
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
      class: "class1",
      pointClass: "my-cool-point",
      appendToBody: false
    })
  ],
  axisX: {
    showGrid: false
  },
  axisY: {
    high: 5000,
    low: 0,
    onlyInteger: true,
    divisor: 1000,
    labelInterpolationFnc(value) {
      return `$${value}`;
    }
  }
};

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
          style: "stroke-width: 10px;"
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
          style: "stroke-width: 10px;"
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
          style: "stroke-width: 10px;"
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
          style: "stroke-width: 10px;"
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
