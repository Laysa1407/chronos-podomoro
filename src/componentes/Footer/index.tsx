import styles from "./styles.module.css";
import { CustomLink } from "../CustomLink";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <CustomLink href="/about-pomodoro/">
        Entenda como funciona a técnica pomodoro
      </CustomLink>
      <CustomLink href="/">
        Chronos Pomodoro &copy; {new Date().getFullYear()}
      </CustomLink>
    </footer>
  );
}
