import gravitacionalBeep from "../assets/audios/gravitational_beep.mp3";

export function loadBeep() {
  const audio = new Audio(gravitacionalBeep);
  audio.load();

  return () => {
    audio.currentTime = 0;
    audio.play().catch((err) => console.log("Erro ao tocar áudio", err));
  };
}
