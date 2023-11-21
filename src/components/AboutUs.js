import { Box, Spacer, Flex, Container } from "@chakra-ui/react";
import React from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Calendar from "./CalenderComponent";
function Home() {
  return (
    <Box>
      <Header title={"Sobre Nós"} />
      <Container fontFamily={"Arial"} fontWeight={"bold"} mt={20}>
        Bem-vindo à nossa Farmácia Escola, um espaço dinâmico onde a excelência
        acadêmica se une ao compromisso comunitário. Estabelecida como um farol
        de conhecimento e serviço, nossa instituição é o epicentro onde a teoria
        se encontra com a prática para moldar os futuros farmacêuticos e
        promover a saúde em nossa comunidade. Nossa missão é dual: impulsionar o
        aprendizado dos estudantes de farmácia e promover o bem-estar da
        comunidade que servimos. Como uma extensão vital do currículo acadêmico,
        proporcionamos aos estudantes a oportunidade de aplicar suas habilidades
        em um ambiente real. Aqui, eles são desafiados a crescer, aprendendo a
        traduzir a teoria em ações tangíveis que fazem a diferença na vida das
        pessoas. Ao colaborar estreitamente com profissionais experientes e
        capacitados, os alunos têm a chance de aprimorar não apenas suas
        habilidades técnicas, mas também desenvolver competências interpessoais
        e de gestão. Acreditamos que a farmácia vai além do simples ato de
        dispensar medicamentos; é um espaço de cuidado, aconselhamento e
        educação, no qual nossos futuros farmacêuticos aprendem a ser agentes de
        mudança e apoio para a comunidade. Além disso, nossa farmácia escola é
        um ponto de referência para a comunidade local. Oferecemos uma gama de
        serviços de saúde acessíveis e de qualidade, promovendo a
        conscientização sobre o uso responsável de medicamentos, saúde
        preventiva e programas de educação para pacientes. Estamos comprometidos
        em ser um recurso confiável, apoiando e capacitando todos aqueles que
        buscam orientação e cuidado. Cada interação, cada conselho e cada passo
        dado em nossa farmácia escola é impulsionado pela dedicação aos mais
        altos padrões éticos e à busca incansável pela melhoria contínua. Nós,
        na Farmácia Escola, acreditamos no poder da educação, da compaixão e da
        inovação para transformar vidas e comunidades.
      </Container>
      <Footer />
    </Box>
  );
}

export default Home;
