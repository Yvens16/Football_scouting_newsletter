/* eslint-disable camelcase */
const fetch = require('node-fetch');

const interrest = 'soccer player';
const access_token = 'EAAn4uUZBppcgBAPdkyJL0L2tjEKpOlc1EqM0OHL8Dewio1ZAUzXdzJibzk6skpPLbWpZAqY4grshhCqGIfeOeTBae89eGQC1SER4xrIb1AE5wWE7jEB9aoIpZCvdhdPZAPKwPZCh7oSOHRilgcq2bBCX2G4X3sWX5ZCtkkjdIyaoWZC9SDKZAuo5paxrhmu5xWCAZAM7FVbCiGtlCvW2U0iVZAYcTHyilx3HjritCIfjFcnZC0ULbm5gICKTfWtyBfWYR1cZD';
// fetch(`https://graph.facebook.com/v9.0/search?interest_list=["${interrest}"]&limit=10000&type=adinterestsuggestion&access_token=${access_token}`)
//   .then(data => data.json())
//   .then(jsonData => {
//     jsonData.data.map(d => console.log(d.name));
//   })
//   .catch(err => console.log(err));

fetch(`https://graph.facebook.com/v9.0/search?type=adinterest&q=${interrest}&limit=10000&access_token=${access_token}`)
  .then((data) => data.json())
  .then((jsonData) => {
    jsonData.data.map((d) => console.log(d.name));
  })
  .catch((err) => console.log(err));
