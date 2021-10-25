import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

import "./styles.css";

export function Home() {
  const history = useHistory();

  return (
    <div className="home-container">
      <h1>Thommy Grade</h1>
      <p>
        Bem vindo ao <b>Thommy Grade</b>, seu gerador de grade ideal, nossa
        aplicação tem como intuito facilitar o seu processo de solicitação de
        matérias no início do semestre calculando o melhor encaixe de
        disciplinas disponíveis para você.
        <br />
        <br />
        Basta nos informar o máximo de créditos e quais matérias você tem
        interesse em cursar.
      </p>
      <Button variant="contained" onClick={() => history.push("/materias")}>
        INICIAR
      </Button>
    </div>
  );
}
