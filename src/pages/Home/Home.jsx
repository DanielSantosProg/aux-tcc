import { useState } from "react";
import Accordion from "../../components/Accordion";
import Card from "../../components/Card";
import { GraduationCap } from "lucide-react";

const Home = () => {
  const [accordionData] = useState([
    {
      title: "Como posso me cadastrar no AuxTCC?",
      text: "Para se cadastrar, solicite ao professor da matéria de TCC que seja realizado seu cadastro.",
    },
    {
      title: "Como posso ver as áreas de atuação dos orientadores?",
      text: "Você pode acessar a aba Orientadores para ver as áreas de atuação de cada professor. Clique no orientador desejado e você encontrará informações sobre suas linhas de pesquisa e como entrar em contato.",
    },
    {
      title: "Como iniciar o TCC?",
      text: "Para iniciar seu TCC, você deve escolher um orientador, definir um tema e enviar sua solicitação na página do orientador.",
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
      <div className="flex flex-row self-start items-center gap-3 pb-[12px] pt-8 px-16">
        <div className="flex w-[40px] h-[40px] items-center justify-center bg-gradient-to-r rounded-md from-teal-500 via-teal-400 to-teal-200">
          <GraduationCap className="text-white" size={24} />
        </div>
        <h2 className="text-5xl m-0 self-start text-start font-extrabold bg-gradient-to-r from-cyan-500 to-indigo-600 text-transparent bg-clip-text">
          Bem Vindo ao portal de auxílio ao TCC.
        </h2>
      </div>
      <div className="max-w-5xl self-start">
        <p className="px-16 pb-16 text-xl text-black self-start">
          Um projeto que busca unir Orientadores e alunos no processo de
          desenvolvimento do Trabalho de Conclusão de Curso do BSI de Feira de
          Santana.
        </p>
      </div>
      <div className="flex flex-row gap-4 self-center w-full px-16">
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
