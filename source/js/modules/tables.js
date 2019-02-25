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
    ajax: "../../js/modules/table-data/sales-100.js",
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
      { targets: 2, className: "pl-5" },
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
    ajax: "../../js/modules/table-data/deposits-100.js",
    deferRender: true,
    scrollY: 688,
    scrollCollapse: true,
    scroller: true,
    searching: false,
    responsive: true,
    columnDefs: [
      { targets: 0, visible: false },
      {
        targets: 5,
        orderable: false,
        createdCell(td, cellData, rowData, row, col) {
          $(td).css("padding-right", "24px");
        }
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
