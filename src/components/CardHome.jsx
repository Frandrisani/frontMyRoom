import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { People, House, Trash3 } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import { deleteRoom } from "../redux/actions/";
import { useDispatch } from "react-redux";

const CardHome = ({ room }) => {
  const dispatch = useDispatch();
  const roomType =
    room.type === "WOMAN_ONLY"
      ? "Women Only"
      : room.type === "MAN_ONLY"
      ? "Man Only"
      : "Mixed house";

  const handleDeleteRoom = (roomId) => {
    if (roomId) {
      dispatch(deleteRoom(roomId));
    } else {
      console.error("Room ID is null");
    }
  };

  return (
    <Card className="border border-BackgroundAppWelcomePage m-3 border-3 rounded-4">
      <Card.Img
        variant="top"
        src="https://via.placeholder.com/800x400?text=Apartment"
      />
      <Card.Body className="d-flex flex-column justify-content-start align-items-start">
        <div className="mb-2">
          <Card.Title className="fs-4">{room.title}</Card.Title>
          <Card.Text className="text-muted mb-0">
            {room.address}, {room.zipCode} - {room.city}
          </Card.Text>
          <Card.Text className="text-muted mb-0">{roomType}</Card.Text>
          <Card.Text className="fw-bold mt-0 mb-0">€{room.price}</Card.Text>
        </div>
        <div className="d-flex flex-column align-items-start mb-1 mt-0">
          <div className="d-flex align-items-center mb-1">
            <People className="me-1 text-Pulsanti" />
            <p className="mb-0">Roommates: {room.roommates}</p>
          </div>
          <div className="d-flex align-items-center">
            <House className="me-1 text-Pulsanti" />
            <p className="mb-0">WC: {room.wc}</p>
          </div>
        </div>
        <Card.Text className="text-Pulsanti fw-semibold mb-0">
          Description:
        </Card.Text>
        <Card.Text className="text-muted mb-2">{room.description}</Card.Text>
        <Row className="justify-content-between">
          <Col xs={12} sm={4} className="mb-1">
            <Link to={`/room/${room.id}`}>
              <Button variant="Pulsanti" className="text-white fw-bolder ">
                Edit
              </Button>
            </Link>
          </Col>
          <Col xs={12} sm={4} className="mb-1">
            <Button variant="outline-Pulsanti" className="fw-bolder  ">
              Add
            </Button>
          </Col>
          <Col xs={12} sm={4} className="mb-1">
            <Button
              variant="outline-Pulsanti"
              className="fw-bolder"
              onClick={() => handleDeleteRoom(room.id)}
            >
              <Trash3 />
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

CardHome.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    zipCode: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    roommates: PropTypes.number.isRequired,
    wc: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardHome;
