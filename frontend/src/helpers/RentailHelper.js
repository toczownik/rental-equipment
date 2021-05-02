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

export { addNewRentail };
