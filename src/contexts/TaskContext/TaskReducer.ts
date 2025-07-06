import type { TaskStateModel } from "../../Models/TaskStateModel";
import { formatSecondsInMinutes, getNextCycle } from "../../utils/utils";
import { initialState } from "./initialTaskState";
import { TaskActionType, type TaskActionModel } from "./TaskActions";

export function TaskReducer(
  state: TaskStateModel,
  action: TaskActionModel
): TaskStateModel {
  switch (action.type) {
    case TaskActionType.START_TASK: {
      const newTask = action.payload;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = newTask.duration * 60;

      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsInMinutes(secondsRemaining),
        tasks: [...state.tasks, newTask],
      };
    }
    case TaskActionType.INTERRUPT_TASK:
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
        tasks: state.tasks.map((task) => {
          if (state.activeTask && state.activeTask?.id === task.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        }),
      };
    case TaskActionType.COMPLETE_TASK:
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
        tasks: state.tasks.map((task) => {
          if (state.activeTask && state.activeTask?.id === task.id) {
            return { ...task, completeDate: Date.now() };
          }
          return task;
        }),
      };
    case TaskActionType.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formatSecondsInMinutes(
          action.payload.secondsRemaining
        ),
      };
    }
    case TaskActionType.RESET_STATE: {
      return { ...initialState };
    }
    case TaskActionType.CHANGE_SETTINGS: {
      return { ...state, config: { ...action.payload } };
    }
  }
  return state;
}
