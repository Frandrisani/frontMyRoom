import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Container,
  Spinner,
} from "react-bootstrap";
import {
  Heart,
  HeartFill,
  BadgeWcFill,
  HousesFill,
} from "react-bootstrap-icons";
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

  const [show, setShow] = useState(false);
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoommates = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:3001/roommates/room/${room.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching roommates");
        }
        const roommatesData = await response.json();
        setRoommates(roommatesData);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching roommates:", error);
        setLoading(false);
      }
    };
    fetchRoommates();
  }, [room.id]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const roomType =
    room.type === "WOMAN_ONLY"
      ? "Women Only"
      : room.type === "MAN_ONLY"
      ? "Man Only"
      : "Mixed house";

  return (
    <>
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
            <div className="mb-0 mt-1">
              <Card.Title className="fs-1 fw-bold text-white mb-0">
                {room.title}
              </Card.Title>
              <Card.Text className="text-white fw-light mb-0">
                {room.address}, {room.zipCode} -{" "}
                <span className="fw-bold">{room.city} </span>
              </Card.Text>
            </div>
            <Card.Text className="text-white fw-bold fs-4 mb-1">
              {roomType}
            </Card.Text>
            <Card.Text className="fw-bold text-white fs-1 mt-0 mb-1">
              €{room.price}
            </Card.Text>
          </div>

          <Row className="justify-content-between">
            <div className="d-grid gap-1">
              <Col className="mb-0">
                <Button
                  variant="light"
                  className="text-Pulsanti fw-bolder shadow-lg "
                  onClick={handleShow}
                >
                  Read more
                </Button>
              </Col>
              <Col className="mb-1 align-self-center">
                <Button
                  variant="outline-light"
                  className="fw-bolder shadow-lg"
                  onClick={() => handleToggleFavorite(room.id)}
                >
                  {isFavorite === true ? <HeartFill /> : <Heart />}
                </Button>
              </Col>
            </div>
          </Row>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row>
              <Col md={6}>
                {room.image ? (
                  <Card.Img variant="top" src={room.image} />
                ) : (
                  <Card.Img
                    variant="top"
                    src="https://via.placeholder.com/800x400?text=Apartment"
                  />
                )}
              </Col>
              <Col md={6}>
                <Modal.Title
                  id="contained-modal-title-vcenter"
                  className="fs-1 fw-semibold text-Pulsanti"
                >
                  {room.title}
                </Modal.Title>
                <Card.Text className="text-Pulsanti fw-light mb-0">
                  {room.address}, {room.zipCode} -{" "}
                  <span className="fw-bold">{room.city} </span>
                </Card.Text>
                <Card.Text className="text-Pulsanti fw-bold fs-4 mb-1">
                  {roomType}
                </Card.Text>
                <Card.Text className="fw-bold text-Pulsanti fs-1 mt-0 mb-1">
                  €{room.price}
                </Card.Text>
                <div>
                  <Card.Text className="fw-bold text-Pulsanti fs-5 mt-0 mb-15">
                    <BadgeWcFill /> <span className="fw-normal"> Toilets</span>
                  </Card.Text>
                  <Card.Text className="text-dark fs-5 fw-light mb-1">
                    {room.wc}
                  </Card.Text>
                </div>
                <div>
                  <Card.Text className="fw-bold text-Pulsanti fs-5 mt-0 mb-15">
                    <HousesFill /> <span className="fw-normal"> Bedrooms</span>
                  </Card.Text>
                  <Card.Text className="text-dark fw-light fs-5 mb-1">
                    {room.bedrooms}
                  </Card.Text>
                </div>
                <div>
                  <Card.Text className="fw-bold text-Pulsanti fs-4 mt-0 mb-15">
                    Description
                  </Card.Text>
                  <Card.Text className="text-dark fw-light mb-1">
                    {room.description}
                  </Card.Text>
                </div>
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <div className="bg-Pulsanti p-2 rounded mb-3">
                  <h5 className="text-white fs-2 fw-bold mb-1">Roommates</h5>
                  {loading ? (
                    <Spinner animation="border" variant="light" />
                  ) : (
                    roommates.map((roommate, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-start mb-2"
                      >
                        <div className="bg-light flex-column container-fluid p-1 d-flex align-items-start mb-2 rounded-2">
                          <img
                            src={roommate.avatar}
                            className="rounded-circle align-self-center mb-1"
                            style={{ width: "100px", height: "100px" }}
                          />
                          <div className="ms-1">
                            <p className="mb-1 text-Pulsanti fw-semibold fs-5">
                              {roommate.firstName}, {roommate.age} -{" "}
                              {roommate.countryOfBirth}
                            </p>
                            <div>
                              <p className="mb-15">Bio</p>
                              <p className="mb-1 text-Pulsanti fw-light">
                                {roommate.bio === null
                                  ? "No Bio"
                                  : roommate.bio}
                              </p>
                            </div>
                            <div>
                              <p className="mb-15">Hobbies & Interests</p>
                              <p className="mb-1 text-Pulsanti fw-light">
                                {roommate.hobby === null
                                  ? "No Hobbies & Interests"
                                  : roommate.hobby}
                              </p>
                            </div>
                            <div>
                              <p className="mb-15">
                                What I like best about my roommates
                              </p>
                              <p className="mb-0 text-Pulsanti fw-light">
                                {roommate.cohabitationPreferences === null
                                  ? "No roommate preferences"
                                  : roommate.cohabitationPreferences}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
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
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    wc: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
  }).isRequired,
};

export default CardSummaryHomePage;
