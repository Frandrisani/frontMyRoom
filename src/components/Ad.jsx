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
              <h4 className="text-center text-white fw-semibold mb-2">
                Welcome to the section for managing or placing your own
                advertisements
              </h4>
            </Col>
          </Row>

          <Row className="mt-1">
            <Col
              md={6}
              className="offset-md-3 d-flex justify-content-center align-content-center flex-column"
            >
              <div className="text-center bg-Pulsanti p-2 rounded-3 mb-2">
                <p className="text-white fw-semibold fs-5">
                  Do you have a new ad to publish?
                </p>
                <Link to="/new-ad">
                  <Button className="btn-light shadow-lg">
                    <p className="text-Pulsanti fs-5 fw-semibold my-1">
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

          <Row className="my-2">
            <Col
              md={6}
              className="offset-md-3 d-flex justify-content-center align-content-center flex-column"
            >
              <h3 className="text-center fw-bold text-white">Or</h3>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              className="offset-md-3 bg-Pulsanti rounded-3"
            >
              <h3 className="text-white fw-bold text-center mt-3 mb-0">
                Your ads
              </h3>
              {isLoading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : isError ? (
                <p>Error loading rooms...</p>
              ) : Array.isArray(roomsFetch) && roomsFetch.length > 0 ? (
                roomsFetch.map((room) => <CardHome key={room.id} room={room} />)
              ) : (
                <p className="text-center mt-1 fw-bold text-white">
                  No rooms available
                </p>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Ad;
