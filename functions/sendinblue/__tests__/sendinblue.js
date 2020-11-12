const sendinblueAPI = require('sib-api-v3-sdk');
// const {createContact} = require('../sendinblue');

// const contactName = 'Yvens'; // FNAME + LNAME
// const contactMobile = '6027098765';
// const contactEmail = 'yvens@gmail.com';
// jest.genMockFromModule('sib-api-v3-sdk');
jest.mock('sib-api-v3-sdk', () => ({
  ApiClient: {
    instance: {
      authentications: { 'api-key': 'API_KEY', 'partner-key': 'API_KEY' },
    },
  },
  AccountApi: jest.fn().mockImplementation(() => ({
    getAccount: jest.fn().mockResolvedValue([
      {
        email: 'yvensbelaston@gmail.com',
        firstName: 'Yvens TEST',
        lastName: 'Belaston TEST',
        companyName: 'football chance',
        address: {
          street: "11 rue d'enghein",
          city: 'Eaubonne',
          zipCode: '95600',
          country: 'France',
        },
        plan: [
          { type: 'free', creditsType: 'sendLimit', credits: 300 },
          { type: 'sms', creditsType: 'sendLimit', credits: 0 },
        ],
        relay: {
          enabled: true,
          data: {
            userName: 'yvensbelaston@gmail.com',
            relay: 'smtp-relay.sendinblue.com',
            port: 587,
          },
        },
      },
    ]),
  })),
  CreateContact: jest.fn(),
  ContactsApi: jest.fn().mockImplementation(() => ({
    createContact: jest.fn().mockResolvedValue([
      {
        id: 'FAKE_ID',
      },
    ]),
  })),
}));

beforeEach(() => {
  sendinblueAPI.AccountApi.mockClear();
  sendinblueAPI.ContactsApi.mockClear();
});

test.todo('Should I test the createContact function ?');
// https://jestjs.io/docs/en/es6-class-mocks

// test.only('Example', async() => {
//   createContact({contactName, contactEmail, contactMobile});
//   const apiInstance = new sendinblueAPI.ContactsApi();
//   const CreateContactAPI = new sendinblueAPI.CreateContact();
//   console.log('apiInstance:', apiInstance)
//   expect(apiInstance.createContact).toHaveBeenCalledWith(CreateContactAPI);
// });
