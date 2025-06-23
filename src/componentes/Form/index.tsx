import { DefaultInput } from "../DefaultInput";
import { Cycles } from "../Cycles/Index";
import { Button } from "../Button";
import { PlayCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { TaskModel } from "../../Models/TaskModel";
import { useContextTask } from "../../contexts/TaskContext/useTaskCOontext";
import { getNextCycle, getNextCycleType } from "../../utils/utils";

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
        formattedSecondsRemaining: "00:00", //Implementar
        tasks: [...prev.tasks, newTask],
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
        />
      </div>
      <div className="formRow">
        <p>Próximo intervalo é de 25min</p>
      </div>

      <div className="formRow">
        <Cycles />
      </div>

      <div className="formRow">
        <Button icon={<PlayCircleIcon />} color="green" />
      </div>
    </form>
  );
}
