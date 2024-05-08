import { Button, Card, Col, Row } from "react-bootstrap";
import { Heart, House, People, BadgeWc } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CardHome = ({ apartment }) => {
  return (
    <Card className="border border-BackgroundAppWelcomePage m-3 border-3">
      <Card.Img
        variant="top"
        src="https://via.placeholder.com/800x400?text=Apartment"
      />
      <Card.Body className="d-flex flex-column justify-content-between ">
        <div className="mb-1 text-center">
          <Card.Title className="mb-0 fs-1">{apartment.name}</Card.Title>
          <Card.Text className="mt-0 mb-0">
            {apartment.address}, {apartment.city}, {apartment.province},{" "}
            {apartment.postalCode}
          </Card.Text>
          <Card.Text>{apartment.roomType}</Card.Text>
        </div>
        <div className="d-flex flex-column align-items-center mb-1">
          <div className="mb-2">
            <People className="text-Pulsanti fs-4" />
            <p className="mt-1">Sesso della casa</p>
          </div>
          <div className="mb-2">
            <House className="text-Pulsanti fs-4" />
            <p className="mt-1">Locali della casa</p>
          </div>
          <div className="mb-2">
            <BadgeWc className="text-Pulsanti fs-4" />
            <p className="mt-1">Metri della casa</p>
          </div>
          <div className="mb-2">
            <BadgeWc className="text-Pulsanti fs-4" />
            <p className="mt-1">Wc nella della casa</p>
          </div>
        </div>
        <Card.Text className="text-center mb-2">Descrizione</Card.Text>
        <Row className="justify-content-between">
          <Col xs={6} className="text-center">
            <Link to={`/apartment/${apartment.id}`}>
              <Button variant="Pulsanti" className="text-white fw-bolder">
                Vedi dettagli
              </Button>
            </Link>
          </Col>
          <Col xs={6} className="text-center">
            <Button variant="outline-Pulsanti" className="text-white fw-bolder">
              <Heart className="text-Pulsanti fs-4" />
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

CardHome.propTypes = {
  apartment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    roomType: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardHome;
