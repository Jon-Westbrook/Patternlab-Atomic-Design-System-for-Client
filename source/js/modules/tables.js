import { bootstrapBreakpoints } from './util.js'

const tableBreakpoints = Object.keys(bootstrapBreakpoints).map(
  (breakpoint, index, arr) => ({
    name: breakpoint,
    width: arr[index + 1] ? bootstrapBreakpoints[arr[index + 1]] - 1 : Infinity
  })
)

const reportingOptions = {
  deferRender: true,
  // scrollY: 688,
  // scrollCollapse: true,
  // scroller: true,
  lengthChange: false,
  pageLength: 25,
  searching: false,
  responsive: {
    breakpoints: tableBreakpoints,
    details: false
  }
}

const reportingAjaxOption = url => ({
  ajax: {
    url,
    dataSrc: parseDataDateString
  }
})


// Datatables - Init Edit Preview Table
export const initInvoiceEditTable = () => {
  return $("#invoice-edit-table").DataTable({
    scrollX: true,
    searching: false,
    ordering: true,
    paging: false,
    rowReorder: {
      selector: ".handle-reorder"
    },
    data: [
      [
        '1',
        '',
        '',
        '',
        ''
      ],
      [
        '2',
        '',
        '',
        '',
        ''
      ]
    ],
    info: false,
    columnDefs: [
      { orderable: false, targets: "_all" },
      { targets: 0, visible: false },
      {
        targets: 1,
        width: '30%',
        render: renderItemNameInput
      },
      {
        targets: 2,
        width: '15%',
        render: renderQuantityInput
      },
      {
        targets: 3,
        width: '25%',
        render: renderPriceInput
      },
      {
        targets: 4,
        width: '25%',
        render: renderPriceInput
      },
      { 
        targets: 5,
        className: 'icon-delete',
        defaultContent: '<a class="d-block"><img src="../../images/invoice-items-remove.svg"></a>'
      },
      {
        targets: 6,
        className: 'handle-reorder',
        defaultContent: '<a class="d-block"><img src="../../images/invoice-items-reorder.svg"></a>'
      }
    ]
  });
}

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
        responsivePriority: 1,
        render: renderPrice
      },
      {
        targets: 2,
        className: "pl-5",
        render: renderDate,
        responsivePriority: 3
      },
      {
        targets: 3,
        responsivePriority: 2,
        render: renderNameAndEmail
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
        responsivePriority: 5,
        render: renderStatus
      },
      {
        targets: 7,
        className: "text-center px-5",
        orderable: false,
        defaultContent: '',
        render: renderSalesDropdownMenu,
        responsivePriority: 6
      },
      {
        targets: 8,
        className: 'table-show-details-cell text-center',
        orderable: false,
        defaultContent: '',
        render: renderSalesDetailsArrow
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
        className: "text-right pr-6",
        responsivePriority: 1,
        width: '25%',
        render: renderPrice
      },
      {
        targets: 2,
        className: "pl-7",
        render: renderDate,
        responsivePriority: 2,
        width: '25%'
      },
      {
        targets: 3,
        className: "text-right pr-6",
        responsivePriority: 3,
        width: '25%',
        render: renderPriceBasic
      },
      {
        targets: 4,
        className: "pl-6",
        responsivePriority: 4,
        width: '15%'
      },
      {
        targets: 5,
        className: "text-center",
        orderable: false,
        defaultContent: '',
        render: renderDepositsDetailsLink,
        width: '10%'
      },
      {
        targets: 6,
        className: 'table-show-details-cell text-center',
        orderable: false,
        defaultContent: '',
        render: renderDepositsDetailsArrow
      }
    ]
  });
};



// Add Modal Invoice Edit Row
export function addRow(currentTable) {
  var rowNode = currentTable.row
    .add([
      `${currentTable.rows()[0].length + 1}`,
      '',
      '',
      '',
      ''
    ])
    .draw()
    .node();
}

// Remove Modal Invoice Edit Row
export function removeRow(table, row) {
  table.row(row)
    .remove()
    .draw();

  table.rows().every(function(index) {
    var inputData = $(this.node()).find('td input').map(function(index, item) {
      return item.value
    }).get()

    const newData = [ `${index + 1}` ].concat(inputData)
    this.data(newData)
  })
}

// Resize Table Rows
export function adjustTableColumnsWidths() {
  var tables = $.fn.dataTable.tables({ visible: true, api: true })
  tables.columns.adjust().responsive.recalc().draw()
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

const saleDetailsLinkPrefix = 'view-sale-details'
const depositDetailsLinkPrefix = 'view-deposit-details'

const showMoreMenuOptions = [
  { text: 'View sale details', linkPrefix: saleDetailsLinkPrefix },
  { text: 'Process refund', linkPrefix: 'process-refund' },
  { text: 'View invoice', linkPrefix: 'view-invoice' },
  { text: 'Print receipt', linkPrefix: 'print-receipt' }
]

function renderSalesDropdownMenu(data, type, row) {
  const txid = row[0]

  if (type === 'display') {
    return `
      <div class="dropdown" id="sales-dropdown">
        <button id="sales-dropdown-button" type="button" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
        <div class="dropdown-menu" aria-labelledby="sales-dropdown-button">
          ${showMoreMenuOptions.map(action => `
            <a class="dropdown-item" href="#${action.linkPrefix}-${txid}">${action.text}</a>
          `).toString().replace(/,/g, '')}
        </div>
      </div>
    `
  } else {
    return ''
  }
}

function renderSalesDetailsArrow(data, type, row) {
  const txid = row[0]

  if (type === 'display') {
    return renderArrowLink(saleDetailsLinkPrefix, txid)
  } else {
    return ''
  }
}

function renderDepositsDetailsLink(data, type, row) {
  const txid = row[0]

  if (type === 'display') {
    return `
      <a class="display7" href="#${depositDetailsLinkPrefix}-${txid}">Details</div>
    `
  }
}

function renderDepositsDetailsArrow(data, type, row) {
  const txid = row[0]
  if (type === 'display') {
    return renderArrowLink(depositDetailsLinkPrefix, txid)
  } else {
    return ''
  }
}

function renderArrowLink(linkPrefix, txid) {
  return `<a class="table-show-details-link" href="#${linkPrefix}-${txid}"></div>`
}

function renderPrice(data, type) {
  if (type === 'display') {
    return `<span class=\"medium secondary-6\">$${data}</span>`
  } else {
    return data
  }
}

function renderPriceBasic(data, type) {
  if (type === 'display') {
    return `<span>$${data}</span>`
  } else {
    return data
  }
}

function renderNameAndEmail(data, type, row, meta) {
  if (type === 'display') {
    return `
      <p class=\"mt-2 mt-md-4 mb-0\">${data.name.split(' ').join(` <br class="d-md-none">`)}</p>
      <p class="mb-4 small gray-medium d-none d-md-block">${data.email}</p>
    `
  } else {
    // causes last name > first name sort
    // return data.name.split(' ').reverse().join(' ')

    // causes first name > last name sort
    return data.name
  }
}

function renderStatus(data, type) {
  if (type === 'display') {
    if (data === 'Funded') {
      return 'Funded&nbsp;<img src="../../images/checkmark-green.svg">'
    } else {
      return data
    }
  } else {
    return data
  }
}

function renderItemNameInput(data, type) {
  if (type === 'display') {
    return `<input type="text" class="w-100 bg-gray-light p-3" placeholder="Enter Item Name" value="${data}">`
  } else {
    return data
  }
}

function renderQuantityInput(data, type) {
  if (type === 'display') {
    return `<input type="text" class="w-100 bg-gray-light p-3" value="${data}">`
  } else {
    return data
  }
}

function renderPriceInput(data, type) {
  if (type === 'display') {
    return `<input type="text" class="w-100 bg-gray-light p-3" placeholder="$" value="${data}">`
  } else {
    return data
  }
}