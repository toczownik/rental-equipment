import { getToken, getIdlStorage } from "../helpers/HelperLocalStorage";

async function addNewRentail(idItem, startDate, endDate) {
  const token = getToken();
  const tempBody = {
    userId: getIdlStorage(),
    itemId: idItem,
    timeFrom: startDate,
    timeTo: endDate,
  };
  try {
    const response = await fetch("http://localhost:8080/api/v1/rent", {
      method: "POST",
      body: JSON.stringify(tempBody),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
    });
    return response.status;
  } catch (e) {
    alert("blad");
  }
}

async function getAllRentailWithIdItem(idItem, setValue) {
  const token = getToken();
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/rent/${idItem}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: token,
        },
      }
    );
    response.json().then((r) => {
      setValue(r);
    });
  } catch (e) {
    alert(e);
  }
}

async function getPageOfRentails(page, size) {
  const token = getToken();
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/rent?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: token,
        },
      }
    );
    return response;
  } catch (e) {
    alert(e);
  }
}

async function deleteRentailById(id) {
  const token = getToken();
  try {
    const response = await fetch(`http://localhost:8080/api/v1/rent/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
    });
    console.log(response);
    return response;
  } catch (e) {
    alert(e);
  }
}

export {
  addNewRentail,
  getAllRentailWithIdItem,
  getPageOfRentails,
  deleteRentailById,
};
