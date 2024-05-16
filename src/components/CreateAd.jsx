import CustomNavbar from "./CustomNavbar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/custom/custom.scss";
import { newRoom } from "../redux/actions/";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateAd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("");
  const [step, setStep] = useState(1);
  const [roomIda, setRoomIda] = useState(null);

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
  };

  const [ad, setAd] = useState(initialAd);

  const handleChange = (key, value) => {
    setAd({
      ...ad,
      [key]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(newRoom(ad))
      .then((id) => {
        setRoomIda(id);
        console.log(roomIda);
        navigate(`/edit-image-room/${id}`); // Utilizza direttamente l'ID restituito dalla Promise
      })
      .catch((error) => {
        console.error(error);
      });
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
        return ad.roommates !== 0 && ad.wc !== 0;
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
                      <h4 className="text-center text-white fw-bold mt-4 mb-2">
                        Do you have a room to publish? Now is the right time to
                        do it
                      </h4>
                    </Form.Text>
                    <Form.Group className="mb-2" controlId="formTitle">
                      <Form.Label className="fw-semibold">
                        {" "}
                        Enter the title of the ad
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Title"
                        value={ad.title}
                        onChange={(e) => {
                          handleChange("title", e.target.value);
                        }}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formDescription">
                      <Form.Label className="fw-semibold">
                        Description
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        type="text"
                        placeholder="Description"
                        value={ad.description}
                        onChange={(e) => {
                          handleChange("description", e.target.value);
                        }}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formPrice">
                      <Form.Label className="fw-semibold">Price</Form.Label>
                      <Form.Control
                        type="text"
                        value={ad.price}
                        placeholder="Price in €"
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
                      <Form.Label className="fw-semibold">
                        Enter room address
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ex: Via Roma 12"
                        value={ad.address}
                        onChange={(e) => {
                          handleChange("address", e.target.value);
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formCity">
                      <Form.Label className="fw-semibold">
                        Enter city
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ex: Milano"
                        value={ad.city}
                        onChange={(e) => {
                          handleChange("city", e.target.value);
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formZipCode">
                      <Form.Label className="fw-semibold">
                        Enter Zip Code
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ex: 20019"
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
                      <h6 className="fw-semibold">
                        Indicate to whom this advertisement is addressed
                      </h6>
                    </Form.Text>
                    <Form.Select
                      aria-label="Indicate to whom this advertisement is addressed"
                      value={ad.type}
                      onChange={(e) => {
                        handleChange("type", e.target.value);
                      }}
                      className="mb-2"
                    >
                      <option value="MIXED">
                        Mixed house, room for all genders
                      </option>
                      <option value="WOMAN_ONLY">Girls-only home</option>
                      <option value="MAN_ONLY">Boys-only house</option>
                    </Form.Select>

                    <Form.Group className="mb-2" controlId="formWc">
                      <Form.Label className="fw-semibold">
                        How many toilets are in the house?
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Number of toilets"
                        value={ad.wc}
                        onChange={(e) => {
                          handleChange("wc", e.target.value);
                        }}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formRoommates">
                      <Form.Label className="fw-semibold">
                        How many housemates does the flat host?
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Number of housemates"
                        value={ad.roommates}
                        onChange={(e) => {
                          handleChange("roommates", e.target.value);
                        }}
                        required
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
                      Publish now
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
