import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader, Button, Label, TextInput } from 'flowbite-react';
import { Link } from 'lucide-react';

const TaskModal = ({ title, isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleMarkCompleted = () => {
    // Aqui você pode tratar o envio do arquivo ou link
    console.log('Arquivo:', file);
    console.log('Link:', link);
    onClose();
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="md" popup>
      <ModalHeader className='p-4'>{title}</ModalHeader>
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
                <a href="#" className='w-16 h-10 inset-y-0 bg-black focus:outline-none flex items-center pl-3 rounded-l-sm hover:bg-gray-700'>
                    <Link className="w-4 h-4 text-white" />
                </a>
              
              <input 
                id="link_input"
                type="text"
                placeholder="Cole aqui o Link para o seu arquivo"
                value={link}
                onChange={handleLinkChange}
                className='rounded-r-sm w-2xl text-sm'
              />
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
