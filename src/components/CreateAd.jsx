import CustomNavbar from "./CustomNavbar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/custom/custom.scss";

const CreateAd = () => {
  const [currentPage, setCurrentPage] = useState("");

  const location = useLocation();
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  const initialAd = {
    title: "",
    description: "",
    price: "",
    address: "",
    city: "",
    zipCode: "",
    roommates: 0,
    wc: 0,
    type: 1,
    image: "",
  };
  const [ad, setAd] = useState(initialAd);
  const [step, setStep] = useState(1);

  const handleChange = (key, value) => {
    // Se il campo è il file, aggiorna direttamente lo stato
    if (key === "file") {
      setAd({
        ...ad,
        image: value,
      });
    } else {
      // Altrimenti, aggiorna gli altri campi del modulo
      setAd({
        ...ad,
        [key]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        return ad.title !== "" && ad.description !== "" && ad.price !== "";
      case 2:
        return ad.address !== "" && ad.city !== "" && ad.zipCode !== "";
      case 3:
        return (
          ad.roommates !== "" &&
          ad.wc !== "" &&
          ad.type !== "" &&
          ad.image !== ""
        );
      default:
        return false;
    }
  };

  return (
    <>
      <CustomNavbar currentPage={currentPage} />
      <div className="container-fluid bg-BackgroundAppWelcomePage d-flex flex-column justify-content-start align-items-center p-5 vh-100">
        <Container className="bg-BackgroundAppWelcomePage container-fluid ">
          <Row>
            <Col md={6} className="offset-md-3">
              <Form className="text-white mt-4" onSubmit={handleSubmit}>
                {step === 1 && (
                  <>
                    {/* STEP 1 */}
                    <Form.Text className="text-center">
                      <h5 className="text-center text-white fw-bold mt-4 mb-2">
                        Do you have a room to publish? Now is the right time to
                        do it
                      </h5>
                    </Form.Text>
                    <Form.Group className="mb-1" controlId="formTitle">
                      <Form.Label>Enter the title of the ad</Form.Label>
                      <Form.Control
                        type="text"
                        value={ad.title}
                        onChange={(e) => {
                          handleChange("title", e.target.value);
                        }}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="formDescription">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        type="text"
                        value={ad.description}
                        onChange={(e) => {
                          handleChange("description", e.target.value);
                        }}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="formPrice">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="text"
                        value={ad.price}
                        onChange={(e) => {
                          handleChange("price", e.target.value);
                        }}
                        required
                      />
                    </Form.Group>

                    <Link to={"/ad"}>
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
                    <Form.Group className="mb-2" controlId="formAddress">
                      <Form.Label>Enter room address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Via Roma 12"
                        value={ad.address}
                        onChange={(e) => {
                          handleChange("address", e.target.value);
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formCity">
                      <Form.Label>Enter city</Form.Label>
                      <Form.Control
                        type="text"
                        value={ad.city}
                        onChange={(e) => {
                          handleChange("city", e.target.value);
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formZipCode">
                      <Form.Label>Enter Zip Code</Form.Label>
                      <Form.Control
                        type="text"
                        value={ad.zipCode}
                        onChange={(e) => {
                          handleChange("zipCode", e.target.value);
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
                    <Form.Text className="text-start text-white">
                      <h6>Indicate to whom this advertisement is addressed</h6>
                    </Form.Text>
                    <Form.Select
                      aria-label="Indicate to whom this advertisement is addressed"
                      value={ad.roommates}
                      onChange={(e) => {
                        handleChange("roommates", e.target.value);
                      }}
                      className="mb-1"
                    >
                      <option value="1">
                        Mixed house, room for all genders
                      </option>
                      <option value="2">Girls-only home</option>
                      <option value="3">Boys-only house</option>
                    </Form.Select>

                    <Form.Group className="mb-1" controlId="formWc">
                      <Form.Label>
                        How many toilets are in the house?
                      </Form.Label>
                      <Form.Control
                        type="number"
                        value={ad.wc}
                        onChange={(e) => {
                          handleChange("wc", e.target.value);
                        }}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="formRoommates">
                      <Form.Label>
                        How many housemates does the flat host?
                      </Form.Label>
                      <Form.Control
                        type="number"
                        value={ad.roommates}
                        onChange={(e) => {
                          handleChange("roommates", e.target.value);
                        }}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="formImage">
                      <Form.Label>Upload an image</Form.Label>
                      <Form.Control type="file" onChange={handleChange} />
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
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default CreateAd;
