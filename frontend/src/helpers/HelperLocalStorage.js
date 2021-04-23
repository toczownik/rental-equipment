const IS_LOGIN = "isLogin";
const TOKEN = "token";
const EMAIL = "email";

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
  //   console.log("token w funkcji pom " + localStorage.getItem(TOKEN));
  return localStorage.getItem(TOKEN);
};

const setEmailStorage = (v) => {
  localStorage.setItem(EMAIL, v);
};

const getEmailStorage = () => {
  return localStorage.getItem(EMAIL);
};

export {
  getIsLoginStorage,
  setIsLoginStorage,
  setToken,
  getToken,
  setEmailStorage,
  getEmailStorage,
};
