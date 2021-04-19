import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ItemDetails = ({ match }) => {
  useEffect(() => {
    fetchItem();
    console.log(match);
  }, []);

  const [item, setItem] = useState({});

  const fetchItem = async () => {
    const fetchItem = await fetch(
      `http://localhost:8080/api/items/${match.params.id}`
    );
    const item = await fetchItem.json();
    console.log(item);
    setItem(item);
  };

  return (
    <div>
      <h2>Name of product: {item.name}</h2>
      <h3>Description: {item.description}</h3>
      <h3>Price per Unit: {item.pricePerUnit}</h3>
      <h3>Unit: {item.unit}</h3>
    </div>
  );
};

export default ItemDetails;
