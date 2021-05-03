import React from "react";
import { Container, Pagination } from "react-bootstrap";
import { getPageItems } from "../helpers/ItemHelper";

const Pageable = ({ countItems, setItems }) => {
  const pageSize = 9;
  const numbersOfPage = Math.ceil(countItems / pageSize);

  //to generate arrya
  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  const arrayOfPageNum = range(1, numbersOfPage, 1);

  const sendRequest = async (number) => {
    const response = await getPageItems(number - 1, pageSize);

    response.json().then((response) => {
      setItems(response.content);
    });
  };

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
