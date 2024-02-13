import "bootstrap/dist/css/bootstrap.min.css";
import { TaskList } from "./components/TaskList/TaskList";

export const App = () => {
  return (
    <div className="angloville-test">
      <TaskList />
    </div>
  );
};

export default App;
