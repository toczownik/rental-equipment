import axios from "axios";

async function getAllItems(setItems) {
  const response = await axios.get("http://localhost:8080/api/items");
  setItems(response.data);
}

async function getItemById(id, setItem) {
  const response = await axios.get(`http://localhost:8080/api/items/${id}`);
  setItem(response.data);
}

async function getNumeberItems(setValue) {
  const response = await fetch("http://localhost:8080/api/items/count");
  response.json().then((t) => {
    setValue(t);
  });
}

async function getPageItems(page, size) {
  const response = await fetch(
    `http://localhost:8080/api/items/listPageable?page=${page}&size=${size}`
  );
  return response;
}

export { getAllItems, getItemById, getNumeberItems, getPageItems };
