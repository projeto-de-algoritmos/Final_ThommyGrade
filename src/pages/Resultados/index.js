import { useState, useEffect } from "react";
import Lottie from "react-lottie";

import { CustomTable } from "../../components/Table";

import animation from "../../assets/lf30_editor_mjtriweb.json";

import {
  getResults,
  buildItems,
  buildNetwork,
  getTimetables,
} from "../../services/algorithms";

import "./styles.css";

export function Resultados(props) {
  const [network, setNet] = useState(null);
  const subjects = props.location.state.selectedSubjects;
  const credits = props.location.state.credits;
  const [items, setItems] = useState([]);
  const [resultRender, setRender] = useState([]);

  useEffect(() => {
    async function getNet() {
      const newNet = await buildNetwork({});
      setNet(newNet);
    }

    getNet();
  }, []);

  useEffect(() => {
    async function getItems() {
      const items = await buildItems([], subjects);
      setItems(items);
    }

    getItems();
  }, [subjects]);

  useEffect(() => {
    if (!items.length) return;
    const results = getResults({}, items, credits);
    let resArr = [];

    for (let result in results) {
      resArr.push({
        subjects: result.match(/.{1,7}/g),
        results: results[result],
      });

      // lógica de armazenamento das rolls vai aqui
    }

    setRender(resArr);
  }, [items, credits]);

  return (
    <div className="resultados-container">
      <h1>Resultados</h1>
      <p>Você queria grade? Então Thommy</p>
      {resultRender.length ? (
        <>
          {resultRender.map((item) => {
            const [rows, classes] = getTimetables(
              items,
              item.results,
              item.subjects
            );
            return (
              <div className="result-item">
                <div className="subjects">
                  <b style={{ marginBottom: "1rem" }}>
                    Matérias Presentes Nestas Grade:
                  </b>
                  {/* Itera dentro do Subjects de cada item do results para mostrar as matérias presentes na grade */}
                  {item.subjects.map((subject) => {
                    return (
                      <p
                        style={{ textAlign: "center", marginBottom: "0.75rem" }}
                      >
                        {`${subject} - ${network[subject].name}`}
                      </p>
                    );
                  })}
                </div>
                <CustomTable rows={rows} classes={classes} />
              </div>
            );
          })}
        </>
      ) : (
        <div className="animation">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animation,
            }}
            height={200}
            width={200}
            loop
          />
        </div>
      )}
    </div>
  );
}
