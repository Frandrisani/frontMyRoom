import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "../assets/custom/custom.scss";
import {
  Heart,
  Search,
  Person,
  ChatLeftDots,
  PlusCircleDotted,
} from "react-bootstrap-icons";

// eslint-disable-next-line react/prop-types
const CustomNavbar = ({ currentPage }) => {
  const [isLgScreen, setIsLgScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLgScreen(window.innerWidth >= 992);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isLgScreen ? (
        <Navbar className="desktop-navbar bg-BackgroundAppWelcomePage">
          <Container className="d-flex justify-content-between align-items-center">
            <div>
              <Navbar.Brand
                href="#home"
                className="d-flex flex-column align-items-center text-white"
              >
                <img
                  src="/public/Logo.png"
                  width="40"
                  height="40"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
                <h5 className="ms-1">MyRoommate</h5>
              </Navbar.Brand>
            </div>
            <div>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link
                    href="/home"
                    style={{
                      pointerEvents: currentPage === "/home" ? "none" : "auto",
                    }}
                  >
                    <div className="d-flex flex-column align-items-center">
                      <Search
                        className="ml-4 fs-5 mx-2"
                        style={{
                          color: currentPage === "/home" ? "grey" : "white",
                        }}
                      />
                      <p
                        className="f4 fw-bolder"
                        style={{
                          color: currentPage === "/home" ? "grey" : "white",
                        }}
                      >
                        Search
                      </p>
                    </div>
                  </Nav.Link>
                  <Nav.Link
                    href="/ad"
                    style={{
                      pointerEvents:
                        currentPage === "/new-ad" || currentPage === "/ad"
                          ? "none"
                          : "auto",
                    }}
                  >
                    <div className="d-flex flex-column align-items-center">
                      <PlusCircleDotted
                        className="ml-4 fs-5 mx-2"
                        style={{
                          color:
                            currentPage === "/new-ad" || currentPage === "/ad"
                              ? "grey"
                              : "white",
                        }}
                      />
                      <p
                        className=" f4 fw-bolder"
                        style={{
                          color:
                            currentPage === "/new-ad" || currentPage === "/ad"
                              ? "grey"
                              : "white",
                        }}
                      >
                        Create Ad
                      </p>
                    </div>
                  </Nav.Link>
                  <Nav.Link href="#home">
                    <div className="d-flex flex-column align-items-center">
                      <Heart className="ml-4 text-white fs-5 mx-2" />
                      <p className="text-white f4 fw-bolder">Saved Rooms</p>
                    </div>
                  </Nav.Link>
                  <Nav.Link href="#home">
                    <div className="d-flex flex-column align-items-center">
                      <ChatLeftDots className="ml-4 text-white fs-5 mx-2" />
                      <p className="text-white f4 fw-bolder">Chat</p>
                    </div>
                  </Nav.Link>
                  <Nav.Link
                    href="/profile"
                    style={{
                      pointerEvents:
                        currentPage === "/profile" ? "none" : "auto",
                    }}
                  >
                    <div className="d-flex flex-column align-items-center">
                      <Person
                        className="ml-4 fs-5 mx-2"
                        style={{
                          color: currentPage === "/profile" ? "grey" : "white",
                        }}
                      />
                      <p
                        className=" f4 fw-bolder"
                        style={{
                          color: currentPage === "/profile" ? "grey" : "white",
                        }}
                      >
                        Profile
                      </p>
                    </div>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </div>
          </Container>
        </Navbar>
      ) : (
        <Navbar fixed="bottom" className="bg-BackgroundAppWelcomePage">
          <Container className="d-flex justify-content-center align-items-center">
            <div>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {/* <Nav.Link href="#home">
                    <img
                      src="/public/Logo.png"
                      alt="TastoHomePage"
                      width="30"
                      height="30"
                      className="me-1"
                    />
                  </Nav.Link> */}
                  <Nav.Link
                    href="/home"
                    style={{
                      pointerEvents: currentPage === "/home" ? "none" : "auto",
                    }}
                  >
                    <Search
                      className="ml-4 fs-2 mx-1"
                      style={{
                        color: currentPage === "/home" ? "grey" : "white",
                      }}
                    />
                  </Nav.Link>
                  <Nav.Link
                    href="/ad"
                    style={{
                      pointerEvents:
                        currentPage === "/new-ad" || currentPage === "/ad"
                          ? "none"
                          : "auto",
                    }}
                  >
                    <PlusCircleDotted
                      className="ml-4 fs-2 mx-1"
                      style={{
                        color:
                          currentPage === "/new-ad" || currentPage === "/ad"
                            ? "grey"
                            : "white",
                      }}
                    />
                  </Nav.Link>
                  <Nav.Link href="#link">
                    <Heart className="ml-4 text-white fs-2 mx-1" />
                  </Nav.Link>
                  <Nav.Link href="#link">
                    <ChatLeftDots className="ml-4 text-white fs-2 mx-1" />
                  </Nav.Link>
                  <Nav.Link
                    href="/Profile"
                    style={{
                      pointerEvents:
                        currentPage === "/profile" ? "none" : "auto",
                    }}
                  >
                    <Person
                      className="ml-4  fs-2 ms-1"
                      style={{
                        color: currentPage === "/profile" ? "grey" : "white",
                      }}
                    />
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </div>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default CustomNavbar;
