import ProgressStepper from '../../components/ProgressStepper'
import Timeline from '../../components/Timeline'
import React, {useState, useEffect} from 'react'
import { Tabs, TabItem } from 'flowbite-react'
import Comments from '../../components/Comments'
import CommentsModal from '../../components/CommentsModal'
import TimelineDropdown from '../../components/TimelineDropdown'

const Progress = ({user}) => {
  const [selectedOrientandoEmail, setSelectedOrientandoEmail] = useState(
    user?.userType === 'orientando' ? user.email : null
  );
  const [selectedSubjectEmail, setSelectedSubjectEmail] = useState(selectedOrientandoEmail);
  const [tasks, setTasks] = useState([]);
  const [comments, setComments] = useState([{
    userName: 'Ana Carolina',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    timeSent: '08:48',
    date: '18/06/2025',
    subject: 'Enviar a Carta de Aceite',
  },
  {
    userName: 'Ana Carolina',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    timeSent: '08:48',
    date: '18/06/2025',
    subject: 'Buscar Referências Bibliográficas'
  },
  {
    userName: 'Ana Carolina',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    timeSent: '08:48',
    date: '18/06/2025',
    subject: 'Buscar Referências Bibliográficas'
  },
  {
    userName: 'Ana Carolina',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    timeSent: '08:48',
    date: '18/06/2025',
    subject: 'Iniciar o Projeto de Pesquisa'
  },
  {
    userName: 'Ana Carolina',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    timeSent: '08:48',
    date: '18/06/2025',
    subject: 'Iniciar o Projeto de Pesquisa'
  },
  {
    userName: 'Ana Carolina',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    timeSent: '08:48',
    date: '18/06/2025',
    subject: 'Buscar Referências Bibliográficas'
  },
]);
const isOrientando = user?.userType === 'orientando'

  useEffect(() => {
    if (selectedOrientandoEmail) {
      setSelectedSubjectEmail(selectedOrientandoEmail);
    }
  }, [selectedOrientandoEmail]);
  useEffect(() => {
          const getTasks = async () => {
            if (!user) return;
            let email;
            if (user.userType == "orientando"){
              email = user.email
              setSelectedSubjectEmail(email)
            } else {
              email = selectedSubjectEmail;
            }
      
            try {
              const response = await fetch(`http://localhost:8000/tasks?orientandoEmail=${encodeURIComponent(email)}`);
              if (!response.ok) throw new Error('Erro ao buscar solicitações');
      
              const dados = await response.json();
              console.log(dados)
              setTasks(dados);
            } catch (error) {
              console.error('Erro ao buscar solicitações:', error);
              setTasks([]);
            }
          };
      
          getTasks();
        }, [user, selectedSubjectEmail]);
  return (
    <div className='flex overflow-hidden flex-col max-w-7xl w-full bg-white'>
        <h1 className='text-5xl m-0 self-start text-start font-extrabold text-emerald-500 pt-8 px-16'>Progresso</h1>
        <p className="text-gray-600 py-4 px-16">Acompanhe o seu progresso, interaja com seu orientador e faça a entrega das tarefas.</p>       
        <ProgressStepper />
        <div className='self-start px-8 w-full'>
          {user?.userType == "orientador" && (
            <div className="flex self-center justify-center">
              <TimelineDropdown 
                user={user} 
                onSelectOrientando={(orientando) => setSelectedOrientandoEmail(orientando.email)} 
              />
            </div>            
          )}          
          <Tabs aria-label="Tabs with icons" variant="underline">
            <TabItem active title="Entregas">
              {!selectedSubjectEmail && (
                <div className="flex justify-center">
                  <span>Nada a ser mostrado ainda.</span>
                </div>
              )}
              <Timeline tasks={tasks} comments={comments} isOrientando={isOrientando} subject={selectedSubjectEmail}/>                  
            </TabItem>
            <TabItem title="Comentarios">
              <Comments comments={comments}/>
            </TabItem>
          </Tabs>
        </div>        
    </div>
  )
}

export default Progress