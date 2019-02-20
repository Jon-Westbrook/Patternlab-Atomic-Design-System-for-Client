/* eslint-disable import/prefer-default-export */
export function initReportingSalesTable() {
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
