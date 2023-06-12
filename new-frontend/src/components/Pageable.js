import React, { useEffect, useState } from "react";
import { Container, Pagination } from "react-bootstrap";

import {
  getPageItems,
  getPageItemsByNameAndCategories,
} from "../helpers/ItemHelper";

const Pageable = ({ countItems, setItems, itemNameInput, idCategories }) => {
  const [arrayOfPageNum, setArrayOfPageNum] = useState([]);
  const pageSize = 12;

  let range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );

  const sendRequest = async (number) => {
    number = number - 1;
    if (itemNameInput !== "" || idCategories !== "") {
      const res = await getPageItemsByNameAndCategories(
        itemNameInput,
        idCategories,
        number,
        12
      );
      res.json().then((r) => {
        setItems(r.content);
      });
    } else {
      const response = await getPageItems(number, pageSize);

      response.json().then((response) => {
        setItems(response.content);
      });
    }
  };

  useEffect(() => {
    setArrayOfPageNum(range(1, Math.ceil(countItems / pageSize), 1));
  }, [countItems]);

  return (
    <Container>
      <Pagination>
        {arrayOfPageNum.map((pp) => (
          <Pagination.Item key={pp} onClick={() => sendRequest(pp)}>
            {pp}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default Pageable;
