import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { People, House, Trash3, Pencil } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import {
  deleteRoom,
  searchUser,
  saveRoommate,
  deleteRoommate,
} from "../redux/actions/";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

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

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
        setErrorMessage("Error fetching roommates");
        setShowAlert(true);
        setLoading(false);
      }
    };
    fetchRoommates();
  }, [room.id]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEmail("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSearchUser = async () => {
    if (email) {
      const response = await dispatch(searchUser(email));
      if (response) {
        setUser(response);
        setErrorMessage("");
        setShowModal(false);
        setShowAlert(true);
      } else {
        console.log("Error searching user:", response);
        setErrorMessage("User not found");
        setShowAlert(true);
      }
    }
  };

  const handleAddUser = async () => {
    if (user) {
      try {
        await dispatch(saveRoommate(user.email, room.id));
        setUser(null);
        setShowAlert(false);
        window.location.reload();
      } catch (error) {
        setErrorMessage("Error saving user: " + error.message);
        setShowAlert(true);
      }
    }
  };

  const handleRemoveUser = async (userEmail) => {
    try {
      await dispatch(deleteRoommate(userEmail, room.id));
      window.location.reload();
    } catch (error) {
      ("error");
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <Card className="border border-BackgroundAppWelcomePage mb-2 mx-1 border-3 rounded-3">
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
                Bedrooms:{" "}
                <span className="text-dark fw-light fs-5">{room.bedrooms}</span>
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
          <div className="bg-Pulsanti p-1 rounded mb-2 container-fluid">
            <h5 className="text-white fw-bold mb-2">Roommates</h5>
            {loading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              roommates.map((roommate, index) => (
                <div key={index} className="d-flex align-items-center mb-2 ">
                  <img
                    src={roommate.avatar}
                    className="rounded-circle me-1"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div>
                    <p className="mb-0 text-white fw-light fs-4">
                      {roommate.firstName}
                    </p>
                    <p
                      className=" text-danger fw-bold bg-light d-inline px-1 rounded-2 shadow-lg"
                      onClick={() => handleRemoveUser(roommate.email)}
                    >
                      Delete
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <Row>
            <div className="d-grid gap-1">
              <Col>
                <Link to={`/edit-ad/${room.id}`}>
                  <Button variant="Pulsanti" className="text-white fw-bolder ">
                    Edit Ad
                  </Button>
                </Link>
              </Col>
              <Col>
                <Button
                  variant="outline-Pulsanti"
                  className="fw-bolder"
                  onClick={handleOpenModal}
                >
                  Add Roommate
                </Button>
              </Col>
              <Col>
                <Button
                  variant="outline-Pulsanti"
                  className="fw-bolder"
                  onClick={() => handleDeleteRoom(room.id)}
                >
                  <Trash3 className="fs-5" />
                </Button>
              </Col>
            </div>
          </Row>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Search User by Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-Pulsanti" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="Pulsanti" onClick={handleSearchUser}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>

      <Alert
        show={showAlert}
        variant={errorMessage ? "danger" : "light"}
        onClose={handleCloseAlert}
        dismissible
      >
        <Alert.Heading>{errorMessage ? "Error" : "User found!"}</Alert.Heading>
        <p>
          {errorMessage
            ? errorMessage
            : user
            ? `User ${user.firstName} with email ${user.email} was found.`
            : "No user found with this email."}
        </p>
        {user && !errorMessage && (
          <div className="d-flex justify-content-end">
            <Button
              onClick={handleAddUser}
              variant="Pulsanti"
              className="fw-bolder text-white"
            >
              Add User
            </Button>
          </div>
        )}
      </Alert>
    </>
  );
};

CardHome.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    wc: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default CardHome;
