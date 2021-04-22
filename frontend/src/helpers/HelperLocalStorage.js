const IS_LOGIN = "isLogin";
const TOKEN = "token";

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

export { getIsLoginStorage, setIsLoginStorage, setToken, getToken };
