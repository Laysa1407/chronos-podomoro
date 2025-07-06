import { MainTemplate } from "../../templates/MainTemplate";
import { Container } from "../../componentes/Container";
import { CountDown } from "../../componentes/CountDown";
import { Form } from "../../componentes/Form";
import { useEffect } from "react";

export function Home() {
  useEffect(() => {
    document.title = "Chronos pomodoro";
  }, []);

  return (
    <MainTemplate>
      <Container>
        <CountDown />
      </Container>

      <Container>
        <Form />
      </Container>
    </MainTemplate>
  );
}
