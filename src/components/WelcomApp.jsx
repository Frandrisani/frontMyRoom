import { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import "../assets/custom/custom.scss";
import { Link } from "react-router-dom";

const WelcomeApp = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleClick = () => {
    setShowLogin(!showLogin);
  };

  const loginUser = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(loginUser);
  const handleChange = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    setUser(loginUser);
  };

  return (
    <Container
      fluid
      className="bg-BackgroundAppWelcomePage d-flex flex-column justify-content-center align-items-center p-5"
    >
      <Row className="d-flex justify-content-center align-items-center">
        <Col className="col-3 d-flex justify-content-center align-items-center">
          <img
            src="/public/Logo.png"
            alt="Logo welcome page"
            className="img-fluid mb-3"
          />
        </Col>
        <Col className="col-9 d-flex flex-column justify-content-center align-items-center">
          <h1 className="fs-1 text-white fw-bold">Welcome to MyRoommate</h1>
          <p className="text-white fw-semibold">
            The only app with which you search for houses by roommates
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="col-12 d-flex flex-column justify-content-center align-items-center">
          {!showLogin ? (
            <div className="d-flex justify-content-center align-items-center flex-column mt-2 mb-2 bg-light shadow-lg px-4 pt-2 pb-2 mb-2 bg-body-tertiary rounded-4 mt-0 w-100">
              <p className="text-BackgroundAppWelcomePage fs-5 fw-bold">
                Hurry up! Your new roommates are waiting for you
              </p>
              <Button
                variant="outline-BackgroundAppWelcomePage"
                className="btn-lg m-1"
                onClick={handleClick}
              >
                Login
              </Button>
              <p className="text-BackgroundAppWelcomePage">Or</p>
              <Link to="/signup">
                <Button variant="Pulsanti" className="btn-lg mb-3">
                  Sign up
                </Button>
              </Link>
              <p className="mb-0 text-BackgroundAppWelcomePage">
                By registering or logging in you accept our{" "}
                <Link to="/terms-and-conditions" className="no-decoration">
                  terms and conditions of use
                </Link>
              </p>
              <p className="mb-0 text-BackgroundAppWelcomePage">
                For assistance please email xxx@myroommate.com
              </p>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center flex-column mt-2 mb-2 bg-light shadow-lg px-4 pt-2 pb-2 mb-2 bg-body-tertiary rounded-4 mt-0 w-100">
              <Button
                variant=" btn-outline-Pulsanti "
                className="btn-lg mb-3"
                onClick={handleClick}
              >
                Back
              </Button>
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-1"
                  controlId="formBasicEmail"
                  onSubmit={handleSubmit}
                >
                  <Form.Label>Enter your email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="your@email.com"
                    value={user.email}
                    onChange={(e) => {
                      handleChange("email", e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => {
                      handleChange("password", e.target.value);
                    }}
                  />
                </Form.Group>

                <Button variant="Pulsanti" type="submit">
                  Go
                </Button>
              </Form>
            </div>
          )}
          <p className="text-white mb-0 fs-5 fw-semibold">Or</p>
          <div className="bg-Pulsanti rounded-4 px-3 d-flex flex-column justify-content-center align-items-center mt-1">
            <p className="text-white fw-semibold fs-5 mt-1 mb-0">
              find out more about
            </p>
            <Link
              to="/about"
              className="text-decoration-none text-white fw-bold fs-1 mt-0 mb-1 "
            >
              <p>MyRoommate</p>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomeApp;
