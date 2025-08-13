import { useState } from "react";
import Accordion from "../../components/Accordion";
import Card from "../../components/Card";

const Home = () => {
  const [accordionData] = useState([
    {
      title: "Como iniciar o TCC?",
      text: "Para iniciar seu TCC, você deve escolher um orientador, definir um tema, entrar em contato com um orientador, preencher e enviar a Carta de Aceite (disponível na aba de Documentos) para o orientador escolhido.",
    },
    {
      title: "Quais os prazos importantes?",
      text: "Os prazos variam por semestre, mas geralmente incluem: envio da proposta, entrega parcial, e apresentação final. Verifique a aba de Documentos para o calendário oficial.",
    },
    {
      title: "Como escolher um orientador?",
      text: "Consulte a aba Orientadores, veja as linhas de pesquisa de cada professor e entre em contato com aquele que mais se encaixa no seu tema de interesse.",
    },
  ]);

  return (
    <div className="flex overflow-y-auto flex-col items-center w-full bg-white">
      <h1 className="text-5xl m-0 self-start text-start font-extrabold text-emerald-500 py-8 px-16">
        Bem Vindo ao portal de auxílio ao TCC.
      </h1>
      <p className="px-16 pb-16 text-2xl text-black self-start">
        Um projeto que busca unir Orientadores e alunos no processo de
        desenvolvimento do Trabalho de Conclusão de Curso do BSI de Feira de
        Santana.
      </p>
      <div className="flex flex-row justify-evenly w-full">
        <Card
          title="Documentação"
          page="documentos"
          text="Tenha acesso a diferentes documentos relevantes para o seu TCC."
        />
        <Card
          title="Orientadores"
          page="orientadores"
          text="Conheça os orientadores do curso e inicie sua proposta de projeto."
        />
        <Card
          title="Progresso"
          page="progresso"
          text="Acesse a sua Timeline e dê continuidade no seu TCC."
        />
      </div>
      <div className="w-2/3 my-16 mx-16 self-start">
        <h2 className="text-2xl my-2 font-bold text-black">
          Perguntas Frequentes:
        </h2>
        <Accordion items={accordionData} />
      </div>
    </div>
  );
};

export default Home;
