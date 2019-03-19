import { bootstrapBreakpoints } from './util.js'

const tableBreakpoints = Object.keys(bootstrapBreakpoints).map(
  (breakpoint, index, arr) => ({
    name: breakpoint,
    width: arr[index + 1] ? bootstrapBreakpoints[arr[index + 1]] - 1 : Infinity
  })
)

const reportingOptions = {
  deferRender: true,
  scrollY: 688,
  scrollCollapse: true,
  scroller: true,
  searching: false,
  responsive: {
    breakpoints: tableBreakpoints,
    details: {
      display: $.fn.dataTable.Responsive.display.modal(),
      type: 'column',
      target: 'td.table-show-details',
      renderer( api, rowIdx, columns ) {
        return columns.map(({ title, data, ...column }) => {
          if (!title) return false
          if (title === 'ID' || title === '&nbsp;') return false
          return `<p>${title}: ${data}</p>`
        })
      }
    }
  }
}

const reportingAjaxOption = url => ({
  ajax: {
    url,
    dataSrc: parseDataDateString
  }
})

// Datatables - Init Edit Preview Table
export const invoiceEditTable = $("#invoice-edit-table").DataTable({
  scroller: true,
  scrollX: true,
  scrollCollapse: true,
  searching: false,
  paging: false,
  rowReorder: {
    selector: "td:last-child"
  },
  columnDefs: [
    { orderable: false, targets: "_all" },
    { targets: 0, visible: false }
  ]
});

// Build Reporting Sales Table
export const initReportingSalesTable = () => {
  const salesTable = $("#sales-table").DataTable({
    ...reportingOptions,
    ...reportingAjaxOption("../../js/modules/table-data/sales-100.json"),
    columnDefs: [
      {
        targets: 0,
        visible: false
      },
      {
        targets: 1,
        className: "amount text-right pr-5",
        responsivePriority: 1
      },
      {
        targets: 2,
        className:
        "pl-5",
        render: renderDate,
        responsivePriority: 3
      },
      {
        targets: 3,
        responsivePriority: 2
      },
      {
        targets: 4,
        responsivePriority: 4
      },
      {
        targets: 5,
        responsivePriority: 6
      },
      {
        targets: 6,
        responsivePriority: 5
      },
      {
        targets: 7,
        className: "text-center px-5 table-show-details",
        orderable: false
      }
    ]
  });
};

// Build Reporting Deposits Table
export const initReportingDepositsTable = () => {
  const salesTable = $("#deposits-table").DataTable({
    ...reportingOptions,
    ...reportingAjaxOption("../../js/modules/table-data/deposits-100.json"),
    columnDefs: [
      {
        targets: 0,
        visible: false,
      },
      {
        targets: 1,
        className: "text-right pr-9",
        responsivePriority: 1
      },
      {
        targets: 2,
        className: "pl-5",
        render: renderDate,
        responsivePriority: 2
      },
      {
        targets: 3,
        className: "text-right pr-9",
        responsivePriority: 3
      },
      {
        targets: 4,
        className: "pl-5",
        responsivePriority: 4
      },
      {
        targets: 5,
        orderable: false,
        className: "text-center table-show-details"
      }
    ]
  });
};

// Build Modal Invoice Preview Table
export function initInvoicePreviewTable() {
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
export function rmInvoiceEditTableRow() {
  invoiceEditTable
    .row($(this).parents("tr"))
    .remove()
    .draw();
}

// Add Modal Invoice Edit Row
let invoiceTableRowCounter = 0;

export function addInvoiceEditTableRow() {
  var rowNode = invoiceEditTable.row
    .add([
      invoiceTableRowCounter,
      '<input type="text" class="w-100 bg-gray-light p-3" placeholder="Enter Item Name">',
      '<input type="text" class="w-100 bg-gray-light p-3" >',
      '<input type="text" class="w-100 bg-gray-light p-3" >',
      '<input type="text" class="w-100 bg-gray-light p-3" >',
      '<a href=""class="d-inline-block icon-delete"><img src="../../images/icons/close-gray.svg"></a>',
      '<a href=""class="d-inline-block handle-reorder"><img src="../../images/icons/handle-reorder.svg"></a>'
    ])
    .draw()
    .node();
  invoiceTableRowCounter += 1;
  $(rowNode)
    .css("color", "red")
    .animate({ color: "black" });
}

// Resize Table Rows
export function adjustTableColumnsWidths() {
  $($.fn.dataTable.tables(true))
    .DataTable()
    .columns.adjust();
}


// PRIVATE

// date formatters
const formatterDate = Intl.DateTimeFormat('en-US', {
  weekday: undefined,
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

const formatterTime = Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  second: undefined
})

function parseDataDateString(json) {
  return json.aaData.map(
    item => item.map(
      (subitem, index) => index === 2 ? new Date(subitem) : subitem
    )
  )
}

// column rendering functions
function renderDate (data, type, row, meta) {
  if (type === 'display') {
    // return html-wrapped date and time strings
    // i18n / internationalization would require change here
    return `
      <p class=\"mt-4 mb-0\">
        ${formatterDate.format(data)}
      </p>
      <p class=\"mb-4 small gray-medium\">
        ${formatterTime.format(data)}
      </p>
    `
  } else if (type === 'filter' || type === 'type' || type === 'sort') {

    // return numeric value of datetime as string
    return data.getTime().toString()
  }

  return data
}
