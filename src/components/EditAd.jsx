import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { editRoom } from "../redux/actions/";
import "../assets/custom/custom.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleRoom } from "../redux/actions/";
import { Row, Col, Button, Container, Form } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import CustomNavbar from "./CustomNavbar";

const EditAd = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState("");
  const location = useLocation();
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  const room = useSelector((state) => state.singleRoom.room);
  const { loading, error } = useSelector((state) => state.singleRoom);

  const initialAd = {
    title: room ? room.title : "",
    description: room ? room.description : "",
    price: room ? room.price : "",
    address: room ? room.address : "",
    city: room ? room.city : "",
    zipCode: room ? room.zipCode : "",
    bedrooms: room ? room.bedrooms : 0,
    wc: room ? room.wc : 0,
    type: room ? room.type : 1,
  };

  const [ad, setAd] = useState(initialAd);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (key, value) => {
    setAd({
      ...ad,
      [key]: value,
    });
  };

  useEffect(() => {
    dispatch(fetchSingleRoom(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (room) {
      setAd({
        title: room.title,
        description: room.description,
        price: room.price,
        address: room.address,
        city: room.city,
        zipCode: room.zipCode,
        bedrooms: room.bedrooms,
        wc: room.wc,
        type: room.type,
      });
    }
  }, [room]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(editRoom(id, ad));
    setIsSaved(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <CustomNavbar currentPage={currentPage} />
      <div className="container-fluid bg-BackgroundAppWelcomePage d-flex flex-column justify-content-start align-items-center p-5">
        <Container className="bg-BackgroundAppWelcomePage container-fluid">
          {isSaved ? (
            <div className="vh-100 d-flex flex-column justify-content-start align-items-center">
              <h3 className="fw-bold text-white text-center mb-1">
                Ad successfully edited! Go back to your ad
              </h3>
              <Link to="/ad">
                <Button variant="Pulsanti" className="text-white">
                  Back to Ads
                </Button>
              </Link>
            </div>
          ) : (
            <Row>
              <Col md={6} className="offset-md-3">
                <h3 className="text-center fw-bold text-white">Edit your ad</h3>
                <Form className="text-white mt-3" onSubmit={submitHandler}>
                  <Form.Group className="mb-2" controlId="formTitle">
                    <Form.Label className="fw-semibold">
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
                    <Form.Label className="fw-semibold">Description</Form.Label>
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
                    <Form.Label className="fw-semibold">Enter city</Form.Label>
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
                      How many bedrooms are there?
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Number of housemates"
                      value={ad.bedrooms}
                      onChange={(e) => {
                        handleChange("bedrooms", e.target.value);
                      }}
                      required
                    />
                  </Form.Group>
                  <Form.Select
                    aria-label="Indicate to whom this advertisement is addressed"
                    value={ad.type}
                    onChange={(e) => {
                      handleChange("type", e.target.value);
                    }}
                    className="mb-2"
                  >
                    <option value="">Select type</option>
                    <option value="WOMAN_ONLY">Women Only</option>
                    <option value="MAN_ONLY">Man Only</option>
                    <option value="MIXED">Mixed</option>
                  </Form.Select>
                  <div className="d-flex justify-content-between">
                    <Button variant="light" type="submit">
                      Save Changes
                    </Button>
                    <Link to={`/ad`}>
                      <Button variant="Pulsanti" className="text-white">
                        Back
                      </Button>
                    </Link>
                  </div>
                </Form>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </>
  );
};

export default EditAd;
