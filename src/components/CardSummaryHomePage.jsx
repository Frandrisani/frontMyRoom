/* eslint-disable react/prop-types */
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Container,
  Spinner,
  Alert,
  Form,
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
import { useLocation } from "react-router-dom";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const CardSummaryHomePage = ({ room }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const roomsFetch = useSelector((state) => state.listRoomPrefe.rooms);
  const location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  useEffect(() => {
    setIsFavorite(roomsFetch.some((rooms) => rooms.id === room.id));
  }, [roomsFetch, room.id]);

  const handleToggleFavorite = async (roomId) => {
    if (isFavorite === false) {
      await dispatch(saveRoomInFavorites(roomId));
    } else {
      if (currentPage === "/fav") {
        await dispatch(deleteRoomInFavorites(roomId));
        window.location.reload();
      } else {
        await dispatch(deleteRoomInFavorites(roomId));
      }
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

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendInfoEmail = async () => {
    setError(null);
    setSuccess(false);

    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3001/rooms/send-info-email",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomId: room.id,
            userId: room.user.id,
            firstName: room.user.firstName,
            lastName: room.user.lastName,
            email: room.user.email,
            phoneNumber: room.user.phoneNumber,
            text: text,
          }),
        }
      );

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const [text, setText] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
    setShow(true); // Reopen the main modal when closing the email modal
  };

  const handleShowEmailModal = () => {
    setShow(false); // Close the main modal when opening the email modal
    setShowEmailModal(true);
  };

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
              <Col md={12}>
                {room.image ? (
                  <Zoom>
                    <Card.Img variant="top" src={room.image} />
                  </Zoom>
                ) : (
                  <Zoom>
                    <Card.Img
                      variant="top"
                      src="https://via.placeholder.com/800x400?text=Apartment"
                    />
                  </Zoom>
                )}
              </Col>
              <Col md={12}>
                <div className="bg-Pulsanti ps-1 pt-1 pb-1 rounded-bottom">
                  <Modal.Title
                    id="contained-modal-title-vcenter"
                    className="fs-3 fw-semibold text-white"
                  >
                    {room.title}
                  </Modal.Title>
                  <Card.Text className="text-white fw-light mb-0">
                    {room.address}, {room.zipCode} -{" "}
                    <span className="fw-bold">{room.city} </span>
                  </Card.Text>
                </div>
                <div className="bg-Pulsanti ps-1 pt-1 pb-1 rounded mt-2">
                  <p className="mb-0 text-Pulsanti rounded fw-bold px-20 bg-white d-inline">
                    House type
                  </p>
                  <Card.Text className="text-white fw-bold fs-2 mb-1">
                    {roomType}
                  </Card.Text>
                  <p className="mb-0 text-Pulsanti rounded fw-bold px-20 bg-white d-inline">
                    Room price
                  </p>
                  <Card.Text className="fw-bold text-white fs-2 mt-0 mb-1">
                    €{room.price}
                  </Card.Text>
                </div>
                <div className="bg-Pulsanti ps-1 pt-1 pb-1 rounded mt-2">
                  <p className="mb-0 text-Pulsanti rounded fw-bold px-20 bg-white d-inline">
                    House details
                  </p>
                  <div className="d-flex mt-1 mb-0">
                    <Card.Text className="fw-bold text-white fs-5 mt-0 mb-15">
                      <BadgeWcFill />{" "}
                      <span className="fw-normal"> Toilets:</span>
                    </Card.Text>
                    <Card.Text className="text-white fs-5 fw-light mb-1 ms-1">
                      {room.wc}
                    </Card.Text>
                  </div>
                  <div className="d-flex mt-0">
                    <Card.Text className="fw-bold text-white fs-5 mt-0 mb-15">
                      <HousesFill />{" "}
                      <span className="fw-normal"> Bedrooms: </span>
                    </Card.Text>
                    <Card.Text className="text-white fw-light fs-5 mb-1 ms-1">
                      {room.bedrooms}
                    </Card.Text>
                  </div>
                </div>
                <div className="bg-Pulsanti ps-1 pt-1 pb-1 rounded mt-2">
                  <Card.Text className="fw-bold text-white fs-4 mt-0 mb-15">
                    Description
                  </Card.Text>
                  <Card.Text className="text-white fw-light mb-1">
                    {room.description}
                  </Card.Text>
                </div>
                <div className="bg-Pulsanti ps-1 pt-1 pb-1 rounded mt-2">
                  <Card.Text className="fw-bold text-white fs-4 mt-0 mb-15">
                    Ad owner
                  </Card.Text>
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src={room.user.avatar}
                      alt="profile picture"
                      className="shadow-lg rounded-circle border border-2 border-Pulsanti mb-1"
                      width="100"
                      height="100"
                    />
                    <div className="ms-2">
                      <p className=" text-white mb-0">{room.user.firstName}</p>
                      <p className=" text-white">{room.user.lastName}</p>
                    </div>
                  </div>
                  <div className="mt-1 d-flex justify-content-center align-items-center flex-column mb-1">
                    <p className=" text-white mb-1">
                      Are you interested in the room? Contact the owner of the
                      ad
                    </p>
                    <Button
                      variant="light"
                      className="shadow"
                      onClick={handleShowEmailModal}
                      size="lg"
                    >
                      Reply to the ad
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <div className="bg-Pulsanti p-1 rounded mb-3 mt-1">
                  <h5 className="text-white fs-4 fw-bold mb-1">Roommates</h5>
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

      <Modal
        show={showEmailModal}
        onHide={handleCloseEmailModal}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-BackgroundAppWelcomePage"
          >
            Contact the owner
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <div className="bg-Pulsanti p-1 rounded mb-3 mt-1">
              <p className=" text-white mb-0">
                Send an initial contact to the owner of the ad. Write a message
                including requests for information, curiosity or anything else.
              </p>
              <p className=" text-white mb-0">
                Be polite and kind, do not write messages against our{" "}
                <span>
                  <a
                    href="#"
                    className="text-decoration-none text-BackgroundAppWelcomePage"
                  >
                    Policy
                  </a>
                </span>
              </p>
              <p className=" text-white mb-0">
                Please note that the owner of the advertisement, if you send a
                message through this form, will have access to your personal
                data such as email or telephone number. This serves to be able
                to contact you via convenient channels such as email or a call
                from the ad owner.
              </p>
              <p className=" text-white mb-1">
                By sending a message via the following form you accept our{" "}
                <span>
                  <a
                    href="#"
                    className="text-decoration-none text-BackgroundAppWelcomePage"
                  >
                    Terms and Conditions
                  </a>
                </span>
              </p>
            </div>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="fs-4 text-Pulsanti fw-semibold">
                  Your Message
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <Form.Text>
                  The owners usually respond within 24 hours. Check your email,
                  messages, Whatsapp or calls. If you need support write to us
                  at support@roommate.it
                </Form.Text>
              </Form.Group>
            </Form>
          </Container>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="mt-3">
              The email has been sent successfully!
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="Pulsanti"
            className="text-white"
            onClick={handleCloseEmailModal}
          >
            Close
          </Button>
          <Button
            variant="outline-Pulsanti"
            className="text-Pulsanti"
            onClick={sendInfoEmail}
          >
            Send
          </Button>
        </Modal.Footer>
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
