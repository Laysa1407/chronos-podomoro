import { useEffect, useReducer, useRef } from "react";
import { initialState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { TaskReducer } from "./TaskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionType } from "./TaskActions";
import { loadBeep } from "../../utils/loadBeep";
import type { TaskStateModel } from "../../Models/TaskStateModel";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(TaskReducer, initialState, () => {
    const state = localStorage.getItem("state") || null;

    if (state === null) return initialState;
    const stateFormatted = JSON.parse(state) as TaskStateModel;
    return {
      ...stateFormatted,
      secondsRemaining: 0,
      formattedSecondsRemaining: "00:00",
      activeTask: null,
    };
  });
  const playBeepRef = useRef<() => void | null>(null);

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage((e) => {
    const countDownSeconds = e.data;

    if (countDownSeconds <= 0) {
      if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null;
      }
      dispatch({
        type: TaskActionType.COMPLETE_TASK,
      });
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionType.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
    }

    document.title = `${state.formattedSecondsRemaining}-Chronos Pomodoro`;

    worker.postMessage(state);
  }, [state, worker]);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
