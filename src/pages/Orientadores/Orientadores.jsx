import React, { useState } from "react";
import OrientadorCard from "../../components/OrientadorCard";
import { Users } from "lucide-react";

const Orientadores = () => {
  const [orientadores, setOrientadores] = useState([
    {
      nome: "Ana Carolina",
      qtd_orientandos: 5,
      max_orientandos: 10,
      tot_orientacoes: 18,
      email: "carolsoko@ifba.edu.br",
      formacao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      area_atuacao:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec efficitur est. Phasellus vel nisl sodales ligula hendrerit sagittis. Pellentesque at ipsum eleifend, porttitor quam. ",
    },
    {
      nome: "Neide",
      qtd_orientandos: 2,
      max_orientandos: 3,
      tot_orientacoes: 12,
      email: "neide@ifba.edu.br",
      formacao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      area_atuacao:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec efficitur est. Phasellus vel nisl sodales ligula hendrerit sagittis. Pellentesque at ipsum eleifend, porttitor quam. ",
    },
    {
      nome: "Júlio",
      qtd_orientandos: 4,
      max_orientandos: 6,
      tot_orientacoes: 7,
      email: "julio@ifba.edu.br",
      formacao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      area_atuacao:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec efficitur est. Phasellus vel nisl sodales ligula hendrerit sagittis. Pellentesque at ipsum eleifend, porttitor quam. ",
    },
    {
      nome: "Bulhões",
      qtd_orientandos: 3,
      max_orientandos: 3,
      tot_orientacoes: 22,
      email: "bulhoes@ifba.edu.br",
      formacao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      area_atuacao:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec efficitur est. Phasellus vel nisl sodales ligula hendrerit sagittis. Pellentesque at ipsum eleifend, porttitor quam. ",
    },
    {
      nome: "Rebeca",
      qtd_orientandos: 2,
      max_orientandos: 5,
      tot_orientacoes: 16,
      email: "rebeca@ifba.edu.br",
      formacao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      area_atuacao:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec efficitur est. Phasellus vel nisl sodales ligula hendrerit sagittis. Pellentesque at ipsum eleifend, porttitor quam. ",
    },
  ]);

  return (
    <div className="flex flex-col w-full max-w-7xl px-4">
      <div className="flex flex-row items-center gap-3 pb-[12px] pt-8 px-16">
        <div className="flex w-[40px] h-[40px] items-center justify-center bg-gradient-to-r rounded-md from-teal-500 via-teal-400 to-teal-200">
          <Users className="text-white" size={24} />
        </div>
        <h2 className="text-5xl m-0 self-start text-start font-extrabold bg-gradient-to-r from-cyan-500 to-indigo-600 text-transparent bg-clip-text">
          Orientadores
        </h2>
      </div>
      <p className="text-gray-600 py-4 px-16">
        Lista de orientadores e sua disponibilidade
      </p>

      <div className="ml-8 mt-4 w-full bg-white rounded-lg shadow-sm">
        <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Nome do Orientador
            </h3>
            <h3 className="text-lg font-semibold text-gray-800">
              Disponibilidade
            </h3>
          </div>
        </div>

        <div className="">
          {orientadores.map((orientador, index) => (
            <OrientadorCard key={index} orientador={orientador} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orientadores;
