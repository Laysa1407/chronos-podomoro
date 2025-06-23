import { MainTemplate } from "../../templates/MainTemplate";
import { Container } from "../../componentes/Container";
import { CountDown } from "../../componentes/CountDown";
import { Form } from "../../componentes/Form";

export function Home() {
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
