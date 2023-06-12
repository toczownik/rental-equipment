import React from "react";
import { Carousel } from "react-bootstrap";
import kayak from "./images/kayak.jpg";
import beach from "./images/beach.jpg";
import toys from "./images/toys.jpg";

const MainPage = () => {
  const heightItem = {
    maxHeight: "94vh",
  };

  const bgColor = {
    backgroundColor: "#56667A",
    borderRadius: 15,
    opacity: 0.8,
  };

  return (
    <Carousel>
      <Carousel.Item style={heightItem}>
        <img className="d-block w-100" src={kayak} alt="First slide" />
        <Carousel.Caption style={bgColor}>
          <h3>U nas znajdziesz wszystko</h3>
          <p>Nie czekaj, sprawdź sam !!!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={heightItem}>
        <img className="d-block w-100" src={beach} alt="Second slide" />

        <Carousel.Caption style={bgColor}>
          <h3>Mamy najlesze ceny w okolicy</h3>
          <p>
            Dzięki nam zaoszczędzisz na kupnie nowego sprzętu, i będzisz mógł
            zostać dłużej
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={heightItem}>
        <img className="d-block w-100" src={toys} alt="Third slide" />

        <Carousel.Caption style={bgColor}>
          <h3>Wszystko dla twojego dziecka</h3>
          <p>
            Dzieki szerokiej ofercie asortymentu dla dwojego dziecka, na pewno
            chwilę odpoczniesz kiedy ono będzie się świetnie bawiło
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default MainPage;
