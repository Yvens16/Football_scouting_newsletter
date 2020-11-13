export function validateFormEmail(email) {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return true;
  }
  return false;
}

export function validatePhoneNumber(phoneNumber) {
  if (
    new RegExp(/^(06|07)[0-9\s?]{8}/gi).test(phoneNumber)
    && new RegExp(/\s*(?:\S\s*){10}/).test(phoneNumber)
  ) {
    return true;
  }
  return false;
}

export default {
  validateFormEmail,
  validatePhoneNumber,
};
