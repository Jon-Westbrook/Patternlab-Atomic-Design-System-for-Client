// Datatables - Init Edit Preview Table
export const invoiceEditTable = $("#invoice-edit-table").DataTable({
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

// Build Reporting Sales Table
export const initReportingSalesTable = () => {
  const salesTable = $("#sales-table").DataTable({
    ajax: "../../js/modules/table-data/sales-100.json",
    deferRender: true,
    scrollY: 688,
    scrollCollapse: true,
    scroller: true,
    searching: false,
    responsive: {
      details: {
        display: $.fn.dataTable.Responsive.display.modal()
      }
    },
    columnDefs: [
      { targets: 0, visible: false },
      { targets: 1, className: "amount text-right pr-5" },
      {
        targets: 2,
        className: "pl-5",
        render: renderDate
      },
      {
        targets: 7,
        className: "text-center px-5",
        orderable: false
      }
    ]
  });
};

// Build Reporting Deposits Table
export const initReportingDepositsTable = () => {
  const salesTable = $("#deposits-table").DataTable({
    ajax: "../../js/modules/table-data/deposits-100.json",
    deferRender: true,
    scrollY: 688,
    scrollCollapse: true,
    scroller: true,
    searching: false,
    responsive: true,
    columnDefs: [
      { targets: 0, visible: false },
      { targets: 1, className: "text-right pr-9", width: "20%" },
      {
        targets: 2,
        className: "pl-5",
        width: "20%",
        render: renderDate
      },
      { targets: 3, className: "text-right pr-9", width: "20%" },
      { targets: 4, className: "pl-5", width: "20%" },
      {
        targets: 5,
        orderable: false,
        width: "10%",
        className: "text-center"
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


// PRIVATE FUNCTIONS
// column rendering functions
function renderDate (data, type) {
  // create date obj from ISO string
  const date = new Date(data)

  if (type === 'display') {
    // return html-wrapped date and time strings
    // i18n / internationalization would require change here
    return `
      <p class=\"mt-4 mb-0\">
        ${date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: undefined
        })}
      </p>
      <p class=\"mb-4 small gray-medium\">
        ${date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          second: undefined
        })}
      </p>
    `
  } else if (type === 'filter' || type === 'type' || type === 'sort') {

    // return numeric value of datetime as string
    return new Date(data).getTime().toString()
  }

  return data
}
