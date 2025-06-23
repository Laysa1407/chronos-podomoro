import {} from "lucide-react";
import styles from "./styles.module.css";

export const Cycles = () => {
  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>

      <div className={styles.cycleDots}>
        <span className={`${styles.cicleDot} ${styles.workTime}`}></span>
        <span className={`${styles.cicleDot} ${styles.shortBreakTime}`}></span>
        <span className={`${styles.cicleDot} ${styles.workTime}`}></span>
        <span className={`${styles.cicleDot} ${styles.shortBreakTime}`}></span>
        <span className={`${styles.cicleDot} ${styles.workTime}`}></span>
        <span className={`${styles.cicleDot} ${styles.shortBreakTime}`}></span>
        <span className={`${styles.cicleDot} ${styles.workTime}`}></span>
        <span className={`${styles.cicleDot} ${styles.longBreakTime}`}></span>
      </div>
    </div>
  );
};
