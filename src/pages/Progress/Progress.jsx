import ProgressStepper from '../../components/ProgressStepper'
import Timeline from '../../components/Timeline'
import React, {useState} from 'react'
import { Tabs, TabItem } from 'flowbite-react'

const Progress = () => {
  const [tasks, setTasks] = useState([{
      date: 'Janeiro 2025',
      title: 'Enviar a Carta de Aceite',
      description: 'Faça o download do documento da carta de aceite no site e me envie com sua assinatura, para que eu assine.'      
    },
    {
      date: 'Fevereiro 2025',
      title: 'Anexar a Carta de Aceite',
      description: 'Insira a carta de aceite já na área de documentos, seção de entrega.'      
    },
    {
      date: 'Março 2025',
      title: 'Buscar Referências Bibliográficas',
      description: 'Vá atrás de referências bibliográficas que lidem com o assunto do seu tcc, coloque em um documento e entregue aqui.'      
    },    
    {
      date: 'Abril 2025',
      title: 'Iniciar o Projeto de Pesquisa',
      description: 'Comece a digitar o seu Projeto de Pesquisa, tomando como base as referências bibliográficas encontradas.'      
    },    
    {
      date: 'Maio 2025',
      title: 'Fazer alterações na Introdução do Projeto',
      description: 'A introdução que foi feita está caminhando, mas ainda falta adicionar mais citações para enriquecer a sua argumentação.'      
    },    
  ]);
  return (
    <div className='flex overflow-y-auto flex-col items-center w-full bg-white'>
        <h1 className='text-5xl m-0 self-start text-start font-extrabold text-emerald-500 py-8 px-16'>Progresso</h1>        
        <ProgressStepper />
        <div className='self-start px-8'>
          <Tabs aria-label="Tabs with icons" variant="underline">
                  <TabItem active title="Entregas">
                    <Timeline tasks={tasks}/>
                  </TabItem>
                  <TabItem title="Comentarios">
                    <Timeline tasks={tasks}/>
                  </TabItem>
          </Tabs>
        </div>        
    </div>
  )
}

export default Progress