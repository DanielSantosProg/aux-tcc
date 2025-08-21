import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";
import { User, BookOpen, Send } from "lucide-react";
import { apiFetch } from "../api/http";

const SolicitarOrientacaoModal = ({ user, orientador, onClose, show }) => {
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user || !orientador) return null;

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("pt-BR");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const solicitacao = {
      orientando_id: user.id,
      orientador_id: orientador.id,
      temaTCC: titulo,
      descricao: mensagem,
    };

    try {
      const data = await apiFetch(
        `${import.meta.env.VITE_API_BASE}/api/solicitacoes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(solicitacao),
        }
      );

      console.log("Solicitação enviada com sucesso:", data);
      alert("Solicitação enviada com sucesso!");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Erro ao enviar solicitação:", error);
      alert(`Erro ao enviar solicitação: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} size="3xl" popup onClose={onClose}>
      <ModalHeader>Solicitar Orientação</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados do aluno */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-500" />
              Suas Informações
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
              <div>
                <span className="font-medium text-gray-700">Nome:</span>{" "}
                {user.name}
              </div>
              <div>
                <span className="font-medium text-gray-700">Email:</span>{" "}
                {user.email}
              </div>
              <div>
                <span className="font-medium text-gray-700">Data:</span>{" "}
                {getCurrentDate()}
              </div>
              <div>
                <span className="font-medium text-gray-700">Orientador:</span>{" "}
                {orientador.name}
              </div>
            </div>
          </div>

          {/* Detalhes da solicitação */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-500" />
              Detalhes da Solicitação
            </h4>

            <div>
              <Label htmlFor="titulo" value="Título/Tema do TCC *" />
              <TextInput
                id="titulo"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Sistema de Gestão Acadêmica com React"
                required
              />
            </div>

            <div>
              <Label htmlFor="mensagem" value="Descrição/Mensagem *" />
              <Textarea
                id="mensagem"
                rows={4}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Descreva seu projeto, objetivos e por que gostaria desta orientação..."
                required
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button color="gray" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              color="green"
              disabled={isSubmitting || !titulo.trim() || !mensagem.trim()}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Enviar Solicitação
                </>
              )}
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default SolicitarOrientacaoModal;
