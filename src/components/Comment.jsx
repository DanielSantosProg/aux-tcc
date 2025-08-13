// src/components/Comment.jsx

import { ClipboardCopy, User, UserCheck } from "lucide-react";
import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Comment = ({ comment }) => {
  // Se o comentário não existir, não renderiza nada
  if (!comment) {
    return null;
  }

  const { content, isOrientando, createdAt, subject } = comment;

  // Determina o nome do autor do comentário
  const authorName = isOrientando ? "Orientando" : "Orientador";

  // Formata a data de criação
  const formattedDate = format(
    new Date(createdAt),
    "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
    { locale: ptBR }
  );

  return (
    <div className="w-full py-4">
      <div className="flex items-start gap-2.5">
        {isOrientando ? (
          <User className="mt-1" />
        ) : (
          <UserCheck className="mt-1" />
        )}

        <div className="flex flex-col w-full max-w-2xl leading-1.5 p-2 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900">
              {authorName}
            </span>
            <span className="text-sm font-normal text-gray-500">
              {formattedDate}
            </span>
          </div>
          <p className="text-sm font-normal py-2.5 text-gray-900">{content}</p>
        </div>
        <a
          href={`/progresso#${subject}`}
          className="py-2"
          title={`Ir para a atividade "${subject}"`}
        >
          <ClipboardCopy className="text-gray-700" size={22} />
        </a>
      </div>
    </div>
  );
};

export default Comment;
