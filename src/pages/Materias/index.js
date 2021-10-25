import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

import { TransferList } from "../../components/TransferList";

import "./styles.css";

export function Materias() {
  const history = useHistory();
  const [finalOptions, setFinalOptions] = useState([]);

  useEffect(() => {
    console.log(finalOptions);
  }, [finalOptions])

  return (
    <div className="materias-container">
      <h1>Selecionar Matérias</h1>
      <p>
        Abaixo você pode ver uma lista de matérias para serem selecionadas, para
        nos informar as matérias que já cursou basta transferir esta para a
        direita.
      </p>
      <TransferList setFinalOptions={setFinalOptions} />
      <Button variant="contained" onClick={() => history.push("/escolha", { options: finalOptions })}>
        PRÓXIMO
      </Button>
    </div>
  );
}
