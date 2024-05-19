import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Card,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/custom/custom.scss";
import { registerRequest } from "../redux/actions/";

const SignUp = () => {
  const dispatch = useDispatch();

  const registrationError = useSelector((state) => state.registration.error);
  const registrationSuccess = useSelector(
    (state) => state.registration.success
  );

  const [step, setStep] = useState(1);
  const initialUser = {
    firstName: "",
    lastName: "",
    gender: 1,
    phoneNumber: "",
    email: "",
    usage: 1,
    password: "",
    birthdate: "",
    occupation: "",
    cityOfBirth: "",
    countryOfBirth: "",
  };
  const [user, setUser] = useState(initialUser);

  const handleChange = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerRequest(user));
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const isValidStep = (step) => {
    switch (step) {
      case 1:
        return (
          user.firstName !== "" &&
          user.lastName !== "" &&
          user.birthdate !== "" &&
          user.gender !== 0 &&
          user.cityOfBirth !== "" &&
          user.countryOfBirth !== ""
        );
      case 2:
        return user.phoneNumber !== "" && user.email !== "";
      case 3:
        return user.usage !== 0;
      case 4:
        return user.password !== "";
      default:
        return false;
    }
  };
  return (
    <>
      <div className=" bg-BackgroundAppWelcomePage d-flex flex-column justify-content-center align-items-center p-5 ">
        <Container className="bg-BackgroundAppWelcomePage">
          <Row>
            <Col md={6} className="offset-md-3">
              <div className="d-flex align-items-center">
                <img
                  src="/public/Logo.png"
                  alt="Logo"
                  style={{ width: "50px" }}
                />
                <h1 className="text-white ms-1 fs-1">Sign Up</h1>
              </div>

              {registrationSuccess ? (
                <Card className="text-center mt-5">
                  <Card.Body className="p-5">
                    <Card.Title>Registration successful!</Card.Title>
                    <Card.Text>
                      Now you can log in and start using MyRommate.
                    </Card.Text>
                    <Link to={"/"}>
                      <Button variant="Pulsanti" className="text-white">
                        Login
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              ) : (
                <Form className="text-white mt-4" onSubmit={handleSubmit}>
                  {step === 1 && (
                    <>
                      {/* STEP 1 */}
                      <Form.Group className="mb-1" controlId="formFirstName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Please enter your name"
                          value={user.firstName}
                          onChange={(e) => {
                            handleChange("firstName", e.target.value);
                          }}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-1" controlId="formLastName">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Please enter your surname"
                          value={user.lastName}
                          onChange={(e) => {
                            handleChange("lastName", e.target.value);
                          }}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-1" controlId="formBirthdate">
                        <Form.Label>Birthdate</Form.Label>
                        <Form.Control
                          type="date"
                          value={user.birthdate}
                          onChange={(e) => {
                            handleChange("birthdate", e.target.value);
                          }}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-2" controlId="formGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          required
                          value={user.gender}
                          onChange={(e) => {
                            handleChange("gender", e.target.value);
                          }}
                        >
                          <option>Select your gender</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                        </Form.Select>
                        <Form.Text className="text-white">
                          We ask you to express your biological sex for
                          bureaucratic reasons. MyRommate respects every choice
                          about your identity.{" "}
                          <span>
                            <Link
                              to={"/gender"}
                              className="text-white fw-bold d"
                            >
                              Why do you ask me my biological sexual gender?
                            </Link>
                          </span>
                        </Form.Text>
                      </Form.Group>
                      <Form.Group className="mb-1" controlId="formCity">
                        <Form.Label>Your home town</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Ex: Rome, Milan, New York"
                          value={user.cityOfBirth}
                          onChange={(e) => {
                            handleChange("cityOfBirth", e.target.value);
                          }}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-2" controlId="formCountry">
                        <Form.Label>Your country of origin</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Ex: Italy, USA, UK"
                          value={user.countryOfBirth}
                          onChange={(e) => {
                            handleChange("countryOfBirth", e.target.value);
                          }}
                          required
                        />
                      </Form.Group>

                      <Link to={"/"}>
                        <Button variant="btn btn-outline-light me-1">
                          Back
                        </Button>
                      </Link>
                      <Button
                        variant="btn btn-light"
                        onClick={handleNextStep}
                        disabled={!isValidStep(step)}
                      >
                        Next
                      </Button>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      {/* STEP 2 */}
                      <Form.Group
                        className="mb-2"
                        controlId="formBasicPhoneNumber"
                      >
                        <Form.Label>Enter your mobile phone number</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="+393212345678"
                          value={user.phoneNumber}
                          onChange={(e) => {
                            handleChange("phoneNumber", e.target.value);
                          }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Enter your email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="your@email.com"
                          value={user.email}
                          onChange={(e) => {
                            handleChange("email", e.target.value);
                          }}
                        />
                        <Form.Text className="text-white">
                          It is important that you enter a valid e-mail as this
                          is where we will send you updates on your searches or
                          to recover your password.
                        </Form.Text>
                      </Form.Group>

                      <Button
                        variant="btn btn-outline-light me-1"
                        onClick={handlePreviousStep}
                      >
                        Back
                      </Button>
                      <Button
                        variant="btn btn-light"
                        onClick={handleNextStep}
                        disabled={!isValidStep(step)}
                      >
                        Next
                      </Button>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      {/* STEP 3 */}
                      <Form.Label className="text-white mb-2">
                        How would you like to use MyRommate?
                      </Form.Label>
                      <Form.Select
                        aria-label="Select usage"
                        value={user.usage}
                        onChange={(e) => {
                          handleChange("usage", e.target.value);
                        }}
                        className="mb-2"
                      >
                        <option value="">Select usage</option>
                        <option value="SEARCH_ROOM">
                          Im looking for a room
                        </option>
                        <option value="LOOKING_ROOMMATE">
                          Im looking for a roommate for my property
                        </option>
                        <option value="RENTING_APARTMENT">
                          Im renting out a room in my apartment
                        </option>
                      </Form.Select>
                      <Button
                        variant="btn btn-outline-light me-1"
                        onClick={handlePreviousStep}
                      >
                        Back
                      </Button>
                      <Button
                        variant="btn btn-light"
                        onClick={handleNextStep}
                        disabled={!isValidStep(step)}
                      >
                        Next
                      </Button>
                    </>
                  )}

                  {step === 4 && (
                    <>
                      {/* STEP 4 */}
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
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
                      <Button
                        variant="btn btn-outline-light me-1"
                        onClick={handlePreviousStep}
                      >
                        Back
                      </Button>
                      <Button
                        variant="light"
                        type="submit"
                        disabled={!isValidStep(step)}
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </Form>
              )}
              {registrationError && (
                <Alert variant="danger" className="mt-3">
                  {registrationError}
                </Alert>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SignUp;
