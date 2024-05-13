import CustomNavbar from "./CustomNavbar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../assets/custom/custom.scss";
import { Col, Container, Row, Button, Modal, Form } from "react-bootstrap";
import { fetchUserInfo, deleteUser, uploadImage } from "../redux/actions/";
import { useDispatch, useSelector } from "react-redux";
import { Pencil } from "react-bootstrap-icons";
import EditModal from "./EditModal";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState("");
  const userInfo = useSelector((state) => state.userInformation.userInfo);
  const [showBioModal, setShowBioModal] = useState(false);
  const [showHobbiesModal, setShowHobbiesModal] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation();

  const handleEditBio = () => {
    setShowBioModal(true);
  };

  const handleEditHobbies = () => {
    setShowHobbiesModal(true);
  };

  const handleEditPreferences = () => {
    setShowPreferencesModal(true);
  };

  const handleCloseModals = () => {
    setShowBioModal(false);
    setShowHobbiesModal(false);
    setShowPreferencesModal(false);
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser());
    setShowDeleteModal(false);
    navigate("/");
  };

  const handleEditImage = () => {
    setShowImageModal(true);
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUploadImage = () => {
    dispatch(uploadImage(selectedImage));
    setShowImageModal(false);
  };

  useEffect(() => {
    setCurrentPage(location.pathname);
    dispatch(fetchUserInfo());
  }, [dispatch, location]);

  return (
    <>
      <CustomNavbar currentPage={currentPage} />
      <div className="container-fluid bg-BackgroundAppWelcomePage d-flex flex-column justify-content-start align-items-center p-5 vh-100">
        <Container className="bg-BackgroundAppWelcomePage container-fluid">
          {userInfo ? (
            <>
              <h3 className="text-white mb-3 fw-bold">
                Welcome{" "}
                <span className="text-Pulsanti">{userInfo.firstName}</span>,
                here is your profile
              </h3>
              <Row className="justify-content-start ">
                <Col
                  md={12}
                  className="bg-white rounded-3 shadow p-4 "
                  style={{ maxHeight: "70vh", overflowY: "auto" }}
                >
                  <div className="d-flex justify-content-center mb-4">
                    <div className="position-relative">
                      <img
                        src={userInfo.avatar}
                        alt="profile picture"
                        className="shadow-lg rounded-circle border border-2 border-Pulsanti mb-1"
                        width="150"
                        height="150"
                      />
                      <Button
                        className="bg-Pulsanti text-white position-absolute top-0 start-100 translate-middle badge rounded-pill"
                        onClick={handleEditImage}
                      >
                        <Pencil className="fs-6 m-0" />
                      </Button>
                    </div>
                  </div>
                  <hr className="bg-Pulsanti border-3" />
                  <div className="mb-2">
                    <h5 className="text-Pulsanti fw-bold d-flex justify-content-between align-items-center">
                      Bio
                      <Button
                        className="bg-Pulsanti text-white badge rounded-pill"
                        onClick={handleEditBio}
                      >
                        <Pencil className="fs-6 m-0" />
                      </Button>
                    </h5>
                    <p className="mt-0 mb-2 border p-1 rounded border-Pulsanti">
                      {userInfo.bio ? (
                        userInfo.bio
                      ) : (
                        <p className="p-0 m-0 text-BackgroundAppWelcomePage fw-semibold">
                          No bio, add it now!
                        </p>
                      )}
                    </p>
                  </div>
                  <hr className="bg-Pulsanti border-3" />
                  <div className="mb-2">
                    <h5 className="text-Pulsanti fw-bold d-flex justify-content-between align-items-center">
                      Hobbies & Interests
                      <Button
                        className="bg-Pulsanti text-white badge rounded-pill"
                        onClick={handleEditHobbies}
                      >
                        <Pencil className="fs-6 m-0" />
                      </Button>
                    </h5>
                    <p className="mt-0 mb-2 border p-1 rounded border-Pulsanti">
                      {userInfo.hobby ? (
                        userInfo.hobby
                      ) : (
                        <p className="p-0 m-0 text-BackgroundAppWelcomePage fw-semibold">
                          No Hobbies & Interests, add them now!
                        </p>
                      )}
                    </p>
                  </div>
                  <hr className="bg-Pulsanti border-3" />
                  <div className="mb-2">
                    <h5 className="text-Pulsanti fw-bold d-flex justify-content-between align-items-center">
                      What would you want in a future roommate?
                      <Button
                        className="bg-Pulsanti text-white badge rounded-pill"
                        onClick={handleEditPreferences}
                      >
                        <Pencil className="fs-6 m-0" />
                      </Button>
                    </h5>
                    <p className="mt-0 mb-2 border p-1 rounded border-Pulsanti">
                      {userInfo.cohabitationPreferences ? (
                        userInfo.cohabitationPreferences
                      ) : (
                        <p className="p-0 m-0 text-BackgroundAppWelcomePage fw-semibold">
                          Please enter your preferences
                        </p>
                      )}
                    </p>
                  </div>
                  <hr className="bg-Pulsanti border-3" />
                  <div className="mb-2">
                    <h5 className="text-Pulsanti fw-bold">
                      Personal Information
                    </h5>
                    <p className="my-0 text-Pulsanti fw-semibold">
                      Name:{" "}
                      <span className="fw-light text-dark">
                        {userInfo.firstName}
                      </span>
                    </p>
                    <p className="my-0 text-Pulsanti fw-semibold">
                      Surname:{" "}
                      <span className="fw-light text-dark">
                        {userInfo.lastName}
                      </span>
                    </p>
                    <p className="my-0 text-Pulsanti fw-semibold">
                      Your birthday:{" "}
                      <span className="fw-light text-dark">
                        {userInfo.birthdate}
                      </span>
                    </p>
                    <p className="my-0 text-Pulsanti fw-semibold">
                      Gender:{" "}
                      <span className="fw-light text-dark">
                        {userInfo.gender}
                      </span>
                    </p>
                  </div>
                  <hr className="bg-Pulsanti border-3" />
                  {/* INFORMAZIONI DI PROVENIENZA */}
                  <div className="mb-2">
                    <h5 className="text-Pulsanti fw-bold">
                      Address Information
                    </h5>
                    <p className="my-0 text-Pulsanti fw-semibold">
                      City of birth:{" "}
                      <span className="fw-light text-dark">
                        {userInfo.cityOfBirth}
                      </span>
                    </p>
                    <p className="my-0 text-Pulsanti fw-semibold">
                      Country of birth:{" "}
                      <span className="fw-light text-dark">
                        {userInfo.countryOfBirth}
                      </span>
                    </p>
                  </div>
                  <hr className="bg-Pulsanti border-3" />
                  {/* FINE INFORMAZIONI DI PROVENIENZA */}
                  <div className="mb-2">
                    <h5 className="text-Pulsanti fw-bold">
                      Contact information
                    </h5>
                    <p className="my-0 text-Pulsanti fw-semibold">
                      Email:{" "}
                      <span className="fw-light text-dark">
                        {userInfo.email}
                      </span>
                    </p>
                    <p className="my-0 text-Pulsanti fw-semibold">
                      Phone Number:{" "}
                      <span className="fw-light text-dark">
                        {userInfo.phoneNumber}
                      </span>
                    </p>
                  </div>
                  {/* FINE INFORMAZIONI DI CONTATTO */}
                  <div className="d-flex justify-content-between align-items-center">
                    <Button
                      variant="danger"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      Delete profile
                    </Button>
                  </div>
                </Col>
              </Row>
              {/* Modale per la modifica della bio */}
              {showBioModal && (
                <EditModal
                  title="Edit Bio"
                  initialValue={userInfo.bio}
                  types="bio"
                  yy
                  onSave={(newValue) => {
                    console.log("Nuova bio:", newValue);
                  }}
                  onClose={handleCloseModals}
                />
              )}
              {/* Modale per la modifica degli hobby */}
              {showHobbiesModal && (
                <EditModal
                  title="Edit Hobbies"
                  types="hobbies"
                  initialValue={userInfo.hobby}
                  onSave={(newValue) => {
                    console.log("Nuovi hobbies:", newValue);
                  }}
                  onClose={handleCloseModals}
                />
              )}
              {showPreferencesModal && (
                <EditModal
                  title="Change roommate preferences"
                  types="preferences"
                  initialValue={userInfo.preference}
                  onSave={(newValue) => {
                    console.log("Nuovi hobbies:", newValue);
                  }}
                  onClose={handleCloseModals}
                />
              )}
              {showDeleteModal && (
                <Modal
                  show={showDeleteModal}
                  onHide={() => setShowDeleteModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Delete profile</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure you want to delete your profile?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      No
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteUser()}>
                      Yes
                    </Button>
                  </Modal.Footer>
                </Modal>
              )}
              {showImageModal && (
                <Modal
                  show={showImageModal}
                  onHide={() => setShowImageModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title className="text-Pulsanti fw-semibold">
                      Upload new profile image
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Choose a new profile image</Form.Label>
                      <Form.Control type="file" onChange={handleImageChange} />
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      className=" btn-BackgroundAppWelcomePage text-white fw-bold"
                      onClick={() => setShowImageModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="btn btn-Pulsanti text-white fw-bold"
                      onClick={handleUploadImage}
                    >
                      Upload
                    </Button>
                  </Modal.Footer>
                </Modal>
              )}
            </>
          ) : (
            <h2>Loading...</h2>
          )}
        </Container>
      </div>
    </>
  );
};
export default Profile;
