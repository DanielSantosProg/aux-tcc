import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Mail, Calendar, FileText, CheckCircle, XCircle, Clock } from 'lucide-react'
import SolicitacaoModal from '../../components/SolicitacaoModal';

const Solicitacoes = () => {
    const { user } = useContext(AuthContext);
    
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case 'aprovada':
                return 'bg-green-100 text-green-800';
            case 'rejeitada':
                return 'bg-red-100 text-red-800';
            case 'pendente':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'aprovada':
                return <CheckCircle className="w-4 h-4" />;
            case 'rejeitada':
                return <XCircle className="w-4 h-4" />;
            case 'pendente':
                return <Clock className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    useEffect(() => {
        const getSolicitacoes = async () => {
          if (!user) return;
    
          try {
            const response = await fetch(`http://localhost:8000/solicitacoes?orientadorEmail=${encodeURIComponent(user.email)}`);
            if (!response.ok) throw new Error('Erro ao buscar solicitações');
    
            const dados = await response.json();
            setSolicitacoes(dados);
          } catch (error) {
            console.error('Erro ao buscar solicitações:', error);
            setSolicitacoes([]);
          }
        };
    
        getSolicitacoes();
      }, [user]);

    return (
        <div className='flex flex-col w-full max-w-7xl px-4'>
            <h1 className="text-5xl m-0 self-start text-start font-extrabold text-emerald-500 pt-8 px-16">Solicitações</h1>
            <p className="text-gray-600 py-4 px-16">Gerencie suas solicitações de orientação de TCC.</p>
            <div className="max-w-7xl mx-auto px-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-emerald-500" />
                            Solicitações Recebidas
                        </h2>
                    </div>

                    <div className="overflow-x-hidden max-h-96 overflow-y-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Estudante
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tema do TCC
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Data
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {solicitacoes.map((solicitacao) => (
                                    <tr key={solicitacao.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                                                        {solicitacao.nomeEstudante.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{solicitacao.nomeEstudante}</div>
                                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Mail className="w-3 h-3" />
                                                        {solicitacao.emailEstudante}
                                                    </div>
                                                    <div className="text-xs text-gray-500">{solicitacao.curso}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{solicitacao.temaTCC}</div>
                                            <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">{solicitacao.descricao}</div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                {formatDate(solicitacao.datasolicitacao)}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(solicitacao.status)}`}>
                                                {getStatusIcon(solicitacao.status)}
                                                {solicitacao.status.charAt(0).toUpperCase() + solicitacao.status.slice(1)}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                {solicitacao.status === 'pendente' && (
                                                    <>
                                                        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition-colors">
                                                            Aprovar
                                                        </button>
                                                        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors">
                                                            Rejeitar
                                                        </button>
                                                    </>
                                                )}
                                                <a href="#" data-modal-target="solicitacao-modal" data-modal-toggle="solicitacao-modal">
                                                    <button
                                                        onClick={() => {
                                                            setSolicitacaoSelecionada(solicitacao);
                                                            setModalAberto(true);
                                                        }}
                                                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                                        >
                                                        Ver Detalhes
                                                    </button>
                                                </a>                                                
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <SolicitacaoModal
                solicitacao={solicitacaoSelecionada}
                aberto={modalAberto}
                onClose={() => setModalAberto(false)} />
        </div>
    )
}

export default Solicitacoes