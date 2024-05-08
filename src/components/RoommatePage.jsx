import { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoommate } from "../redux/actions/";
import { useParams, Link } from "react-router-dom";

const RoommatePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { roommate, isLoading, error } = useSelector((state) => state.roommate);

  useEffect(() => {
    dispatch(fetchRoommate(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Card className="border border-BackgroundAppWelcomePage m-3 border-3">
      <Card.Img variant="top" src={roommate.image} alt={roommate.name} />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div className="mb-1 text-center">
          <Card.Title className="mb-0 fs-1">{roommate.name}</Card.Title>
          <Card.Text className="mt-0 mb-0">Age: {roommate.age}</Card.Text>
          <Card.Text>Interests: {roommate.interests}</Card.Text>
        </div>
        <div className="text-center">
          <Button
            as={Link}
            to={`/apartment/${roommate.apartmentId}`}
            variant="Pulsanti"
            className="text-white fw-bolder"
          >
            <ArrowLeftCircle className="text-white fs-4 me-2" />
            Back to Apartment
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RoommatePage;
