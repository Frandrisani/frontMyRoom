import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { People, House, Trash3, Pencil } from "react-bootstrap-icons";
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
      dispatch(deleteRoom(roomId))
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting room:", error);
        });
    } else {
      console.error("Room ID is null");
    }
  };

  return (
    <Card className="border border-BackgroundAppWelcomePage  m-3 border-3 rounded-3">
      {room.image ? (
        <div className="position-relative">
          <Card.Img variant="top" src={room.image} className="rounded-top" />
          <Link to={`/edit-image-room/${room.id}`}>
            <Button className="bg-light text-white position-absolute top-0 start-100 translate-middle badge rounded-pill">
              <Pencil className="fs-4 m-0 text-Pulsanti" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="position-relative">
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/800x400?text=Apartment"
            className="rounded-top"
          />
          <Link to={`/edit-image-room/${room.id}`}>
            <Button className="bg-Pulsanti text-white position-absolute top-0 start-100 translate-middle badge rounded-pill p-1">
              <Pencil className="fs-4 m-0" />
            </Button>
          </Link>
        </div>
      )}
      <Card.Body className="d-flex flex-column justify-content-start align-items-start">
        <div className="mb-1">
          <Card.Title className="fs-4">{room.title}</Card.Title>
          <Card.Text className="text-muted mb-0">
            {room.address}, {room.zipCode} - {room.city}
          </Card.Text>
          <Card.Text className="text-Pulsanti fw-bold mb-0">
            {roomType}
          </Card.Text>
          <Card.Text className="fw-bold text-BackgroundAppWelcomePage fs-3 mt-0 mb-0">
            €{room.price}
          </Card.Text>
        </div>
        <div className="d-flex flex-column align-items-start mb-1 mt-0">
          <div className="d-flex align-items-center mb-0">
            <People className="me-1 text-Pulsanti" />
            <p className="mb-0 text-Pulsanti fw-semibold">
              Roommates:{" "}
              <span className="text-dark fw-light fs-5">{room.roommates}</span>
            </p>
          </div>
          <div className="d-flex align-items-center">
            <House className="me-1 text-Pulsanti" />
            <p className="mb-0 text-Pulsanti fw-semibold">
              WC: <span className="text-dark fw-light fs-5">{room.wc}</span>
            </p>
          </div>
        </div>
        <Card.Text className="text-Pulsanti fw-semibold mb-0">
          Description:
        </Card.Text>
        <Card.Text className="text-muted mb-2">{room.description}</Card.Text>
        <Row className="justify-content-between">
          <Col xs={12} sm={4} className="mb-1">
            <Link to={`/edit-ad/${room.id}`}>
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
    image: PropTypes.string, // La prop image può essere una stringa o null
  }).isRequired,
};

export default CardHome;
