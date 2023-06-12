import React, { useEffect } from "react";
import { getItemById } from "./helpers/ItemHelper";

const ItemDetails = ({ match, item, setItem }) => {
  const id = match.params.id;

  //   const [item, setItem] = useState({});

  useEffect(() => {
    getItemById(id, setItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>Name of product: {item.name}</h2>
      <h3>Description: {item.description}</h3>
      <h3>Price per Unit: {item.pricePerUnit}</h3>
      <h3>Unit: {item.unit}</h3>
      <hr />
    </div>
  );
};

export default ItemDetails;
