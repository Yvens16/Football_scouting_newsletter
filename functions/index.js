const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

const { createContact, sendTransactionnalEmail } = require('./sendinblue/sendinblue');
require('./sendinblue/sendinblue');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://scouting-football-newsletter.firebaseio.com',
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase, Yvens!');
});

exports.createAndAddContactToList = functions.https.onRequest(
  async (request, response) => cors(request, response, () => {
    functions.logger.info('createAndAddContactToList', { structuredData: true });
    const { body: { data: { contactName, contactMobile, contactEmail } } } = request;
    const data = createContact({ contactName, contactMobile, contactEmail });
    sendTransactionnalEmail({ contactName, contactEmail, templateId: 1 });
    response.send({ data: { data } });
  }),
);
