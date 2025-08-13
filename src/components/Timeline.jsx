import { FileUp, MessageSquareMore, Plus, Edit, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import CommentsModal from "./CommentsModal";
import TaskModal from "./TaskModal";
import TaskCrudModal from "./TaskCrudModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

export const Timeline = ({
  tasks,
  comments,
  isOrientando,
  subject,
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete,
  onCommentCreate,
}) => {
  const [modalComments, setModalComments] = useState([]);
  const [title, setTitle] = useState("No Title");
  const [numComments, setNumComments] = useState([]);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);

  // CRUD states
  const [isTaskCrudModalOpen, setIsTaskCrudModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskToSendFile, setTaskToSendFile] = useState(null);

  // State para modal de envio (TaskModal)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) {
      return { day: "", monthYear: "" };
    }

    const datePart = dateString.split("T")[0];

    const [year, month, day] = datePart.split("-").map(Number);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      console.error("Invalid date string:", dateString);
      return { day: "", monthYear: "" };
    }

    // Cria a data no fuso horário local
    const date = new Date(year, month - 1, day);

    const formattedDay = date.getDate().toString();
    const monthYear = date.toLocaleString("pt-BR", {
      month: "long",
      year: "numeric",
    });

    return { day: formattedDay, monthYear };
  };

  const handleSendComment = async (newComment) => {
    await onCommentCreate(newComment);
    updateModalComments();
  };

  const handleComments = (task) => {
    const filtered = comments.filter(
      (comment) => comment.subject === task.title
    );
    setModalComments(filtered);
    setTitle(task.title);
    setCurrentTask(task);
    setIsCommentsModalOpen(true);
  };

  const updateModalComments = () => {
    if (currentTask) {
      const filtered = comments.filter(
        (comment) => comment.subject === currentTask.title
      );
      setModalComments(filtered);
    }
  };

  const setTitleToSendFileModal = (task) => {
    setTaskToSendFile(task);
    setIsTaskModalOpen(true);
  };

  const handleTaskCompleted = (taskId, file, link) => {
    // Encontra a tarefa a ser atualizada
    const taskToUpdate = tasks.find((t) => t.id === taskId);
    if (!taskToUpdate) return;

    // Cria o novo objeto com o status atualizado
    const updatedTaskData = {
      ...taskToUpdate,
      status: "concluida",
    };

    onTaskUpdate(taskToUpdate, updatedTaskData);
  };

  const defNumComments = () => {
    const result = tasks.map((task) => {
      const qtd = comments.filter(
        (comment) => comment.subject === task.title
      ).length;
      return {
        title: task.title,
        qtdComments: qtd,
      };
    });
    setNumComments(result);
  };

  // CRUD handlers
  const handleCreateTask = () => {
    setIsEditMode(false);
    setTaskToEdit(null);
    setIsTaskCrudModalOpen(true);
  };

  const handleEditTask = (task) => {
    setIsEditMode(true);
    setTaskToEdit(task);
    setIsTaskCrudModalOpen(true);
  };

  const handleDeleteTask = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (isEditMode) {
      onTaskUpdate(taskToEdit, taskData);
    } else {
      onTaskCreate(taskData);
    }
  };

  const handleConfirmDelete = () => {
    onTaskDelete(taskToDelete);
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  useEffect(() => {
    defNumComments();
  }, [tasks, comments]);

  return (
    <div className="w-full max-w-4xl px-8">
      {/* Add Task Button */}
      {!isOrientando && subject && (
        <div className="flex justify-end">
          <button
            onClick={handleCreateTask}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Tarefa
          </button>
        </div>
      )}

      <ol className="relative border-s border-gray-200">
        {tasks.map((task, index) => {
          const { day, monthYear } = formatDate(task.dataEntrega);
          return (
            <div key={index} className="w-full">
              <li className="mb-10 ms-4">
                <div className="absolute w-6 h-10 bg-white text-2xl text-gray-600 -start-3.5 border border-white">
                  {day}
                </div>
                <time className="mb-1 ml-2 text-sm text-emerald-500 font-normal leading-none">
                  {monthYear}
                </time>

                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex flex-row gap-6">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {task.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          task.status === "pendente"
                            ? "bg-orange-100 text-gray-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {task.status.charAt(0).toUpperCase() +
                          task.status.slice(1)}
                      </span>
                    </div>
                    <p className="mb-4 text-base font-normal text-gray-500">
                      {task.description}
                    </p>
                  </div>

                  {!isOrientando && (
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Editar tarefa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Excluir tarefa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-2">
                  {task.status === "pendente" && (
                    <button
                      type="button"
                      onClick={() => setTitleToSendFileModal(task)}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-gray-700"
                    >
                      <FileUp
                        className="text-gray-500 mr-2 rtl:rotate-180"
                        size={18}
                      />
                      <span className="text-gray-700">
                        {isOrientando ? "Adicionar Envio" : "Visualizar Envio"}
                      </span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleComments(task)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-gray-700"
                  >
                    <MessageSquareMore
                      className="text-gray-700 relative left-2"
                      size={18}
                    />
                    <div className="flex justify-center items-center relative bottom-2 bg-emerald-200 rounded-full w-4 h-4">
                      <span className="text-gray-700">
                        {numComments.find((n) => n.title === task.title)
                          ?.qtdComments || 0}
                      </span>
                    </div>
                  </button>
                </div>
              </li>
            </div>
          );
        })}
      </ol>

      {/* Modals */}
      <CommentsModal
        comments={modalComments}
        title={title}
        isOpen={isCommentsModalOpen}
        onClose={() => setIsCommentsModalOpen(false)}
        isOrientando={isOrientando}
        onSendComment={handleSendComment}
        onCommentSent={updateModalComments}
      />
      {isTaskModalOpen && taskToSendFile && (
        <TaskModal
          task={taskToSendFile}
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          onTaskCompleted={handleTaskCompleted}
        />
      )}
      <TaskCrudModal
        isOpen={isTaskCrudModalOpen}
        onClose={() => setIsTaskCrudModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
        isEdit={isEditMode}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        taskTitle={taskToDelete?.title || ""}
      />
    </div>
  );
};

export default Timeline;
