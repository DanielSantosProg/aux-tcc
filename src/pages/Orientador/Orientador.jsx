import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { UserPen, Mail, GraduationCap, Briefcase, Users, BookOpenCheck } from 'lucide-react'
import SolicitarOrientacaoModal from '../../components/SolicitarOrientacaoModal'

const Orientador = ({user, data}) => {
    const { nome } = useParams()
    const location = useLocation()
    const orientador = location.state?.orientador
    const available = (orientador.qtd_orientandos < orientador.max_orientandos) ? true : false
    const [currUserOrientando, setCurrUserOrientando] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [hasSolicitacao, setHasSolicitacao] = useState(false);

    const defOrientando = () => {
      if (!data || !orientador || !user) return;
    
      // Encontra o orientador no array data pelo email
      const foundOrientador = data.find(u => u.email === orientador.email);
    
      if (!foundOrientador || !foundOrientador.orientandos) {
        setCurrUserOrientando(false);
        return;
      }
    
      // Verifica se algum orientando tem o mesmo email do user atual
      const isUserOrientando = foundOrientador.orientandos.some(
        orientando => orientando.email === user.email
      );
    
      setCurrUserOrientando(isUserOrientando);
      console.log('currUserOrientando:', isUserOrientando);
    };

    const handleSolicitarOrientacao = () => {
      setShowModal(true);
      const modal = document.getElementById('solicitar-orientacao-modal');
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    };

    const handleCloseModal = () => {
      setShowModal(false);
      const modal = document.getElementById('solicitar-orientacao-modal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    };

    const verificarSolicitacaoExistente = async () => {
      if (!user || !orientador) return;
    
      try {
        const response = await fetch(`http://localhost:8000/solicitacoes?emailEstudante=${encodeURIComponent(user.email)}&orientadorEmail=${encodeURIComponent(orientador.email)}`);
        if (!response.ok) throw new Error('Erro ao buscar solicitações');
    
        const dados = await response.json();
    
        // Se o array de dados não estiver vazio, significa que já existe solicitação
        setHasSolicitacao(dados.length > 0);
    
      } catch (error) {
        console.error('Erro ao verificar solicitações:', error);
        setHasSolicitacao(false); // ou trate de outra forma
      }
    };
    
    

    useEffect(() => {
          defOrientando()
          verificarSolicitacaoExistente();
        }, [data, orientador, user]);
    return (
      <div className="flex flex-col p-10 w-6xl items-start">
        <div className="space-y-2">
          <h1 className='text-5xl m-0 self-start text-start font-extrabold text-emerald-500'>Ficha do Orientador</h1>        
          <p className="text-gray-600 pt-2 pb-8">Informações detalhadas do orientador acadêmico</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 p-6 border-b border-gray-200">
            <div className="flex items-start gap-6">
              <div className="relative">
                <img
                  className="w-24 h-24 rounded-full ring-4 ring-white shadow-lg object-cover"
                  src="/placeholder-avatar.png"
                  alt={orientador.nome}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-24 h-24 rounded-full ring-4 ring-white shadow-lg bg-blue-500 text-white text-xl font-semibold items-center justify-center hidden"
                  style={{ display: 'none' }}
                >
                  {orientador.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">{orientador.nome}</h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{orientador.email}</span>
                </div>
                
                <div className="flex items-center gap-3 mt-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                    available
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <Users className="w-3 h-3" />
                    {orientador.qtd_orientandos}/{orientador.max_orientandos} Orientandos
                  </span>
                  
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {available ? 'Disponível' : 'Indisponível'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-600">
                <GraduationCap className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900">Formação</h3>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700 leading-relaxed">{orientador.formacao}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-600">
                <Briefcase className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900">Áreas de Atuação</h3>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700 leading-relaxed">{orientador.area_atuacao}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center">
                <BookOpenCheck className={`w-5 h-5 mx-2 ${available ? 'text-blue-600' : 'text-red-500'}`} />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">
                    Orientações Feitas
                  </p>
                  <p className="text-xs text-gray-500">
                    {orientador.tot_orientacoes} Projetos
                  </p>
                </div>
              </div>

              <div className="flex items-center relative right-48">
                <UserPen className={`w-5 h-5 mx-2 ${available ? 'text-blue-600' : 'text-red-500'}`} />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">
                    Status de Orientação
                  </p>
                  <p className="text-xs text-gray-500">
                    {available ? 
                      `${orientador.max_orientandos - orientador.qtd_orientandos} vagas disponíveis` : 
                      'Sem vagas disponíveis'
                    }
                  </p>
                </div>
              </div>
              
              <button
                type="button"
                disabled={!available || currUserOrientando}
                onClick={handleSolicitarOrientacao}
                className={`px-5 py-2.5 text-sm font-medium rounded-lg focus:ring-4 focus:outline-none ${
                  available && !currUserOrientando && !hasSolicitacao
                    ? 'text-white bg-green-700 hover:bg-green-800 focus:ring-green-300'
                    : 'text-gray-500 bg-gray-300 cursor-not-allowed'
                }`}
              >
                {available && !currUserOrientando && !hasSolicitacao ? 'Solicitar Orientação' : 'Indisponível'}
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <SolicitarOrientacaoModal 
            user={user}
            orientador={orientador}
            onClose={handleCloseModal}
          />
        )}
      </div>
    )
  }

export default Orientador
