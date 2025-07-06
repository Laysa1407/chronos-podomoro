import { useContextTask } from "../../contexts/TaskContext/useTaskCOontext";
import { getNextCycleType } from "../../utils/utils";

export function Tips() {
  const { state } = useContextTask();

  const tipsForWhenActiveTask = {
    workTime: <span>Foque por {state.config.workTime} minutos</span>,
    shortBreakTime: (
      <span>Descanse por {state.config.shortBreakTime} minutos</span>
    ),
    longBreakTime: <span>Descanso longo </span>,
  };

  const tipsNoActiveTask = {
    workTime: <span>Próximo ciclo é de {state.config.workTime} minutos</span>,
    shortBreakTime: (
      <span>Próximo ciclo é de {state.config.shortBreakTime} minutos</span>
    ),
    longBreakTime: (
      <span>Próximo descanso sera longo {state.config.longBreakTime}</span>
    ),
  };
  return (
    <>
      {state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask &&
        tipsNoActiveTask[getNextCycleType(state.currentCycle)]}
    </>
  );
}
