import type { TaskModel } from "../../Models/TaskModel";
import type { TaskStateModel } from "../../Models/TaskStateModel";

export enum TaskActionType {
  START_TASK = "START_TASK",
  INTERRUPT_TASK = "INTERRUṔT-TASK",
  RESET_TASK = "RESET_TASK",
  COUNT_DOWN = "COUNT_DOWN",
  COMPLETE_TASK = "COMPLETE_TASK",
  RESET_STATE = "RESET_STATE",
  CHANGE_SETTINGS = "CHANGE_SETTINGS",
}

export type TaskActionModel =
  | {
      type: TaskActionType.START_TASK;
      payload: TaskModel;
    }
  | {
      type: TaskActionType.INTERRUPT_TASK;
    }
  | {
      type: TaskActionType.RESET_TASK;
      payload: TaskModel;
    }
  | {
      type: TaskActionType.COUNT_DOWN;
      payload: { secondsRemaining: number };
    }
  | {
      type: TaskActionType.COMPLETE_TASK;
    }
  | {
      type: TaskActionType.RESET_STATE;
    }
  | {
      type: TaskActionType.CHANGE_SETTINGS;
      payload: TaskStateModel["config"];
    };
