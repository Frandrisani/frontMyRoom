import { Button, Card } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { Heart, House, People, BadgeWc } from "react-bootstrap-icons";

const CardHome = () => {
  return (
    <Card className="border border-BackgroundAppWelcomePage m-3 border-3">
      <div className="d-flex justify-content-center">
        <Carousel className="carousel">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/300x300?text=First+slide"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/300x300?text=Second+slide"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/300x300?text=Third+slide"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        <Card.Body className="d-flex flex-column justify-content-between ">
          <div className="mb-1">
            <Card.Title className="mb-0 fs-1">Prezzo</Card.Title>
            <Card.Text className="mt-0 mb-0">
              Via, Città, Provincia, Cap
            </Card.Text>
            <Card.Text>Stanza singola/Stanza Condivisa</Card.Text>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <div>
              <People className="ml-4 text-Pulsanti fs-4 mx-1" />
              <p>Sesso della casa</p>
            </div>
            <div>
              <House className="ml-4 text-Pulsanti fs-4 mx-1" />
              <p>Locali della casa</p>
            </div>
            <div>
              <BadgeWc className="ml-4 text-Pulsanti fs-4 mx-1" />
              <p>Metri della casa</p>
            </div>
            <div>
              <BadgeWc className="ml-4 text-Pulsanti fs-4 mx-1" />
              <p>Wc nella della casa</p>
            </div>
          </div>
          <Card.Text className="text-nowrap">Descrizione</Card.Text>
          <div className="d-flex justify-content-between">
            <Button variant="Pulsanti" className="text-white fs-6 fw-bolder">
              Send message
            </Button>
            <Button
              variant="outline-Pulsanti"
              className="text-white fs-6 fw-bolder"
            >
              <Heart className="ml-4 text-Pulsanti fs-4 mx-1" />
            </Button>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};

export default CardHome;
