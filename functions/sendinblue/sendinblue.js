const sendinblueAPI = require('sib-api-v3-sdk');
const functions = require('firebase-functions');

const SEND_IN_BLUE_API_KEY = functions.config().sendinblue.apikey;

const sdiClient = sendinblueAPI.ApiClient.instance;
const apiKey = sdiClient.authentications['api-key'];

apiKey.apiKey = SEND_IN_BLUE_API_KEY;
// apiKey.apiKeyPrefix['api-key'] = "Token";

const partnerKey = sdiClient.authentications['partner-key'];
partnerKey.apiKey = SEND_IN_BLUE_API_KEY;
// partnerKey.apiKeyPrefix['partner-key'] = 'Token';

let api = new sendinblueAPI.AccountApi();
api.getAccount().then(data => {
  console.log('API called successfully. Returned data: ' + JSON.stringify(data));
  return;
}, (error) => {
  console.error(error);
}).catch(err => console.log('Error from catch line 18', err))


const createContact = () => {

}

module.exports = {
  createContact,
};