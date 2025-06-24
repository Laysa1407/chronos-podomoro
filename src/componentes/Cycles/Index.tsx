import {} from "lucide-react";
import styles from "./styles.module.css";
import { useContextTask } from "../../contexts/TaskContext/useTaskCOontext";
import { getNextCycle, getNextCycleType } from "../../utils/utils";

export const Cycles = () => {
  const { state } = useContextTask();
  const cycleStep = Array.from({ length: state.currentCycle });
  const cicleDescriptionMap = {
    workTime: "foco",
    shortBreakTime: "descanso curto",
    longBreakTime: "descanso longo",
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>

      <div className={styles.cycleDots}>
        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);
          return (
            <span
              key={index}
              className={`${styles.cicleDot} ${styles[nextCycleType]}`}
              aria-label={`Indicador do ciclo de ${cicleDescriptionMap}`}
              title={`Indicador de ciclo de ${cicleDescriptionMap}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
};
