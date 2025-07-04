import { createContext } from "react";
import type { TaskStateModel } from "../../Models/TaskStateModel";
import { initialState } from "./initialTaskState";

type TaskContextProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

const initialContextValue = {
  state: initialState,
  setState: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);
