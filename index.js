const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: 'keyh4ZnksjZg4USrF' })
  .base('appuoshptISMGIo0F')
  .table('UI Elements')

airtable.list().then(resp => {
  console.log(resp);
})

airtable.list({
  maxRecords: 200, // optional
  pageSize: 100, // optional
  sort: [{ field: 'id', direction: 'asc' }], // optional
  view: 'Main', // optional
  cellFormat: 'json', // optional
},
).then(resp => {
  console.log(resp)
})
