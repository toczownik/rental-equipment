import axios from "axios";
import {getToken} from "./LocalStorageHelper";

async function getAllItems(setItems) {
  const response = await axios.get("http://localhost:8080/api/items");
  setItems(response.data);
}

async function getItemById(id, setItem) {
  const response = await axios.get(`http://localhost:8080/api/items/${id}`);
  setItem(response.data);
}

async function getItemByIdFetch(id) {
  return await fetch(`http://localhost:8080/api/items/${id}`);
}

async function getPageItems(page, size) {
  return await fetch(
      `http://localhost:8080/api/items/listPageable?page=${page}&size=${size}`
  );
}

async function getPageItemsByNameAndCategories(name, categories, page, size) {
  //todo make this to read all categories
  if (categories === "") {
    categories = "1,2,3,4,5,6,7,8,9,10,11,12,13,14";
  }
  return await fetch(
      `http://localhost:8080/api/items/filterItemsByNameAndCategory?name=${name}&idCategories=${categories}&page=${page}&size=${size}`
  );
}

async function updateItem(item) {
  try {
    const token = getToken();
    return await fetch("http://localhost:8080/api/management/item", {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
    });
  } catch (e) {
    console.log(e);
  }
}

async function addItem(item) {
  try {
    const token = getToken();
    console.log(JSON.stringify(item));
    return await fetch("http://localhost:8080/api/management/item", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
    });
  } catch (e) {
    console.log(e);
  }
}

export {
  getAllItems,
  getItemById,
  getPageItems,
  getPageItemsByNameAndCategories,
  updateItem,
  getItemByIdFetch,
  addItem,
};
