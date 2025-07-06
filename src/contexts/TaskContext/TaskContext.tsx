import { createContext } from "react";
import type { TaskStateModel } from "../../Models/TaskStateModel";
import { initialState } from "./initialTaskState";
import type { TaskActionModel } from "./TaskActions";

type TaskContextProps = {
  state: TaskStateModel;
  dispatch: React.Dispatch<TaskActionModel>;
};

const initialContextValue = {
  state: initialState,
  dispatch: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);
