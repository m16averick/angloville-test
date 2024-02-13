import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/actions/taskActions";

export const TaskModal = ({ children }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const schema = z.object({
    taskName: z.string().min(1),
  });

  const { handleSubmit, control, getValues, setValue, register, reset } =
    useForm({
      resolver: zodResolver(schema),
    });

  const onSubmit = (data) => {
    dispatch(addTask(data.taskName));
    handleClose();
  };

  const handleClose = () => {
    setShow(false);
    reset();
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        {children}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="productTitle" className="mb-4">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                {...register("taskName")}
                placeholder="Enter task name"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
