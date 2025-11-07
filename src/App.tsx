import { useState } from "react";
import "./App.css";
import curriculo from "./Curriculo/curriculo.json";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";


function App() {
  const [cardCurriculoVisible, setCardCurriculoVisible] = useState(false);
  const [cardCurriculoSelecionado, setCurriculoSelecionado] = useState(0);

 function libIcone(lib:string){
  switch(lib){
    case 'ai':
    return AiIcons;
    case 'bi':
    return BiIcons;
   default:
    return AiIcons;
  }
 }

  return (
    <>
      {console.log(cardCurriculoVisible)}
      <div className="container-principal">
        <div className="container-lateral">
          <div className="container-perfil">
            <h1 className="nome-usuario">{curriculo.nome}</h1>
            <img
              className="imagem-perfil"
              src={`data:image/jpeg;base64,${curriculo.foto_perfil}`}
            />
          </div>
          <div className="componente-linguagens">
          {curriculo.linguagens.map((e,index) => {
           const ic = libIcone(e.tipo) as Record<string, React.ComponentType<{ size?: number; color?: string ;}>>;
           const Icone = ic[e.icone];
           return Icone ? ( <Icone key={index} size={30} color="#ffff"/> ) : (null);
          })}
          </div>
          <div className="container-redes">
          {curriculo.redes_sociais.map((e) => {
            const Icone = AiIcons[e.icone as keyof typeof AiIcons];
            return (
              <div
                className="componente-redes"
                key={e.nome}
                onClick={() => window.open(e.link, "_blank")}
              >
                <Icone size={e["icone-tamanho"]} color={e["icone-cor"]} />
                <h2 className="nome-redes">{e.nome}</h2>
              </div>
            );
          })}
          </div>
        </div>

        <div className="container-curriculo">
          {curriculo.experiencias.map((e, index) => (
            <div
              className="componente-emprego"
              key={index}
              onClick={() => {
                setCardCurriculoVisible(true);
                setCurriculoSelecionado(index);
              }}
            >
              <img
                className="imagem-emprego"
                src={`data:image/jpeg;base64,${e.logo}`}
              />
            </div>
          ))}
          {cardCurriculoVisible && (
            <div className="componente-curriculo">
              <div className="container-fechar">
                <input
                  type="button"
                  className="btn-fechar"
                  value={"X"}
                  onClick={() => {
                    setCardCurriculoVisible(false);
                  }}
                ></input>
              </div>
              <h1>
                {curriculo.experiencias[cardCurriculoSelecionado].empresa}
              </h1>
              <div>
                <p>
                  data inicio{" "}
                  {
                    curriculo.experiencias[cardCurriculoSelecionado][
                      "data-inicio"
                    ]
                  }
                </p>
                {curriculo.experiencias[cardCurriculoSelecionado][
                  "data-fim"
                ] !== "" && (
                  <div>
                    <p>
                      data fim{" "}
                      {
                        curriculo.experiencias[cardCurriculoSelecionado][
                          "data-fim"
                        ]
                      }
                    </p>
                    <p>perído: 123</p>
                  </div>
                )}
                <hr />
              </div>
              <p>
                {curriculo.experiencias[cardCurriculoSelecionado].descricao}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
