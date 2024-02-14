import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { TaskList } from "./TaskList";

const mockStore = configureStore([]);

describe("TaskList component", () => {
  it("renders 'No tasks to display...' message when there are no tasks", () => {
    const store = mockStore({
      tasks: [],
    });

    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );
    const linkElement = screen.getByText("No tasks to display...");
    expect(linkElement).toBeInTheDocument();
  });

  it("renders tasks correctly", () => {
    const store = mockStore({
      tasks: [
        { id: 1, name: "Task 1", completed: false },
        { id: 2, name: "Task 2", completed: true },
      ],
    });

    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });
});
