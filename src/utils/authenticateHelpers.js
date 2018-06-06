import { AUTH_TOKEN } from '../constants';
import { setToStorage, getFromStorage } from './localStorage';

export function isAuthenticated() {
  if (
    getFromStorage(AUTH_TOKEN)() === '' ||
    getFromStorage(AUTH_TOKEN)() === null
  ) return false;
  return true;
};

export function setAuthToken(token) {
  setToStorage(AUTH_TOKEN)(token);
};

export function getAuthToken() {
  return getFromStorage(AUTH_TOKEN)();
};

export function removeAuthToken() {
  setToStorage(AUTH_TOKEN)('');
};
