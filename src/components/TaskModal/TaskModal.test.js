import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import configureStore from "redux-mock-store";
import { TaskModal } from "./TaskModal";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const mockStore = configureStore([]);

describe("TaskModal component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders add task button correctly", () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <TaskModal>Add New Task</TaskModal>
      </Provider>
    );

    const button = screen.getByText("Add New Task");
    expect(button).toBeInTheDocument();
  });

  it("opens add task modal correctly", () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <TaskModal>Add New Task</TaskModal>
      </Provider>
    );

    const button = screen.getByText("Add New Task");
    fireEvent.click(button);

    expect(screen.getByText("Add Task")).toBeInTheDocument();
    expect(screen.getByLabelText("Task Name*")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("dispatches addTask action when form is submitted with valid data", async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({});
    render(
      <Provider store={store}>
        <TaskModal>Add New Task</TaskModal>
      </Provider>
    );

    const button = screen.getByText("Add New Task");
    fireEvent.click(button);

    fireEvent.change(screen.getByLabelText("Task Name*"), {
      target: { value: "New Task" },
    });
    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: "ADD_TASK",
        payload: "New Task",
      });
    });
  });

  it("dispatches editTask action when form is submitted with valid data", async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({});
    const task = { id: 1, name: "Task 1" };

    render(
      <Provider store={store}>
        <TaskModal task={task}>Edit Task</TaskModal>
      </Provider>
    );

    const button = screen.getByText("Edit Task");
    fireEvent.click(button);

    fireEvent.change(screen.getByLabelText("Task Name*"), {
      target: { value: "Updated Task" },
    });
    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: "EDIT_TASK",
        payload: { taskId: 1, newTask: "Updated Task" },
      });
    });
  });
});
