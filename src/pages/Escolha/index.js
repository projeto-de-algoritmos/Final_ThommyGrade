import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { buildNetwork } from "../../services/algorithms";

import "./styles.css";

export function Escolha(props) {
  const history = useHistory();
  const [network, setNet] = useState({});
  const options = props.location.state.options;
  const [selectedSubjects, setSelectedSubjects] = useState(options);
  const [credits, setCredits] = useState(2);

  function handleChange(isChecked, code) {
    if (isChecked) {
      setSelectedSubjects([...selectedSubjects, code]);
      return;
    }

    const updatedSubjects = selectedSubjects.filter((item) => item !== code);

    setSelectedSubjects(updatedSubjects);
  }

  useEffect(() => {
    async function getNet() {
      const newNet = await buildNetwork({});
      setNet(newNet);
    }

    getNet();
  }, []);

  return (
    <div className="escolhas-container">
      <h3>
        Selecione as Matérias que Deseja Cursar e a Quantidade de Créditos
      </h3>
      <Paper style={{ padding: 20, marginBottom: "2.5rem" }}>
        <FormGroup>
          {options.map((item) => {
            return (
              <FormControlLabel
                key={item}
                control={<Checkbox defaultChecked />}
                label={network[item] ? network[item].name : item}
                onChange={({ target }) => handleChange(target.checked, item)}
              />
            );
          })}
        </FormGroup>
      </Paper>
      <TextField
        id="outlined-number"
        label="Máximo de Créditos"
        placeholder="Máx. de Créditos"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ min: 2, max: 32 }}
        onChange={({ target }) => setCredits(target.value)}
      />
      <Button
        variant="contained"
        style={{ marginTop: "2rem" }}
        onClick={() =>
          history.push("/resultados", {
            credits,
            selectedSubjects,
          })
        }
      >
        GERAR GRADES
      </Button>
    </div>
  );
}
