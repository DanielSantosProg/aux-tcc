import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Label,
  FileInput,
} from "flowbite-react";
import { Link, CheckCircle2 } from "lucide-react";

const TaskModal = ({
  task,
  isOpen,
  onClose,
  onTaskCompleted,
  isOrientando,
}) => {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [linkAttached, setLinkAttached] = useState(false);
  const [fileAttached, setFileAttached] = useState(false);

  const linkPlaceholder = fileAttached
    ? "Arquivo já anexado."
    : "Cole aqui o Link para o seu arquivo";

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileAttached(true);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
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
        <div className="space-y-6">
          <div>
            <Label
              htmlFor="file-upload"
              className="text-gray-700"
              value="Anexe o Arquivo"
            >
              Anexe o Arquivo
            </Label>
            <FileInput
              id="file-upload"
              className="my-2"
              disabled={linkAttached}
            />
          </div>

          <div className="flex items-center justify-center w-full relative">
            <hr className="w-full h-px bg-gray-200 border-0" />
            <span className="absolute px-3 font-medium text-gray-900 bg-white left-1/2 -translate-x-1/2">
              ou
            </span>
          </div>

          <div>
            <Label
              htmlFor="attach-link"
              className="text-gray-700"
              value="Insira o Link"
            >
              Insira o Link
            </Label>
            <div id="attack-link" className="relative flex flex-row my-2">
              <button
                onClick={handleAttachLink}
                className="w-16 h-10 inset-y-0 bg-gray-800 focus:outline-none flex items-center justify-center pl-3 pr-3 rounded-l-sm hover:bg-gray-700"
              >
                <Link className="w-4 h-4 text-white" />
              </button>

              {linkAttached ? (
                <div className="flex items-center rounded-r-sm w-full text-sm bg-gray-100 pl-4">
                  <CheckCircle2 className="text-emerald-500 mr-2" size={16} />
                  <span className="text-gray-700">Link anexado</span>
                </div>
              ) : (
                <input
                  id="link_input"
                  type="text"
                  placeholder={linkPlaceholder}
                  value={link}
                  onChange={handleLinkChange}
                  disabled={fileAttached}
                  className="rounded-r-sm border-1 border-gray-400 w-2xl text-sm disabled:bg-gray-300"
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
