import React from "react";
import styles from "./styles.module.css";

type PropsContainer = {
  children: React.ReactNode;
};

export function Container({ children }: PropsContainer) {
  return (
    <div className={styles.container}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
