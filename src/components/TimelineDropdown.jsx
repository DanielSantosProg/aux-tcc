import React, { useState, useEffect } from "react";

const TimelineDropdown = ({
  orientandos,
  selectedOrientando,
  onSelectOrientando,
}) => {
  const buttonLabel =
    selectedOrientando?.orientando_nome || "Selecione o orientando";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const orientandosList = orientandos || [];

  const handleSelect = (orientando) => {
    setDropdownOpen(false);
    if (onSelectOrientando) {
      // Chama a função onSelectOrientando com o objeto do orientando
      onSelectOrientando(orientando);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen((open) => !open)}
        className="text-emerald-500 bg-gray-50 hover:bg-gray-300 focus:ring-2 focus:outline-none font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        {buttonLabel}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {dropdownOpen && (
        <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 mt-2">
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownDefaultButton"
          >
            {orientandosList.length > 0 ? (
              orientandosList.map((orientando) => (
                <li key={orientando.orientando_id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(orientando)}
                    className="w-full text-left block px-4 py-2 hover:bg-gray-100"
                  >
                    {orientando.orientando_nome}
                  </button>
                </li>
              ))
            ) : (
              <li>
                <span className="block px-4 py-2 text-gray-400">
                  Nenhum orientando
                </span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TimelineDropdown;
