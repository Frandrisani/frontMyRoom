import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  editBio,
  editHobbies,
  editPreferences,
  fetchUserInfo,
} from "../redux/actions/index.js";
import "../assets/custom/custom.scss";

// eslint-disable-next-line react/prop-types
const EditModal = ({ title, initialValue, types, onClose }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(initialValue);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSave = () => {
    switch (types) {
      case "bio":
        dispatch(editBio(value));
        setShouldRefetch(true);
        break;
      case "hobbies":
        dispatch(editHobbies(value));
        setShouldRefetch(true);
        break;
      case "preferences":
        dispatch(editPreferences(value));
        setShouldRefetch(true);
        break;
      default:
        break;
    }
    onClose();
  };

  useEffect(() => {
    if (shouldRefetch) {
      dispatch(fetchUserInfo());
      setShouldRefetch(false);
    }
  }, [shouldRefetch, dispatch]);

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-Pulsanti fw-semibold">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Control
            as="textarea"
            value={value}
            onChange={handleChange}
            rows={4}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className=" btn-BackgroundAppWelcomePage text-white fw-bold"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          className="btn btn-Pulsanti text-white fw-bold"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
