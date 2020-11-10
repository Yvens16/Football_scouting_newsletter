const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { createContact } = require('./sendinblue/sendinblue');
require('./sendinblue/sendinblue');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://scouting-football-newsletter.firebaseio.com',
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase, Yvens!');
});

exports.createAndAddContactToList = functions.https.onRequest(async (request, response) => {
  functions.logger.info('createAndAddContactToList', { structuredData: true });
  const { body: { contactName, contactMobile, contactEmail } } = request;
  console.log('@@@contactEmail:', contactEmail);
  console.log('@@@@contactMobile:', contactMobile);
  console.log('@@@@@contactName:', contactName);
  const data = createContact({ contactName, contactMobile, contactEmail });
  response.send(data);
});
