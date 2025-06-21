import { FileUp, MessageSquareMore } from 'lucide-react'
import React, {useState, useEffect} from 'react'
import CommentsModal from './CommentsModal'
import TaskModal from './TaskModal';

export const Timeline = ({tasks, comments}) => {
    const [modalComments, setModalComments] = useState([{}]);
    const [title, setTitle] = useState("No Title");
    const [numComments, setNumComments] = useState([{}]);

    const handleComments = (task) => {
        const filtered = comments.filter(comment => comment.subject === task.title)
        setModalComments(filtered)
        setTitle(task.title)
    }
    
    const setTitleToSendFileModal = (task) => {
        setTitle(task.title)
    }

    const defNumComments = () => {
        const result = tasks.map(task => {
            const qtd = comments.filter(comment => comment.subject === task.title).length;
            return {
                title: task.title,
                qtdComments: qtd
            };
        });
        setNumComments(result);
    };
    

    useEffect(() => {
        defNumComments();
      }, []);

  return (
    <div className='w-full max-w-4xl px-8'>
        <ol class="relative border-s border-gray-200 ">
            {tasks.map((task, index) => (
            <div key={index} className='w-full'>
                <li class="mb-10 ms-4">
                    <div class="absolute w-6 h-10 bg-white text-2xl text-gray-600 -start-3.5 border border-white">{task.day}</div>
                    <time class="mb-1 ml-2 text-sm text-emerald-500 font-normal leading-none">{task.date}</time>
                    <h3 class="text-lg font-semibold text-gray-900">{task.title}</h3>
                    <p class="mb-4 text-base font-normal text-gray-500">{task.description}</p>
                    <div>
                    <a href="#" data-modal-target="task-modal" data-modal-toggle="task-modal" onClick={() => setTitleToSendFileModal(task)} class="inline-flex items-center mx-4 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-gray-700">
                        <FileUp className='text-gray-500 ms-2 mr-2 rtl:rotate-180' size={18}/>
                        <span className='text-gray-700'>Adicionar Envio</span>                                             
                    </a>
                    <a href="#" data-modal-target="static-modal" data-modal-toggle="static-modal" onClick={() => handleComments(task)} class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-gray-700">
                        <MessageSquareMore className='text-gray-700 relative left-2' size={18}/>
                        <div className='flex justify-center items-center relative bottom-2 bg-emerald-200 rounded-full w-4 h-4'>
                            <span className='text-gray-700'>{numComments.find(n => n.title === task.title)?.qtdComments || 0}</span>
                        </div>
                    </a>
                    </div>
                    
                </li>
            </div>
            ))}
            <CommentsModal comments={modalComments} title={title}/>
            <TaskModal title={title} />                 
        </ol>
    </div>
  )
}

export default Timeline