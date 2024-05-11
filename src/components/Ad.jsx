import CustomNavbar from "./CustomNavbar";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../assets/custom/custom.scss";
import { PlusCircleDotted } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Ad = () => {
  const [currentPage, setCurrentPage] = useState("");

  const location = useLocation();
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  return (
    <>
      <CustomNavbar currentPage={currentPage} />
      <div className="container-fluid bg-BackgroundAppWelcomePage d-flex flex-column justify-content-start align-items-center p-5 vh-100">
        <Container className="bg-BackgroundAppWelcomePage container-fluid ">
          <Row className="mb-4">
            <Col md={6} className="offset-md-3">
              <h3 className="text-center text-white fw-semibold mb-3">
                Welcome to the section for managing or placing your own
                advertisements
              </h3>
              <p className="text-white fw-semibold text-start">Your ads </p>
              <Card>
                <Card.Body>
                  <h5 className="card-title text-center">Title</h5>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="offset-md-3">
              <p className="text-white fw-semibold text-start">
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
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Ad;
