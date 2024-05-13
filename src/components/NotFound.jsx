import { Button, Col, Container, Row } from "react-bootstrap";
import "../assets/custom/custom.scss";

const NotFound = () => {
  return (
    <Container
      fluid
      className="bg-BackgroundAppWelcomePage d-flex flex-column justify-content-center align-items-center p-5 vh-100"
    >
      <Row className="mt-4 flex-column align-items-center">
        <Col
          xs={12}
          md={6}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <img
            className="w-100"
            src="/public/404notfound.png"
            alt="not-found"
          />
          <Button variant="btn btn-outline-light">Link</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
