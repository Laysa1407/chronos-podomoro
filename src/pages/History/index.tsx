import { MainTemplate } from "../../templates/MainTemplate";
import { Container } from "../../componentes/Container";
import { Heading } from "../../componentes/Heading";
import { Button } from "../../componentes/Button";
import { TrashIcon } from "lucide-react";
import styles from "./styles.module.css";
import { useContextTask } from "../../contexts/TaskContext/useTaskCOontext";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks } from "../../utils/sortTasks";
import type { SortTasksOptions } from "../../utils/sortTasks";
import { useEffect, useState } from "react";
import { TaskActionType } from "../../contexts/TaskContext/TaskActions";
import { showFeedback } from "../../adapters/showFeedback";

export function History() {
  const { state, dispatch } = useContextTask();
  const [sortTaskOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: "startDate",
        direction: "desc",
      };
    }
  );

  const hasTask = state.tasks.length > 0;

  function handleSortTasks({ field }: Pick<SortTasksOptions, "field">) {
    const newDirection = sortTaskOptions.direction === "asc" ? "desc" : "asc";

    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTaskOptions.tasks,
        field: field,
      }),
      direction: newDirection,
      field: field,
    });
  }

  function handleResetHistory() {
    showFeedback.dismiss();
    showFeedback.confirm("Tem certeza?", (confirmation) => {
      if (confirmation) {
        dispatch({ type: TaskActionType.RESET_STATE });
      }
    });
  }

  useEffect(() => {
    return () => {
      showFeedback.dismiss();
    };
  }, []);

  useEffect(() => {
    setSortTaskOptions((prevState) => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  useEffect(() => {
    document.title = "Histórico";
  }, []);

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <div className={styles.content}>
            <span>History</span>
            {hasTask && (
              <span className={styles.buttonContainer}>
                <Button
                  color="red"
                  icon={<TrashIcon />}
                  aria-label="Apagar historico"
                  title="Apagar Histórico"
                  onClick={handleResetHistory}
                ></Button>
              </span>
            )}
          </div>
        </Heading>
      </Container>

      {hasTask ? (
        <Container>
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() => handleSortTasks({ field: "name" })}
                    className={styles.thSort}
                  >
                    Tarefa
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: "duration" })}
                    className={styles.thSort}
                  >
                    Duração
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: "startDate" })}
                    className={styles.thSort}
                  >
                    Data
                  </th>
                  <th className={styles.thSort}>Status</th>
                  <th className={styles.thSort}>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortTaskOptions.tasks.map((task) => {
                  const taskTypeDictionary = {
                    workTime: "Foco",
                    shortBreakTime: "Descanso curto",
                    longBreakTime: "Descanso Longo",
                  };
                  return (
                    <tr>
                      <td>{task.name}</td>
                      <td>{task.duration}</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Container>
      ) : (
        <p style={{ textAlign: "center", fontWeight: "Bold", padding: "20px" }}>
          Ainda não há tarefas iniciadas!
        </p>
      )}
    </MainTemplate>
  );
}
