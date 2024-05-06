import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/custom/custom.scss";

const SignUp = () => {
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
    console.log(user);
    setUser(initialUser);
  };

  const [formValid, setFormValid] = useState({});

  const handleNextStep = () => {
    setFormValid({ ...formValid, [step]: false });
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setFormValid({ ...formValid, [step]: true });
    setStep(step - 1);
  };

  const isValidStep = (step) => {
    switch (step) {
      case 1:
        return (
          user.firstName !== "" &&
          user.lastName !== "" &&
          user.birthdate !== "" &&
          user.gender !== 0
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
      <div className="container-fluid bg-BackgroundAppWelcomePage d-flex flex-column justify-content-center align-items-center p-5 vh-100">
        <Container className="bg-BackgroundAppWelcomePage container-fluid ">
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
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                      </Form.Select>
                      <Form.Text className="text-white">
                        We ask you to express your biological sex for
                        bureaucratic reasons. MyRommate respects every choice
                        about your identity.{" "}
                        <span>
                          <Link to={"/gender"} className="text-white fw-bold d">
                            Why do you ask me my biological sexual gender?
                          </Link>
                        </span>
                      </Form.Text>
                    </Form.Group>

                    <Link to={"/"}>
                      <Button variant="btn btn-outline-light me-1">Back</Button>
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
                        It is important that you enter a valid e-mail as this is
                        where we will send you updates on your searches or to
                        recover your password.
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
                    <Form.Label className="text-white mt-4">
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
                      <option value="1">
                        Im looking for a roommate for my property
                      </option>
                      <option value="2">
                        Im renting out a room in my apartment
                      </option>
                      <option value="3">Im looking for a room</option>
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
                    <Form.Group className="mb-3" controlId="formBasicPassword">
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

                {/* FINAL STEP */}
                {step === 5 && (
                  <>
                    {/* FINAL STEP */}
                    <h2>Final Step</h2>
                    <p>Choose your preferences:</p>
                    <Button variant="light" className="me-2">
                      Music Lover
                    </Button>
                    <Button variant="light" className="me-2">
                      Movie Buff
                    </Button>
                    <Button variant="light" className="me-2">
                      Bookworm
                    </Button>
                    <Button variant="light" className="me-2">
                      Fitness Enthusiast
                    </Button>
                    <Button variant="light" className="me-2">
                      Foodie
                    </Button>
                    <Button
                      variant="btn btn-outline-light me-1"
                      onClick={() => setStep(step - 1)}
                    >
                      Back
                    </Button>
                    <Button variant="btn btn-light" type="submit">
                      Sign Up
                    </Button>
                  </>
                )}
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SignUp;
