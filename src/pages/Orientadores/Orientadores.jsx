import React, { useState, useEffect } from "react";
import OrientadorCard from "../../components/OrientadorCard";
import { Users } from "lucide-react";

const Orientadores = ({ data }) => {
  const [orientadores, setOrientadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrientadores = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE}/api/users/orientadores`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar dados dos orientadores");
        }
        const data = await response.json();
        setOrientadores(data);
        console.log("Data: ", data);
        console.log("Orientadores: ", orientadores);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrientadores();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col w-full max-w-7xl px-4">
        <p className="py-4 px-16 text-center">Carregando orientadores...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col w-full max-w-7xl px-4">
        <p className="py-4 px-16 text-center text-red-500">Erro: {error}</p>
      </div>
    );
  }

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
          {orientadores.length > 0 ? (
            orientadores.map((orientador) => (
              <div
                key={orientador.id}
                onClick={() =>
                  navigate(
                    `/orientador/${encodeURIComponent(orientador.name)}`,
                    {
                      state: { orientador },
                    }
                  )
                }
                className="cursor-pointer"
              >
                <OrientadorCard orientador={orientador} />
              </div>
            ))
          ) : (
            <p className="py-4 px-16 text-center text-gray-500">
              Nenhum orientador encontrado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orientadores;
