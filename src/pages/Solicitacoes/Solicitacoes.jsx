import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Mail,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  ListCollapse,
  ListCheck,
} from "lucide-react";
import SolicitacaoModal from "../../components/SolicitacaoModal";

const Solicitacoes = () => {
  const { user } = useContext(AuthContext);

  const [solicitacoes, setSolicitacoes] = useState([]);
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "aprovada":
        return "bg-green-100 text-green-800";
      case "rejeitada":
        return "bg-red-100 text-red-800";
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "aprovada":
        return <CheckCircle className="w-4 h-4" />;
      case "rejeitada":
        return <XCircle className="w-4 h-4" />;
      case "pendente":
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const getSolicitacoes = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `${
          process.env.VITE_API_BASE
        }/api/solicitacoes?orientador_email=${encodeURIComponent(user.email)}`
      );
      if (!response.ok) throw new Error("Erro ao buscar solicitações");

      const dados = await response.json();
      setSolicitacoes(dados);
    } catch (error) {
      console.error("Erro ao buscar solicitações:", error);
      setSolicitacoes([]);
    }
  };

  useEffect(() => {
    getSolicitacoes();
  }, [user]);

  // Função para atualizar o status da solicitação
  const handleUpdateStatus = async (
    solicitacaoId,
    status,
    orientandoId,
    orientadorId
  ) => {
    try {
      const response = await fetch(
        `${process.env.VITE_API_BASE}/api/solicitacoes/${solicitacaoId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Erro ao atualizar o status para ${status}`
        );
      }

      // Se for aprovado, também cria a orientação
      if (status === "aprovada") {
        const orientacaoResponse = await fetch(
          `${process.env.VITE_API_BASE}/api/orientacoes`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orientando_id: orientandoId,
              orientador_id: orientadorId,
            }),
          }
        );

        if (!orientacaoResponse.ok) {
          const errorData = await orientacaoResponse.json();
          throw new Error(errorData.message || "Erro ao criar a orientação.");
        }
      }

      alert(`Solicitação ${status} com sucesso!`);
      getSolicitacoes(); // Atualiza a lista de solicitações
      setModalAberto(false); // Fecha o modal
    } catch (error) {
      console.error(error);
      alert(`Falha: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl px-4">
      <div className="flex flex-row items-center gap-3 pb-[12px] pt-8 px-16">
        <div className="flex w-[40px] h-[40px] items-center justify-center bg-gradient-to-r rounded-md from-teal-500 via-teal-400 to-teal-200">
          <ListCheck className="text-white" size={24} />
        </div>
        <h2 className="text-5xl m-0 self-start text-start font-extrabold bg-gradient-to-r from-cyan-500 to-indigo-600 text-transparent bg-clip-text">
          Solicitações
        </h2>
      </div>
      <p className="text-gray-600 py-4 px-16">
        Gerencie suas solicitações de orientação de TCC.
      </p>
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
                  <tr
                    key={solicitacao.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                            {solicitacao.orientando_nome
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {solicitacao.orientando_nome}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {solicitacao.orientando_email}
                          </div>
                          <div className="text-xs text-gray-500">
                            {solicitacao.curso}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {solicitacao.temaTCC}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                        {solicitacao.descricao}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(solicitacao.dataSolicitacao)}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          solicitacao.status
                        )}`}
                      >
                        {getStatusIcon(solicitacao.status)}
                        {solicitacao.status.charAt(0).toUpperCase() +
                          solicitacao.status.slice(1)}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {solicitacao.status === "pendente" && (
                          <>
                            <button
                              onClick={() =>
                                handleUpdateStatus(
                                  solicitacao.id,
                                  "aprovada",
                                  solicitacao.orientando_id,
                                  solicitacao.orientador_id
                                )
                              }
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                            >
                              Aprovar
                            </button>
                            <button
                              onClick={() =>
                                handleUpdateStatus(solicitacao.id, "rejeitada")
                              }
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                            >
                              Rejeitar
                            </button>
                          </>
                        )}
                        <a
                          href="#"
                          data-modal-target="solicitacao-modal"
                          data-modal-toggle="solicitacao-modal"
                        >
                          <button
                            onClick={() => {
                              setSolicitacaoSelecionada(solicitacao);
                              setModalAberto(true);
                            }}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                          >
                            <ListCollapse />
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
        onClose={() => setModalAberto(false)}
      />
    </div>
  );
};

export default Solicitacoes;
