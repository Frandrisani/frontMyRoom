import CustomNavbar from "./CustomNavbar";
import { Col, Container, Row, Button, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../assets/custom/custom.scss";
import { PlusCircleDotted } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import CardHome from "./CardHome";
import { fetchRoomByUser } from "../redux/actions/";
import { useDispatch, useSelector } from "react-redux";

const Ad = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const roomsFetch = useSelector((state) => state.roomsByUser.roomInfo);

  const location = useLocation();
  useEffect(() => {
    setCurrentPage(location.pathname);
    dispatch(fetchRoomByUser())
      .then(() => setIsLoading(false))
      .catch(() => setIsError(true));
  }, [dispatch, location]);

  return (
    <>
      <CustomNavbar currentPage={currentPage} />
      <div className="container-fluid bg-BackgroundAppWelcomePage d-flex flex-column justify-content-start align-items-center">
        <Container className="bg-BackgroundAppWelcomePage container-fluid ">
          <Row className="mt-2">
            <Col md={6} className="offset-md-3 mb-0">
              <h5 className="text-center text-white fw-semibold mb-2">
                Welcome to the section for managing or placing your own
                advertisements
              </h5>
            </Col>
          </Row>

          <Row>
            <Col
              md={6}
              className="offset-md-3 d-flex justify-content-center align-content-center flex-column"
            >
              <div className="text-center">
                <p className="text-white fw-semibold ">
                  Do you have a new ad to publish?
                </p>
                <Link to="/new-ad">
                  <Button className="btn-light">
                    <p className="text-Pulsanti fw-semibold">
                      Add it now{" "}
                      <span className="ms-1">
                        {" "}
                        <PlusCircleDotted className="text-Pulsanti fs-4" />{" "}
                      </span>
                    </p>
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6} className="offset-md-3">
              {isLoading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : isError ? (
                <p>Error loading rooms...</p>
              ) : // Check if roomsFetch is defined and is an array before mapping
              Array.isArray(roomsFetch) && roomsFetch.length > 0 ? (
                roomsFetch.map((room) => <CardHome key={room.id} room={room} />)
              ) : (
                <p>No rooms available</p>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Ad;
