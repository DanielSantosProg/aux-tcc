import React, { useState } from "react";
import Comment from "./Comment";
import { NotebookText, ChevronDown, ChevronUp } from "lucide-react";

const Comments = ({ comments }) => {
  const [openGroups, setOpenGroups] = useState({});

  const groupedComments = comments.reduce((acc, comment) => {
    if (!acc[comment.subject]) {
      acc[comment.subject] = [];
    }
    acc[comment.subject].push(comment);
    return acc;
  }, {});

  const subjects = Object.keys(groupedComments).sort();

  const toggleGroup = (subject) => {
    setOpenGroups((prev) => ({
      ...prev,
      [subject]: !prev[subject],
    }));
  };

  return (
    <div className="w-full max-w-4xl min-w-4xl px-8">
      {subjects.length > 0 ? (
        subjects.map((subject) => (
          <div
            key={subject}
            className="mb-6 border-b border-gray-200 last:border-b-0"
          >
            <button
              onClick={() => toggleGroup(subject)}
              className="flex items-center justify-between w-full py-4 px-2 cursor-pointer focus:outline-none"
            >
              <div className="flex items-center">
                <NotebookText className="text-gray-700" size={18} />
                <h4 className="px-2 text-xl font-semibold text-gray-800">
                  {subject}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 font-medium">
                  {groupedComments[subject].length} comentário(s)
                </span>
                {openGroups[subject] ? (
                  <ChevronUp className="text-gray-500 w-5 h-5" />
                ) : (
                  <ChevronDown className="text-gray-500 w-5 h-5" />
                )}
              </div>
            </button>

            {/* Renderiza os comentários apenas se o grupo estiver aberto */}
            {openGroups[subject] && (
              <div className="pb-4 pl-4 transition-all duration-300 ease-in-out">
                {groupedComments[subject].map((comment, index) => (
                  <div key={index} className="w-full">
                    <Comment comment={comment} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Nenhum comentário ainda.</p>
      )}
    </div>
  );
};

export default Comments;
