import { TaskContextProvider } from "./contexts/TaskContext/TaskContextProvider";
import { Feedback } from "./componentes/Feedback";
import { MainRouter } from "./routers/MainRouters";
import "./assets/styles/theme.css";
import "./assets/styles/global.css";

export function App() {
  return (
    <TaskContextProvider>
      <Feedback>
        <MainRouter />
      </Feedback>
    </TaskContextProvider>
  );
}
