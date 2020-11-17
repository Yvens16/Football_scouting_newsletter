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

// const api = new sendinblueAPI.AccountApi();
// api
//   .getAccount()
//   .then(
//     (data) => {
//       console.log(
//         `API called successfully. Returned data: ${JSON.stringify(data)}`,
//       );
//     },
//     (error) => {
//       console.error(error);
//     },
//   )
//   .catch((err) => console.log('Error from catch line 18', err));

const createContact = ({ contactName, contactEmail, contactMobile }) => {
  const apiInstance = new sendinblueAPI.ContactsApi();
  const CreateContactAPI = new sendinblueAPI.CreateContact();
  CreateContactAPI.email = contactEmail;
  let correctContactMobile;
  if (!contactMobile.includes('+33')) {
    correctContactMobile = `+33${contactMobile}`;
  }
  CreateContactAPI.attributes = { NOM: contactName, PRENOM: '', SMS: correctContactMobile };
  CreateContactAPI.listIds = [5];
  apiInstance.createContact(CreateContactAPI)
    .then((data) => {
      console.log(`CreateContactAPI called successfully. Returned data: ${JSON.stringify(data)}`);
      return data;
    }, (error) => console.error('CreateContactAPI ERROR', error));
};

const sendTransactionnalEmail = ({ contactEmail, contactName, templateId }) => {
  const apiInstance = new sendinblueAPI.TransactionalEmailsApi();

  const sendSmtpEmail = new sendinblueAPI.SendSmtpEmail();

  sendSmtpEmail.templateId = templateId;
  sendSmtpEmail.to = [{ email: contactEmail, PRENOM: contactName }];
  sendSmtpEmail.params = { PRENOM: contactName };
  sendSmtpEmail.replyTo = { email: contactEmail, PRENOM: contactName };
  apiInstance.sendTransacEmail(sendSmtpEmail).then((data) => {
    console.log(`sendTransactionnalEmail API called successfully. Returned data: ${JSON.stringify(data)}`);
  }, (error) => {
    console.error(error);
    return error;
  });
};

module.exports = {
  createContact,
  sendTransactionnalEmail,
};
