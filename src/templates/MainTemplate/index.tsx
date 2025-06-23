import { Container } from "../../componentes/Container";
import { Footer } from "../../componentes/Footer";
import { Logo } from "../../componentes/Logo";
import { Menu } from "../../componentes/Menu";

type MainTemplateProps = {
  children: React.ReactNode;
};

export function MainTemplate({ children }: MainTemplateProps) {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      {children}

      <Container>
        <Footer />
      </Container>
    </>
  );
}
