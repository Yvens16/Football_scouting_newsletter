const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base('appA3BDUGnUS7pzO1');

export function createAirtableContact({
  name, tel, instaUserAccount, email, selectedOption,
}) {
  base('Contacts').create([
    {
      fields: {
        Name: name || '',
        Tel: tel || '',
        Instagram: instaUserAccount || '',
        Email: email || '',
        selectedOption,
      },
    },
  ], (err, records) => {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach((record) => {
      console.log(record.getId());
    });
  });
}

export default {
  createAirtableContact,
};
