import axios from "axios";
import { getToken } from "../helpers/HelperLocalStorage";

async function getUserById(id, setItem) {
  try {
    const response = await axios.post(`http://localhost:8080/api/user/${id}`, {
      headers: {
        Authorization: getToken(),
      },
    });
    const userDetails = response.data;
    console.log(userDetails);
  } catch (e) {
    console.log(e);
  }
}

async function getUserByEmail(id, setValue) {
  try {
    const token = getToken();
    console.log(token);
    const header = {
      Authorization: token,
    };
    const response = await axios.get(
      `http://localhost:8080/api/user/by-email/${id}`,
      {
        headers: header,
      }
    );
    setValue(response.data);
  } catch (e) {
    console.log(e);
  }
}

export { getUserById, getUserByEmail };
