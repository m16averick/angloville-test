import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../redux/actions/taskActions";

import { Button, Modal } from "react-bootstrap";

export const DeleteTaskModal = ({ task }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Button variant="danger" onClick={() => setShow(true)}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you really want to delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>{task.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            type="submit"
            variant="danger"
            onClick={() => dispatch(deleteTask(task.id))}
          >
            Delete task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
