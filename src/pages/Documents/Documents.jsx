import React, { useState } from "react";
import DocumentsTabs from "../../components/DocumentsTabs";
import { FileText } from "lucide-react";

const Documents = () => {
  const [userLogin, setUserLogin] = useState(true);

  return (
    <div className="flex flex-col w-full max-w-7xl px-4">
      <div className="flex flex-row items-center gap-3 pb-[12px] pt-8 px-16">
        <div className="flex w-[40px] h-[40px] items-center justify-center bg-gradient-to-r rounded-md from-teal-500 via-teal-400 to-teal-200">
          <FileText className="text-white" size={24} />
        </div>
        <h2 className="text-5xl m-0 self-start text-start font-extrabold bg-gradient-to-r from-cyan-500 to-indigo-600 text-transparent bg-clip-text">
          Documentos
        </h2>
      </div>
      <p className="text-gray-600 py-4 px-16">
        Faça o download de documentos importantes ou faça suas entregas.
      </p>
      <DocumentsTabs UserLoggedIn={userLogin} />
    </div>
  );
};

export default Documents;
