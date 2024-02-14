import { render, screen } from "@testing-library/react";
import App from "./App";

import { Provider } from "react-redux";
import store from "./redux/store";

test("renders empty task list", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/no tasks to display/i);
  expect(linkElement).toBeInTheDocument();
});
