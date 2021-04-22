import axios from "axios";

async function getAllItems(setItems) {
  const response = await axios.get("http://localhost:8080/api/items");
  setItems(response.data);
}

async function getItemById(id, setItem) {
  const response = await axios.get(`http://localhost:8080/api/items/${id}`);
  setItem(response.data);
}

export { getAllItems, getItemById };
