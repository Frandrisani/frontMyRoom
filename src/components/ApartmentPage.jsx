import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomNavbar from "../components/CustomNavbar";
import RoommatePage from "../components/RoommatePage";
import { Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const ApartmentPage = ({ id }) => {
  const apartmentId = id.params.id;
  const apartments = useSelector((state) => state.apartments.apartments);
  const apartment = apartments.find(
    (apartment) => apartment.id === parseInt(apartmentId)
  );

  return (
    <>
      <CustomNavbar />
      <Container className="my-5">
        <Row>
          <Col md={6}>
            <img
              src={apartment.image}
              alt={apartment.name}
              className="img-fluid"
            />
          </Col>
          <Col md={6}>
            <h1>{apartment.name}</h1>
            <p>{apartment.description}</p>
            <p>
              <strong>Prezzo:</strong> {apartment.price} € al mese
            </p>
            <p>
              <strong>Stanze:</strong> {apartment.rooms}
            </p>
            <p>
              <strong>Bagni:</strong> {apartment.bathrooms}
            </p>
            <p>
              <strong>Metri quadri:</strong> {apartment.squareMeters}
            </p>
          </Col>
        </Row>
        <Row className="my-5">
          <Col>
            <h2>Coinquilini</h2>
            <Row>
              {apartment.roommates.map((roommate) => (
                <Col md={4} key={roommate.id}>
                  <Link to={`/roommates/${roommate.id}`}>
                    <RoommatePage roommate={roommate} showImage={true} />
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

ApartmentPage.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ApartmentPage;
