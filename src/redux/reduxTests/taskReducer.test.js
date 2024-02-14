import {
  EDIT_TASK,
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
} from "../actions/taskActions";
import taskReducer from "../reducers/taskReducer";

describe("taskReducer", () => {
  const initialState = {
    tasks: [],
  };

  it("should return the initial state", () => {
    expect(taskReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ADD_TASK", () => {
    const name = "Task 1";
    const action = { type: ADD_TASK, payload: name };

    expect(taskReducer(initialState, action)).toEqual({
      tasks: [{ completed: false, id: 0, name }],
    });
  });

  it("should handle DELETE_TASK", () => {
    const initialStateWithTasks = {
      tasks: [{ id: 1, name: "Task 1", completed: false }],
    };
    const action = { type: DELETE_TASK, payload: 1 };

    expect(taskReducer(initialStateWithTasks, action)).toEqual({
      tasks: [],
    });
  });

  it("should handle TOGGLE_TASK", () => {
    const initialStateWithTasks = {
      tasks: [{ id: 1, name: "Task 1", completed: false }],
    };
    const action = { type: TOGGLE_TASK, payload: 1 };

    expect(taskReducer(initialStateWithTasks, action)).toEqual({
      tasks: [{ id: 1, name: "Task 1", completed: true }],
    });
  });

  it("should handle EDIT_TASK", () => {
    const initialStateWithTasks = {
      tasks: [{ id: 1, name: "Task 1", completed: false }],
    };
    const payload = { taskId: 1, newTask: "Updated Task" };
    const action = { type: EDIT_TASK, payload };

    expect(taskReducer(initialStateWithTasks, action)).toEqual({
      tasks: [{ completed: false, id: 1, name: "Updated Task" }],
    });
  });
});
