import { BookOpen, User, Mail, Calendar } from 'lucide-react'
import React from 'react'

const SolicitacaoModal = ({solicitacao}) => {
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
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

  return (
    <>        
        <div id="solicitacao-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-2xl max-h-full">
                <div class="relative bg-white rounded-lg shadow-sm">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                        <div className="flex items-center gap-3">
                            <BookOpen className="w-6 h-6 text-emerald-500" />
                            <h3 className="text-xl font-semibold text-gray-900">
                            Solicitação de Orientação
                            </h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(solicitacao?.status)}`}>
                                {solicitacao?.status.charAt(0).toUpperCase() + solicitacao?.status.slice(1)}
                            </span>
                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="solicitacao-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                    </div>
                    <div class="p-4 md:p-5 space-y-4">
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                            <User className="w-5 h-5 text-emerald-500" />
                            Informações do Estudante
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-700">Nome:</span>
                                <span className="text-gray-600">{solicitacao?.nomeEstudante || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="font-medium text-gray-700">Email:</span>
                                <span className="text-gray-600">{solicitacao?.emailEstudante || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="font-medium text-gray-700">Data da solicitação:</span>
                                <span className="text-gray-600">{formatDate(solicitacao?.datasolicitacao) || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="border-t border-gray-200"></div>
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-emerald-500" />
                            Tema do TCC
                            </h4>
                            <div className="bg-gray-50 p-4 rounded-lg">
                            <h5 className="font-medium text-gray-900 mb-2">{solicitacao?.temaTCC || 'Tema não informado'}</h5>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {solicitacao?.descricao || 'Descrição não disponível'}
                            </p>
                            </div>
                        </div>
                    </div>                        
                </div>
                {(solicitacao?.status === 'pendente') && (
                    <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                        <button data-modal-hide="solicitacao-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Aprovar</button>
                        <button data-modal-hide="solicitacao-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Rejeitar</button>
                    </div>
                )}    
                </div>
            </div>
        </div>
    </>
  )
}

export default SolicitacaoModal