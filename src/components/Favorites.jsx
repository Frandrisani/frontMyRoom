import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listRoomInFavorites } from "../redux/actions";
import CardSummaryHomePage from "./CardSummaryHomePage";
import { useLocation } from "react-router-dom";
import CustomNavbar from "./CustomNavbar";
import { useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";

const Favorites = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const roomsFetch = useSelector((state) => state.listRoomPrefe.rooms);

  useEffect(() => {
    setCurrentPage(location.pathname);
    dispatch(listRoomInFavorites())
      .then(() => setIsLoading(false))
      .catch(() => setIsError(true));
  }, [dispatch, location]);

  return (
    <>
      <CustomNavbar currentPage={currentPage} />
      <div className="favorites-container">
        <h5 className="text-center my-2 fw-bold fs-1 text-Pulsanti px-3">
          Here are your favourite rooms
        </h5>
        {isLoading ? (
          <div className="text-center mt-4">
            <h1 className="text-Pulsanti">Loading</h1>
            <Spinner
              animation="grow"
              className="text-center"
              variant="Pulsanti"
            />
          </div>
        ) : isError ? (
          <div className="error-message">
            <p>Error loading rooms...</p>
          </div>
        ) : (
          <Container>
            <Row>
              {roomsFetch.length !== 0 ? (
                roomsFetch.map((room) => (
                  <Col
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    key={room.id}
                    className="mb-4"
                  >
                    <CardSummaryHomePage key={room.id} room={room} />
                  </Col>
                ))
              ) : (
                <p className="text-center fw-semibold fs-4">
                  You have not yet added any rooms to your favourites
                </p>
              )}
            </Row>
          </Container>
        )}
      </div>
    </>
  );
};

export default Favorites;
