import React, { useState, useEffect } from "react";
import { getItemById } from "../helpers/ItemHelper";
import "bootstrap/dist/css/bootstrap.min.css";

const ItemDetails = ({ match }) => {
  const id = match.params.id;

  useEffect(() => {
    getItemById(id, setItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [item, setItem] = useState({});

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
