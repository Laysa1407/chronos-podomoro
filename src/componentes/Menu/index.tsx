import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from "lucide-react";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { CustomLink } from "../CustomLink";

type Themes = "dark" | "light";

export function Menu() {
  const [theme, setTheme] = useState<Themes>(() => {
    const storageTheme = (localStorage.getItem("theme") as Themes) || "dark";
    return storageTheme;
  });

  const handleClickToggleTheme = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    setTheme((prevState) => {
      return prevState === "dark" ? "light" : "dark";
    });
  };

  const nextTimeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <CustomLink
        href="/"
        className={styles.menuLink}
        aria-label="Ir para a Home"
        title="Ir para a Home"
      >
        <HouseIcon />
      </CustomLink>
      <CustomLink
        href="/history/"
        className={styles.menuLink}
        aria-label="Ver histórico"
        title="Ver Histórico"
      >
        <HistoryIcon />
      </CustomLink>
      <CustomLink
        href="/settings/"
        className={styles.menuLink}
        aria-label="Configurações"
        title="Configurações"
      >
        <SettingsIcon />
      </CustomLink>
      <CustomLink
        href="#"
        className={styles.menuLink}
        aria-label="Mudar Tema"
        title="Mudar Tema"
        onClick={handleClickToggleTheme}
      >
        {nextTimeIcon[theme]}
      </CustomLink>
    </nav>
  );
}
