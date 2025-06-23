import { useContextTask } from "../../contexts/TaskContext/useTaskCOontext";
import styles from "./styles.module.css";

export function CountDown() {
  const { state } = useContextTask();

  return (
    <div className={styles.countdown}>{state?.formattedSecondsRemaining}</div>
  );
}
