import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../../redux/actions/taskActions";

import { Button, Modal, Form } from "react-bootstrap";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const TaskModal = ({ children, task }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const schema = z.object({
    taskName: z.string().min(1, { message: "Task name is required." }),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    task
      ? dispatch(editTask(task.id, data.taskName))
      : dispatch(addTask(data.taskName));
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
            <Modal.Title>{task ? "Edit Task" : "Add Task"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="productTitle" className="mb-4">
              <Form.Label>Task Name*</Form.Label>
              <Form.Control
                {...register("taskName")}
                placeholder="Enter task name"
                defaultValue={task?.name}
              />
              <Form.Text style={{ color: "red" }}>
                {errors.taskName?.message}
              </Form.Text>
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
