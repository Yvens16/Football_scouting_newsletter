import { validateFormEmail, validatePhoneNumber } from './validation';

test('Should validate mail', () => {
  const emails = [{
    mail: 'steveroger.com',
    pass: false,
    reason: 'No gmail address',
  }, {
    mail: 'steveroger@gmail.com',
    pass: true,
    reason: 'Valid email',
  }, {
    mail: 'steveroger@gmail.com ',
    pass: false,
    reason: 'Because trim after',
  }, {
    mail: ' steveroger@gmail.com',
    pass: false,
    reason: 'Because trim before',
  },
  ];

  emails.map((mail) => expect(validateFormEmail(mail.mail)).toEqual(mail.pass));
});

test('Should validate phone number', () => {
  const phoneNumbers = [{
    number: '06 25 27 87 56',
    pass: true,
    reason: 'Valid 1',
  }, {
    number: '0625278756',
    pass: true,
    reason: 'Valid',
  }, {
    number: '01 34 34 32 34',
    pass: false,
    reason: 'Because no 06',
  }, {
    number: '06 67 67 87',
    pass: false,
    reason: 'Because missing numbers',
  },
  ];

  phoneNumbers.map((phone) => expect(validatePhoneNumber(phone.number)).toEqual(phone.pass));
});
