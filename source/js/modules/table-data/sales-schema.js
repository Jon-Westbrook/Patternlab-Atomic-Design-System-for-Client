/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */

// Template for use generating data at https://next.json-generator.com .
// Once the data is generated, the data needs some find/replace work to
// convert it into an array of arrays, instead of an array of objects.
// The keys must also be removed via find/replace.
// Then it can be accepted by dataTables.js.

[
  {
    'repeat(100)': {
      id: '~{{index()}}~',
      amount: '{{floating(1, 9999, 2, "$0,0.00")}}',
      date: '<p>{{moment(this.date(new Date(2019, 6, 1), new Date())).format("MMM Do, YYYY")}}</p><p class="small">{{moment(this.date(new Date(2019, 6, 1), new Date())).format("h:mm a")}}</p>',
      recipient: '<p>{{firstName()}} {{surname()}}</p><p class="small">{{lorem(1, "words")}}@{{lorem(1, "words")}}{{domainZone().toLowerCase()}}</p>',
      method: '{{random("Virtual Terminal", "CardX Terminal", "Lightbox")}}',
      card: '{{random("Mastercard", "VISA", "American Express")}}',
      status: '{{random("Funded", "Processing")}}',
      ellipse: '<img src="../../images/icons/ellipse.svg"'
    }
  }
]
