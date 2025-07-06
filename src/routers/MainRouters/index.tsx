import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "../../pages/Home";
import { AboutPomodoro } from "../../pages/AboutPomodoro";
import { useEffect } from "react";
import { History } from "../../pages/History";
import { Settings } from "../../pages/Settings";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}
export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-pomodoro" element={<AboutPomodoro />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}
