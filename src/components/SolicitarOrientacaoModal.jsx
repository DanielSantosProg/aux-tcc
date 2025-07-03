
import React, { useState } from 'react'
import { Calendar, User, BookOpen, Mail, Send } from 'lucide-react'

const SolicitarOrientacaoModal = ({ user, orientador, onClose }) => {
  const [titulo, setTitulo] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!user || !orientador) return null

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('pt-BR')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const solicitacao = {
      id: Date.now(),
      nomeEstudante: user.name,
      emailEstudante: user.email,
      orientadorEmail: orientador.email,
      orientadorNome: orientador.nome,
      temaTCC: titulo,
      descricao: mensagem,
      dataSolicitacao: getCurrentDate(),
      status: 'Pendente'
    };
  
    try {
      const response = await fetch('http://localhost:8000/solicitacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(solicitacao)
      });
  
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Solicitação enviada com sucesso:', data);
  
      alert('Solicitação enviada com sucesso!');
      onClose();
  
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
      alert('Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div>        
      <div id="solicitar-orientacao-modal" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-3xl max-h-full">
          <div className="relative bg-white rounded-lg shadow-lg border border-gray-200">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-emerald-500" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Solicitar Orientação
                </h3>
              </div>
              <button 
                type="button" 
                className="text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center transition-colors" 
                data-modal-hide="solicitar-orientacao-modal"
                onClick={onClose}
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            
            {/* Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              
              {/* Student Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-500" />
                  Suas Informações
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Nome:</span>
                    <span className="text-gray-600">{user.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Email:</span>
                    <span className="text-gray-600">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Data:</span>
                    <span className="text-gray-600">{getCurrentDate()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Orientador:</span>
                    <span className="text-gray-600">{orientador.nome}</span>
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="border-t border-gray-200"></div>

              {/* Request Form */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-500" />
                  Detalhes da Solicitação
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
                      Título/Tema do TCC *
                    </label>
                    <input
                      type="text"
                      id="titulo"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Ex: Sistema de Gestão Acadêmica com React"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição/Mensagem *
                    </label>
                    <textarea
                      id="mensagem"
                      rows="4"
                      value={mensagem}
                      onChange={(e) => setMensagem(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                      placeholder="Descreva seu projeto, objetivos e por que gostaria desta orientação..."
                      required
                    />
                  </div>
                </div>
              </div>
            </form>
            
            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button 
                data-modal-hide="solicitar-orientacao-modal" 
                type="button" 
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-colors"
              >
                Cancelar
              </button>
              
              <button 
                type="submit"
                form="solicitar-orientacao-form"
                disabled={isSubmitting || !titulo.trim() || !mensagem.trim()}
                onClick={handleSubmit}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SolicitarOrientacaoModal
