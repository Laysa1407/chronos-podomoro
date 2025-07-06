import { TimerIcon } from "lucide-react";
import styles from "./styles.module.css";
import { CustomLink } from "../CustomLink";

export function Logo() {
  return (
    <div className={styles.logo}>
      <CustomLink href="#" className={styles.logoLink}>
        <TimerIcon />
        Chronos
      </CustomLink>
    </div>
  );
}
