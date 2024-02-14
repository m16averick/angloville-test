import { Form } from "react-bootstrap";
import "./TaskItem.scss";
import { TaskModal } from "../TaskModal/TaskModal";
import { DeleteTaskModal } from "../DeleteTaskModal/DeleteTaskModal";
import { useDispatch } from "react-redux";
import { toggleTask } from "../../redux/actions/taskActions";

export const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  return (
    <div className={task.completed ? "task-item task-item--completed mb-2" : "task-item mb-2"}>
      <Form.Check
        type="checkbox"
        id={`checkbox-${task.id}`}
        label={task.name}
        defaultChecked={task.completed}
        onChange={() => dispatch(toggleTask(task.id))}
      />
      <div className="task-item__buttons">
        <TaskModal task={task}>Edit</TaskModal>
        <DeleteTaskModal task={task} />
      </div>
    </div>
  );
};
