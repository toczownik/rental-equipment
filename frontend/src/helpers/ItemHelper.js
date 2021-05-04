import axios from "axios";

async function getAllItems(setItems) {
  const response = await axios.get("http://localhost:8080/api/items");
  setItems(response.data);
}

async function getItemById(id, setItem) {
  const response = await axios.get(`http://localhost:8080/api/items/${id}`);
  setItem(response.data);
}

//todo propably useless
// async function getNumeberItems(setValue) {
//   const response = await fetch("http://localhost:8080/api/items/count");
//   response.json().then((t) => {
//     setValue(t);
//   });
// }

async function getPageItems(page, size) {
  const response = await fetch(
    `http://localhost:8080/api/items/listPageable?page=${page}&size=${size}`
  );
  return response;
}

async function getPageItemsByNameAndCategories(name, categories, page, size) {
  //todo make this to read all categories
  if (categories === "") {
    categories = "1,2,3,4,5,6,7,8,9,10,11,12,13,14";
  }
  console.log(
    `http://localhost:8080/api/items/filterItemsByNameAndCategory?name=${name}&idCategories=${categories}&page=${page}&size=${size}`
  );
  const response = await fetch(
    `http://localhost:8080/api/items/filterItemsByNameAndCategory?name=${name}&idCategories=${categories}&page=${page}&size=${size}`
  );
  console.log("parametr wyszukania: " + name + " " + categories);
  return response;
}

export {
  getAllItems,
  getItemById,
  getPageItems,
  getPageItemsByNameAndCategories,
};

// localhost:8080/api/items/filterItemsByNameAndCategory?name=p&idCategories=1&page=0&size=5
