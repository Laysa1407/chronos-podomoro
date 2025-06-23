import { useContext } from "react";
import { TaskContext } from "./TaskContext";

export function useContextTask() {
  return useContext(TaskContext);
}
