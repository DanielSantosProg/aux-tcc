// src/components/TaskCrudModal.jsx
import React, { useState, useEffect } from "react";
import { X, FileText } from "lucide-react";

const TaskCrudModal = ({
  isOpen,
  onClose,
  onSave,
  taskToEdit = null,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dataEntrega: "",
    id: null,
    orientando_id: "",
  });

  useEffect(() => {
    if (isEdit && taskToEdit) {
      // ✅ Formata a data para 'YYYY-MM-DD' para o input type="date"
      const dataEntregaFormatada = taskToEdit.dataEntrega
        ? new Date(taskToEdit.dataEntrega).toISOString().split("T")[0]
        : "";

      setFormData({
        title: taskToEdit.title || "",
        description: taskToEdit.description || "",
        dataEntrega: dataEntregaFormatada,
        id: taskToEdit.id || null,
        orientando_id: taskToEdit.orientando_id || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        dataEntrega: "",
        id: null,
        orientando_id: "",
      });
    }
  }, [isEdit, taskToEdit, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.dataEntrega.trim()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-500" />
            {isEdit ? "Editar Tarefa" : "Nova Tarefa"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Título da Tarefa
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Digite o título da tarefa"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Descreva a tarefa"
              required
            />
          </div>

          <div>
            <label
              htmlFor="dataEntrega"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Data de Entrega
            </label>
            <input
              type="date"
              id="dataEntrega"
              name="dataEntrega"
              value={formData.dataEntrega}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              {isEdit ? "Salvar Alterações" : "Criar Tarefa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskCrudModal;
