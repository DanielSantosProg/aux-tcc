import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Label,
  TextInput,
} from "flowbite-react";
import { Link, CheckCircle2 } from "lucide-react"; // Adicionamos o ícone CheckCircle2

const TaskModal = ({ task, isOpen, onClose, onTaskCompleted }) => {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [linkAttached, setLinkAttached] = useState(false); // Novo estado para o link

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
    // Reseta o estado de 'linkAttached' se o usuário começar a digitar novamente
    setLinkAttached(false);
  };

  const handleAttachLink = () => {
    if (link.trim() !== "") {
      setLinkAttached(true);
    }
  };

  const handleMarkCompleted = () => {
    // Chama a função passada via props para atualizar o status no componente pai
    onTaskCompleted(task.id, file, link);
    onClose();
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="md" popup>
      <ModalHeader className="p-4">{task.title}</ModalHeader>
      <ModalBody>
        <div className="space-y-10">
          <div>
            <Label htmlFor="file_input" value="Anexe o Arquivo" />
            <input
              id="file_input"
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-center w-full relative">
            <hr className="w-full h-px bg-gray-200 border-0" />
            <span className="absolute px-3 font-medium text-gray-900 bg-white left-1/2 -translate-x-1/2">
              ou
            </span>
          </div>

          <div>
            <Label htmlFor="link_input" value="Insira o link" />
            <div className="relative flex flex-row">
              {/* ✅ Botão para anexar o link */}
              <button
                onClick={handleAttachLink}
                className="w-16 h-10 inset-y-0 bg-gray-800 focus:outline-none flex items-center justify-center pl-3 pr-3 rounded-l-sm hover:bg-gray-700"
              >
                <Link className="w-4 h-4 text-white" />
              </button>

              {/* ✅ Renderização condicional do input ou do texto */}
              {linkAttached ? (
                <div className="flex items-center rounded-r-sm w-full text-sm bg-gray-100 pl-4">
                  <CheckCircle2 className="text-emerald-500 mr-2" size={16} />
                  <span className="text-gray-700">Link anexado</span>
                </div>
              ) : (
                <input
                  id="link_input"
                  type="text"
                  placeholder="Cole aqui o Link para o seu arquivo"
                  value={link}
                  onChange={handleLinkChange}
                  className="rounded-r-sm w-2xl text-sm"
                />
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button color="blue" onClick={handleMarkCompleted}>
              Marcar como Concluído
            </Button>
            <Button color="gray" onClick={onClose} outline>
              Cancelar
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default TaskModal;
