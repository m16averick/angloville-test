import { Button, Form } from "react-bootstrap";
import "./TaskItem.scss";
import { TaskModal } from "../TaskModal/TaskModal";

export const TaskItem = ({ task }) => {
  return (
    <div className="task-item mb-2">
      <Form.Check
        type="checkbox"
        id={`checkbox-${task.id}`}
        label={task.name}
      />
      <div className="task-item__buttons">
        <TaskModal>Edit</TaskModal>
        <Button variant="danger">Delete</Button>
      </div>
    </div>
  );
};
