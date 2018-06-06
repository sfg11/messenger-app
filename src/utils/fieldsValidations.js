export function validationEMailFiled(email) {
  const EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (email.length <= 5 || !EMAIL_REGEXP.test(email)) return 'error';
  return null;
};

export function validationPasswordField(password) {
  const length = password.length;
  if (length < 6) return 'error';
  return null;
};

export function validationRequiredField(text) {
  if (text === '') return 'error';
  return null;
};

export function validationPasswordConfirmationField(password, password_confirmation) {
  const length = password.length;
  if (length < 6 || password !== password_confirmation) return 'error';
  return null;
};
