import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { People, House, Heart, HeartFill } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import { saveRoomInFavorites, deleteRoomInFavorites } from "../redux/actions/";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const CardSummaryHomePage = ({ room }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const roomsFetch = useSelector((state) => state.listRoomPrefe.rooms);

  useEffect(() => {
    setIsFavorite(roomsFetch.some((rooms) => rooms.id === room.id));
  }, [roomsFetch, room.id]);

  const handleToggleFavorite = async (roomId) => {
    if (isFavorite === false) {
      await dispatch(saveRoomInFavorites(roomId));
    } else {
      await dispatch(deleteRoomInFavorites(roomId));
    }
  };

  const roomType =
    room.type === "WOMAN_ONLY"
      ? "Women Only"
      : room.type === "MAN_ONLY"
      ? "Man Only"
      : "Mixed house";

  return (
    <Card className="border border-BackgroundAppWelcomePage text-bg-Pulsanti mt-1 mb-2 border-3 rounded-3">
      {room.image ? (
        <div className="position-relative">
          <Card.Img variant="top" src={room.image} />
        </div>
      ) : (
        <div className="position-relative">
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/800x400?text=Apartment"
          />
        </div>
      )}
      <Card.Body className="d-flex flex-column justify-content-start align-items-start">
        <div className="mb-1">
          <div className="mb-1 mt-1">
            <Card.Title className="fs-2 fw-bold text-white mb-0">
              {room.title}
            </Card.Title>
            <Card.Text className="text-white fw-light mb-0">
              {room.address}, {room.zipCode} - {room.city}
            </Card.Text>
          </div>
          <div className="bg-light  border rounded-2 mb-1">
            <Card.Text className="text-Pulsanti fw-bold fs-4 mb-0 ms-1">
              {roomType}
            </Card.Text>
          </div>
          <Card.Text className="fw-bold text-white fs-1 mt-0 mb-0">
            €{room.price}
          </Card.Text>
        </div>
        <div className="d-flex flex-column align-items-start mb-1 mt-0">
          <div className="d-flex align-items-center mb-0">
            <People className="me-1 text-white fs-3" />
            <p className="mb-0 text-white fw-semibold fs-4">
              Roommates:{" "}
              <span className="text-light fw-light fs-4">{room.roommates}</span>
            </p>
          </div>
          <div className="d-flex align-items-center">
            <House className="me-1 text-white fs-3 " />
            <p className="mb-0 text-white fs-4 fw-semibold">
              WC: <span className="text-light fw-light fs-4">{room.wc}</span>
            </p>
          </div>
        </div>
        <Card.Text className="text-white fw-semibold mb-0 fs-5">
          Description:
        </Card.Text>
        <Card.Text className="text-white mb-2">{room.description}</Card.Text>
        <Row className="justify-content-between">
          <Col xs={12} sm={4} className="mb-1">
            <Link to={`/room/${room.id}`}>
              <Button variant="light" className="text-Pulsanti fw-bolder ">
                Chat
              </Button>
            </Link>
          </Col>
          <Col xs={12} sm={4} className="mb-1">
            <Button
              variant="outline-light"
              className="fw-bolder"
              onClick={() => handleToggleFavorite(room.id)}
            >
              {isFavorite === true ? <HeartFill /> : <Heart />}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

CardSummaryHomePage.propTypes = {
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
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardSummaryHomePage;
