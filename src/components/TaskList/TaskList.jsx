import { useSelector } from "react-redux";
import "./TaskList.scss";

import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { TaskModal } from "../TaskModal/TaskModal";
import { TaskItem } from "../TaskItem/TaskItem";

export const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);

  return (
    <>
      <div className="task-list">
        <Container className="mt-4">
          <Row>
            <Col md={8} className="mx-auto mt-4 d-flex justify-content-end">
              <TaskModal>+ Add Task</TaskModal>
            </Col>
          </Row>
          <Row>
            <Col md={8} className="mx-auto mt-4">
              {tasks.map((task) => (
                <TaskItem task={task} key={task.id} />
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
