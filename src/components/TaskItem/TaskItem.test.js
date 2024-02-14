import { fireEvent, render, screen } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import configureStore from "redux-mock-store";
import { TaskItem } from "./TaskItem";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const mockStore = configureStore([]);

describe("TaskItem component", () => {
  const task = {
    id: 1,
    name: "Task 1",
    completed: false,
  };

  it("renders task correctly", () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <TaskItem task={task} />
      </Provider>
    );

    const checkbox = screen.getByLabelText("Task 1");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    const editButton = screen.getByText("Edit");
    expect(editButton).toBeInTheDocument();

    const deleteButton = screen.getByText("Delete");
    expect(deleteButton).toBeInTheDocument();
  });

  it("dispatches toggleTask action when checkbox is clicked", () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({});

    render(
      <Provider store={store}>
        <TaskItem task={task} />
      </Provider>
    );

    const checkbox = screen.getByLabelText("Task 1");
    fireEvent.click(checkbox);

    expect(dispatch).toHaveBeenCalledWith({ type: "TOGGLE_TASK", payload: 1 });
  });
});
