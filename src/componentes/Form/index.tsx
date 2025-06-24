import { DefaultInput } from "../DefaultInput";
import { Cycles } from "../Cycles/Index";
import { Button } from "../Button";
import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { TaskModel } from "../../Models/TaskModel";
import { useContextTask } from "../../contexts/TaskContext/useTaskCOontext";
import {
  formatSecondsInMinutes,
  getNextCycle,
  getNextCycleType,
} from "../../utils/utils";

export function Form() {
  const [taskName, setTaskName] = useState("");

  const { state, setState } = useContextTask();

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(state.currentCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!taskName.trim()) {
      alert(" informe o nome da tarefa!");
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    const secondsRemaining = newTask.duration * 60;

    setState((prev) => {
      return {
        ...prev,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining, //Implementar
        formattedSecondsRemaining: formatSecondsInMinutes(secondsRemaining), //Implementar
        tasks: [...prev.tasks, newTask],
      };
    });
  }

  function handleInterruptTask(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    setState((prev) => {
      return {
        ...prev,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00", //Implementar
      };
    });
  }

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <form onSubmit={handleCreateNewTask} className="form" action={""}>
      <div className="formRow">
        <DefaultInput
          id="meuInput"
          type="text"
          labelText="task"
          placeholder="Informe o período"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          disabled={!!state.activeTask}
        />
      </div>
      <div className="formRow">
        <p>Próximo intervalo é de 25min</p>
      </div>

      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles />
        </div>
      )}

      <div className="formRow">
        {!state.activeTask ? (
          <Button
            title="Iniciar nova tarefa"
            aria-label="Iniciar nova Tarefa"
            icon={<PlayCircleIcon />}
            color="green"
            type="submit"
            key="button_submit"
          />
        ) : (
          <Button
            onClick={(e) => handleInterruptTask(e)}
            title="Interromper tarefa atual"
            aria-label="Interromper tarefa atual"
            icon={<StopCircleIcon />}
            color="red"
            type="button"
            key="button_button"
          />
        )}
      </div>
    </form>
  );
}
