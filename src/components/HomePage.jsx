import CustomNavbar from "./CustomNavbar";
import "../assets/custom/custom.scss";
import {
  Container,
  Card,
  Form,
  Button,
  InputGroup,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoom } from "../redux/actions/";
import CardSummaryHomePage from "./CardSummaryHomePage";

const HomePage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState("");
  const location = useLocation();
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  const initialSearch = {
    city: "",
  };
  const [search, setSearch] = useState(initialSearch);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false); // Aggiunto stato per tenere traccia della ricerca effettuata

  const handleChange = (key, value) => {
    setSearch({
      ...search,
      [key]: value,
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("Ricerca eseguita!", search);
    setLoading(true);
    setError(null);
    setSearched(true); // Imposta searched a true quando viene eseguita una ricerca

    try {
      await dispatch(fetchRoom(search.city));
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  const isValidStep = () => {
    return search.city !== "";
  };

  const rooms = useSelector((state) => state.listRooms.roomInfo);

  return (
    <>
      <CustomNavbar currentPage={currentPage} />

      <h3 className="text-center text-BackgroundAppWelcomePage fw-bold mt-4 mb-2">
        Where would you like to live?
      </h3>
      <Container className="d-flex justify-content-center align-items-center">
        <Card
          style={{ width: "400px", height: "110px" }}
          className="border border-Pulsanti border-3"
        >
          <Card.Body>
            <Form onSubmit={handleSearch} className="m-1">
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  value={search.city}
                  onChange={(e) => {
                    handleChange("city", e.target.value);
                  }}
                  className="text-Pulsanti"
                />
                <Button
                  variant="Pulsanti"
                  type="submit"
                  className="text-white"
                  disabled={!isValidStep()}
                >
                  Search
                </Button>
              </InputGroup>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Container className="mt-4">
        {loading && (
          <Spinner
            animation="border"
            role="status"
            className=" fs-4 text-Pulsanti"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {error && (
          <Alert variant="danger">
            <Alert.Heading>Oops, we found an error</Alert.Heading>
            <p>{error}</p>
          </Alert>
        )}
        {searched && rooms.length === 0 && (
          <h5 className="text-Pulsanti fw-bold fs-4 text-center">
            No results. Try a search again
          </h5>
        )}{" "}
        {rooms.length > 0 && (
          <>
            <h5 className="text-Pulsanti fw-bold fs-4 text-center">
              Results for:{" "}
              <span className="text-BackgroundAppWelcomePage fs-3">
                {rooms[0].city}
              </span>
            </h5>
            <Row>
              {rooms.map((room) => (
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
              ))}
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default HomePage;
