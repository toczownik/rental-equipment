import React from "react";
import {Container, Image} from "react-bootstrap";

const About = () => {

    const textStyle = {
        textAlign: "center",
        paddingTop: "20px"
    }

  return (
      <Container style={textStyle}>
          <Container style={textStyle}>
              "Wodna Przygoda" to renomowana wypożyczalnia sprzętu wodnego zlokalizowana nad malowniczym jeziorem. Jesteśmy specjalistami od ekscytujących doznań wodnych, oferując szeroką gamę sprzętu, od kajaków i łodzi wiosłowych, po deski do paddleboarding'u i żaglówki. Nasza misja polega na zapewnieniu niezapomnianych chwil na wodzie, niezależnie od doświadczenia i umiejętności naszych klientów.
          </Container>
          <Image src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.OKy5JiobP_W5yWTKMmd4sgHaFj%26pid%3DApi&f=1&ipt=8fdd823ce4e44d3e3811ddf9c7291f8f03d5806f0b8aea2814376a755bb449bd&ipo=images"}/>
          <Container style={textStyle}>
              Zespół "Wodnej Przygody" to pasjonaci sportów wodnych z wieloletnim doświadczeniem, którzy zawsze są gotowi służyć poradą i pomocą. Nasze zaangażowanie w bezpieczeństwo i zadowolenie klienta sprawia, że jesteśmy ulubionym wyborem wśród miłośników wodnych przygód.
          </Container>
          <Image src={"http://1.bp.blogspot.com/-dxvDyHBh7I0/Trkr52Qy5uI/AAAAAAAAGxg/7hrdWrx_vhw/s400/surfboards_044%255B1%255D.jpg"}/>
          <Container style={textStyle}>
              Zapraszamy do "Wodnej Przygody" - miejsca, gdzie na pierwszym miejscu jest przyjemność z przebywania na wodzie i tworzenia niezapomnianych wspomnień.
          </Container>

        <br/>
      </Container>
  );
};

export default About;
