import CustomNavbar from "./CustomNavbar";
import "../assets/custom/custom.scss";
import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState("");
  const location = useLocation();
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  const initialSearch = {
    city: "",
  };
  const [search, setSearch] = useState(initialSearch);

  const handleChange = (key, value) => {
    setSearch({
      ...search,
      [key]: value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Ricerca eseguita!");
  };

  const isValidStep = () => {
    return search.city !== "";
  };

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
    </>
  );
};

export default HomePage;
