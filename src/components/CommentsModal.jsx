// src/components/CommentsModal.jsx

import { X } from "lucide-react";
import React, { useState, useEffect } from "react"; // Importe useEffect
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const CommentsModal = ({
  isOpen,
  onClose,
  comments,
  title,
  isOrientando,
  onSendComment,
}) => {
  const [newComment, setNewComment] = useState("");
  const [filteredComments, setFilteredComments] = useState([]); // Novo estado para os comentários filtrados

  // useEffect para filtrar os comentários sempre que a prop "comments" mudar
  useEffect(() => {
    if (comments && title) {
      const filtered = comments.filter((comment) => comment.subject === title);
      setFilteredComments(filtered);
    }
  }, [comments, title]); // Re-executa sempre que "comments" ou "title" mudarem

  if (!isOpen) return null;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    await onSendComment({
      content: newComment,
      subject: title,
    });

    setNewComment("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 my-8">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Comentários da Tarefa: {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-96">
          {filteredComments.length > 0 ? ( // Use a lista filtrada aqui
            filteredComments.map((comment, index) => (
              <div key={index} className="mb-4 p-3 bg-gray-100 rounded-lg">
                <p className="text-sm font-medium text-gray-800">
                  {comment.content}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Por {comment.isOrientando ? "Orientando" : "Orientador"} em{" "}
                  {format(
                    new Date(comment.createdAt),
                    "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                    { locale: ptBR }
                  )}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Nenhum comentário ainda. Seja o primeiro a comentar!
            </p>
          )}
        </div>

        <div className="p-4 border-t">
          <form onSubmit={handleFormSubmit}>
            <textarea
              className="w-full p-2 border rounded-lg resize-none focus:ring-emerald-500 focus:border-emerald-500"
              rows="3"
              placeholder="Digite seu comentário..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 transition-colors"
              >
                Enviar Comentário
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
