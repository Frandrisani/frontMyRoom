import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../assets/custom/custom.scss";
import CustomNavbar from "./CustomNavbar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { uploadImageRoom } from "../redux/actions/";

// eslint-disable-next-line react/prop-types
const EditImageRoom = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const isValidStep = () => {
    return selectedImage !== null && selectedImage !== "";
  };

  const location = useLocation();
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(uploadImageRoom(id, selectedImage));
    navigate("/ad");
  };

  return (
    <>
      <CustomNavbar currentPage={currentPage} />
      <div className="container-fluid bg-BackgroundAppWelcomePage d-flex flex-column justify-content-start align-items-center p-5 vh-100">
        <Container className="bg-BackgroundAppWelcomePage container-fluid ">
          <Row>
            <Col md={6} className="offset-md-3">
              <Form className="text-white mt-4" onSubmit={handleSubmit}>
                <Form.Text className="text-center">
                  <h4 className="text-center text-white fw-bold mt-4 mb-2">
                    What do you say, let&apos;s show how beautiful your room is?
                  </h4>
                </Form.Text>
                <Form.Group controlId="formFile" className="mb-0">
                  <Form.Label>Choose a room image</Form.Label>
                  <Form.Control type="file" onChange={handleImageChange} />
                </Form.Group>
                <Form.Text className="text-center">
                  <p className="text-start text-white mt-1 mb-3">
                    Suggestions: Try to take the whole room, showing the bed,
                    any furniture provided, etc.
                  </p>
                </Form.Text>
                <Link to={"/ad"}>
                  <Button variant="btn btn-outline-light me-1">Exit</Button>
                </Link>
                <Button
                  variant="btn btn-light"
                  type="submit"
                  disabled={!isValidStep()}
                >
                  Upload image
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default EditImageRoom;
