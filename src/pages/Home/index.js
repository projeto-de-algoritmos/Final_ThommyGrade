import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

import "./styles.css";

export function Home() {
    const history = useHistory();

  return (
    <div className="home-container">
      <h1>Home Page</h1>
      <p>
        Bem vindo ao <b>gerador de grade ideal</b>, nossa plataforma tem como intuito
        facilitar o seu processo de solicitação de matérias no início do
        semestre calculando o melhor encaixe de disciplinas disponíveis para
        você.
        <br />
        <br />
        Basta nos informar a quantidade de créditos que deseja cursar este
        semestre e quais matérias você já cursou do seu curso.
      </p>
      <Button variant="contained" onClick={() => history.push("/materias")}>
        INICIAR
      </Button>
    </div>
  );
}
