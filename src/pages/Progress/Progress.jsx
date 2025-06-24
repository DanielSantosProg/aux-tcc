import ProgressStepper from '../../components/ProgressStepper'
import Timeline from '../../components/Timeline'
import React, {useState} from 'react'
import { Tabs, TabItem } from 'flowbite-react'
import Comments from '../../components/Comments'
import CommentsModal from '../../components/CommentsModal'

const Progress = () => {
  const [showModal, setShowModal] = useState(true)
  const [selectedSubject, setSelectedSubject] = useState('')

  const handleOpenComments = (subject) => {
    setSelectedSubject(subject)
    setShowModal(true)
  }

  const [tasks, setTasks] = useState([{
      day: '1',
      date: 'Janeiro 2025',
      title: 'Enviar a Carta de Aceite',
      description: 'Faça o download do documento da carta de aceite no site e me envie com sua assinatura, para que eu assine.'      
    },
    {
      day: '15',
      date: 'Fevereiro 2025',
      title: 'Anexar a Carta de Aceite',
      description: 'Insira a carta de aceite já na área de documentos, seção de entrega.'      
    },
    {
      day: '8',
      date: 'Março 2025',
      title: 'Buscar Referências Bibliográficas',
      description: 'Vá atrás de referências bibliográficas que lidem com o assunto do seu tcc, coloque em um documento e entregue aqui.'      
    },    
    {
      day: '3',
      date: 'Abril 2025',
      title: 'Iniciar o Projeto de Pesquisa',
      description: 'Comece a digitar o seu Projeto de Pesquisa, tomando como base as referências bibliográficas encontradas.'      
    },    
    {
      day: '16',
      date: 'Maio 2025',
      title: 'Fazer alterações na Introdução do Projeto',
      description: 'A introdução que foi feita está caminhando, mas ainda falta adicionar mais citações para enriquecer a sua argumentação.'      
    },    
  ]);
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

  return (
    <div className='flex overflow-y-auto flex-col max-w-7xl w-full bg-white'>
        <h1 className='text-5xl m-0 self-start text-start font-extrabold text-emerald-500 pt-8 px-16'>Progresso</h1>
        <p className="text-gray-600 py-4 px-16">Acompanhe o seu progresso, interaja com seu orientador e faça a entrega das tarefas.</p>       
        <ProgressStepper />
        <div className='self-start px-8'>
          <Tabs aria-label="Tabs with icons" variant="underline">
                  <TabItem active title="Entregas">
                    <Timeline tasks={tasks} comments={comments}/>                  
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