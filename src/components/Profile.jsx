import CustomNavbar from "./CustomNavbar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../assets/custom/custom.scss";
import { Col, Container, Row, Button } from "react-bootstrap";
import { fetchUserInfo } from "../redux/actions/";
import { useDispatch, useSelector } from "react-redux";
import { Pencil } from "react-bootstrap-icons";

const Profile = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState("");
  const userInfo = useSelector((state) => state.userInformation.userInfo);

  const location = useLocation();

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
                Welcome {userInfo.firstName}, here is your profile
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
                      <Button className="bg-Pulsanti text-white position-absolute top-0 start-100 translate-middle badge rounded-pill">
                        <Pencil className="fs-6 m-0" />
                      </Button>
                    </div>
                  </div>
                  <hr className="bg-Pulsanti border-3" />
                  <div className="mb-2">
                    <h5 className="text-Pulsanti fw-bold d-flex justify-content-between align-items-center">
                      Bio
                      <Button className="bg-Pulsanti text-white badge rounded-pill">
                        <Pencil className="fs-6 m-0" />
                      </Button>
                    </h5>
                    <p className="mt-0 mb-2 border p-1 rounded border-Pulsanti">
                      {userInfo.bio ? userInfo.bio : "No bio, add it now!"}
                    </p>
                  </div>
                  <hr className="bg-Pulsanti border-3" />
                  <div className="mb-2">
                    <h5 className="text-Pulsanti fw-bold d-flex justify-content-between align-items-center">
                      Hobbies & Interests
                      <Button className="bg-Pulsanti text-white badge rounded-pill">
                        <Pencil className="fs-6 m-0" />
                      </Button>
                    </h5>
                    <p className="mt-0 mb-2 border p-1 rounded border-Pulsanti">
                      {userInfo.hobby
                        ? userInfo.hobby
                        : "No Hobbies & Interests, add them now!"}
                    </p>
                  </div>
                  <hr className="bg-Pulsanti border-3" />
                  <div className="mb-2">
                    <h5 className="text-Pulsanti fw-bold d-flex justify-content-between align-items-center">
                      What would you want in a future roommate?
                      <Button className="bg-Pulsanti text-white badge rounded-pill">
                        <Pencil className="fs-6 m-0" />
                      </Button>
                    </h5>
                    <p className="mt-0 mb-2 border p-1 rounded border-Pulsanti">
                      {userInfo.cohabitationPreferences
                        ? userInfo.cohabitationPreferences
                        : "Please enter your preferences"}
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
                      Zodiac sign:{" "}
                      <span className="fw-light text-dark">
                        {userInfo.zodiacSign}
                      </span>
                    </p>
                    <p className="my-0 text-Pulsanti fw-semibold">
                      Gender:{" "}
                      <span className="fw-light text-dark">
                        {userInfo.gender}
                      </span>
                    </p>
                    <p className="my-0 text-Pulsanti fw-semibold">
                      Occupation:{" "}
                      <span className="fw-light text-dark">
                        {userInfo.occupation}
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
                    <Button className="btn-Pulsanti text-white">
                      Edit personal information
                    </Button>
                    <Button variant="danger">Delete profile</Button>
                  </div>
                </Col>
              </Row>
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
