import { BookOpen, User, Mail, Calendar } from 'lucide-react'
import React from 'react'

const SolicitacaoModal = ({ solicitacao, aberto, onClose }) => {
  if (!aberto || !solicitacao) return null

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800'
      case 'aprovada':
        return 'bg-green-100 text-green-800'
      case 'rejeitada':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  return (
    <>
      {/* Container do modal com fundo escuro translúcido leve */}
      <div
        id="solicitacao-modal"
        tabIndex="-1"
        aria-hidden={!aberto}
        className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }} // fundo preto com 15% de opacidade
        onClick={onClose} // fecha modal ao clicar fora do conteúdo
      >
        {/* Conteúdo do modal */}
        <div
          className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full p-6"
          onClick={(e) => e.stopPropagation()} // evita fechar ao clicar dentro do modal
        >
          {/* Cabeçalho */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-emerald-500" />
              <h3 className="text-xl font-semibold text-gray-900">Solicitação de Orientação</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-900 rounded-lg"
              aria-label="Fechar modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Status */}
          <div className="mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                solicitacao.status
              )}`}
            >
              {solicitacao.status.charAt(0).toUpperCase() + solicitacao.status.slice(1)}
            </span>
          </div>

          {/* Informações do Estudante */}
          <div className="space-y-4 mb-6">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-500" />
              Informações do Estudante
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Nome:</span>
                <span className="text-gray-600">{solicitacao.nomeEstudante || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-700">Email:</span>
                <span className="text-gray-600">{solicitacao.emailEstudante || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-700">Data da solicitação:</span>
                <span className="text-gray-600">{formatDate(solicitacao.dataSolicitacao) || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Tema do TCC */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-500" />
              Tema do TCC
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">{solicitacao.temaTCC || 'Tema não informado'}</h5>
              <p className="text-sm text-gray-600 leading-relaxed">
                {solicitacao.descricao || 'Descrição não disponível'}
              </p>
            </div>
          </div>

          {/* Botões para status pendente */}
          {solicitacao.status === 'pendente' && (
            <div className="flex items-center justify-end gap-3 mt-6 border-t border-gray-200 pt-4">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={() => alert('Função Aprovar ainda não implementada')}
              >
                Aprovar
              </button>
              <button
                type="button"
                className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100"
                onClick={() => alert('Função Rejeitar ainda não implementada')}
              >
                Rejeitar
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default SolicitacaoModal
