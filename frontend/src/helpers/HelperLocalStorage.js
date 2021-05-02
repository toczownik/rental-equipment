const IS_LOGIN = "isLogin";
const TOKEN = "token";
const EMAIL = "email";
const ID = "user_id";

const getIsLoginStorage = () => {
  const v = localStorage.getItem(IS_LOGIN);
  if (v == null) return false;
  return v;
};

const setIsLoginStorage = (value) => {
  localStorage.setItem(IS_LOGIN, value);
};

const setToken = (value) => {
  localStorage.setItem(TOKEN, value);
};

const getToken = () => {
  return localStorage.getItem(TOKEN);
};

const setEmailStorage = (v) => {
  localStorage.setItem(EMAIL, v);
};

const getEmailStorage = () => {
  return localStorage.getItem(EMAIL);
};

const setIdStorage = (v) => {
  localStorage.setItem(ID, v);
};

const getIdlStorage = () => {
  return localStorage.getItem(ID);
};

export {
  getIsLoginStorage,
  setIsLoginStorage,
  setToken,
  getToken,
  setEmailStorage,
  getEmailStorage,
  setIdStorage,
  getIdlStorage,
};
