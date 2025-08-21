import React from "react";
import { UserPen } from "lucide-react";
import { Link } from "react-router-dom";

const OrientadorCard = ({ orientador }) => {
  if (!orientador || !orientador.name) {
    return null;
  }

  const nome = encodeURIComponent(orientador.name);
  const qtdOrientandos = orientador.qtd_orientandos ?? "...";
  const maxOrientandos = orientador.max_orientandos ?? "...";
  const isAvailable = orientador.qtd_orientandos < orientador.max_orientandos;

  return (
    <>
      <div className="flex flex-row w-full">
        <Link
          to={`/orientador/${nome}`}
          type="button"
          className="flex items-center justify-between w-full py-5 font-medium text-gray-500 border-b border-gray-200 gap-3 hover:bg-gray-50 transition-colors"
        >
          <span className="pl-6 text-blue-600">{orientador.name}</span>
          <div className="flex flex-row items-center">
            <UserPen
              className={isAvailable ? "text-gray-500" : "text-red-500"}
              size={18}
            />
            <p
              className={`mx-2 pr-6 ${
                isAvailable ? "text-blue-600" : "text-red-500"
              }`}
            >
              {qtdOrientandos}/{maxOrientandos}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default OrientadorCard;
