import { DefaultInput } from "../DefaultInput";
import { Cycles } from "../Cycles/Index";
import { Button } from "../Button";
import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { useState } from "react";
import type { TaskModel } from "../../Models/TaskModel";
import { useContextTask } from "../../contexts/TaskContext/useTaskCOontext";
import { getNextCycle, getNextCycleType } from "../../utils/utils";
import { TaskActionType } from "../../contexts/TaskContext/TaskActions";
import { Tips } from "../Tipe";
import { showFeedback } from "../../adapters/showFeedback";

export function Form() {
  const [taskName, setTaskName] = useState("");

  const { state, dispatch } = useContextTask();
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || "";

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!taskName.trim()) {
      showFeedback.warning(" informe o nome da tarefa!");
      return;
    }

    console.log(state.config);
    console.log(state.config[nextCycleType], "NEXT CICLE TIPE");

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({ type: TaskActionType.START_TASK, payload: newTask });
  }

  function handleInterruptTask(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    showFeedback.warn("Tarefa interrompida!");
    dispatch({ type: TaskActionType.INTERRUPT_TASK });
  }

  return (
    <form onSubmit={handleCreateNewTask} className="form" action={""}>
      <div className="formRow">
        <DefaultInput
          id="meuInput"
          type="text"
          labelText="task"
          placeholder="Nome da tarefa"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
        />
      </div>
      <div className="formRow">
        <Tips />
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
