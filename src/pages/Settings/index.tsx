import { MainTemplate } from "../../templates/MainTemplate";
import { Container } from "../../componentes/Container";
import { Heading } from "../../componentes/Heading";
import { Button } from "../../componentes/Button";
import { DefaultInput } from "../../componentes/DefaultInput";
import { Save } from "lucide-react";
import type React from "react";
import { useEffect, useRef } from "react";
import { useContextTask } from "../../contexts/TaskContext/useTaskCOontext";
import { showFeedback } from "../../adapters/showFeedback";
import { TaskActionType } from "../../contexts/TaskContext/TaskActions";

export function Settings() {
  const { state, dispatch } = useContextTask();

  const workTimeInputRef = useRef<HTMLInputElement>(null);
  const shortBreakInputRef = useRef<HTMLInputElement>(null);
  const LongBreakInputRef = useRef<HTMLInputElement>(null);

  function HandleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showFeedback.dismiss();
    const worktime = Number(workTimeInputRef.current?.value);
    const shortBreakTime = Number(shortBreakInputRef.current?.value);
    const longBreakTime = Number(LongBreakInputRef.current?.value);
    if (isNaN(worktime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      showFeedback.error("Digite apenas numeros para todos os campos!");
    }

    if (worktime < 1 || worktime > 99) {
      showFeedback.info(
        "Para um melhor aproveitamento informe um tempo entre 1 e 99 minutos!"
      );
    }

    if (shortBreakTime < 1 || shortBreakTime >= 30) {
      showFeedback.info(
        "Para um melhor aproveitamento informe um tempo entre 1 e 30 minutos de decanso curto!"
      );
    }
    if (longBreakTime < 1 || longBreakTime >= 60) {
      showFeedback.info(
        "Para um melhor aproveitamento informe um tempo entre 1 e 60 minutos de descanso longo!"
      );
    }
    dispatch({
      type: TaskActionType.CHANGE_SETTINGS,
      payload: {
        workTime: worktime,
        shortBreakTime,
        longBreakTime,
      },
    });
    showFeedback.sucess("Configurações salvas");
  }

  useEffect(() => {
    document.title = "Configuracões- Chronos pomodoro";
  }, []);

  return (
    <MainTemplate>
      <Heading>Configurações</Heading>

      <Container>
        <p style={{ textAlign: "center" }}>
          Modifique as configurações para tempo de foco , descanso e descanso
          longo
        </p>
      </Container>

      <Container>
        <form onSubmit={HandleSaveSettings} className="form">
          <div className="formRow">
            <DefaultInput
              id="worktime"
              labelText="Foco"
              ref={workTimeInputRef}
              defaultValue={state.config.workTime}
              type="number"
            />
            <DefaultInput
              id="shortBreakTime"
              labelText="Descanso Curto"
              ref={shortBreakInputRef}
              defaultValue={state.config.shortBreakTime}
              type="number"
            />
            <DefaultInput
              id="longBreakTime"
              labelText="Descanso Longo"
              ref={LongBreakInputRef}
              defaultValue={state.config.longBreakTime}
              type="number"
            />
            <Button icon={<Save />} />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
