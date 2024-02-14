import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import configureStore from "redux-mock-store";
import { DeleteTaskModal } from "./DeleteTaskModal";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const mockStore = configureStore([]);

describe("DeleteTaskModal component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const task = { id: 1, name: "Task 1" };

  it("renders delete task button correctly", () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <DeleteTaskModal task={task} />
      </Provider>
    );

    const button = screen.getByText("Delete");
    expect(button).toBeInTheDocument();
  });

  it("opens delete task modal correctly", () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <DeleteTaskModal task={task} />
      </Provider>
    );

    const button = screen.getByText("Delete");
    fireEvent.click(button);

    expect(
      screen.getByText("Do you really want to delete")
    ).toBeInTheDocument();
    expect(screen.getByText("Task 1?")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
    expect(screen.getByText("Delete task")).toBeInTheDocument();
  });

  it("dispatches delete task action when button clicked", async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({});

    render(
      <Provider store={store}>
        <DeleteTaskModal task={task} />
      </Provider>
    );

    const button = screen.getByText("Delete");
    fireEvent.click(button);

    fireEvent.click(screen.getByText("Delete task"));

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: "DELETE_TASK",
        payload: 1,
      });
    });
  });
});
