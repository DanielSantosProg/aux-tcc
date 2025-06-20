import { FileUp, MessageSquareMore } from 'lucide-react'
import React, {useState} from 'react'
import CommentsModal from './CommentsModal'

export const Timeline = ({tasks, comments}) => {
    const [modalComments, setModalComments] = useState([{}]);
    const [title, setTitle] = useState("No Title");

    const handleComments = (task) => {
        const filtered = comments.filter(comment => comment.subject === task.title)
        setModalComments(filtered)
        setTitle(task.title)
    }    

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
                    <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-gray-700">
                        <FileUp className='text-gray-500 ms-2 mr-2 rtl:rotate-180' size={18}/>
                        <span className='text-gray-700'>Adicionar Envio</span>                                             
                    </a>
                    <a href="#" data-modal-target="static-modal" data-modal-toggle="static-modal" onClick={() => handleComments(task)} class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-gray-700">
                        <MessageSquareMore className='text-gray-700' size={18}/>
                    </a>
                </li>
            </div>
            ))}
            <CommentsModal comments={modalComments} title={title}/>                     
        </ol>
    </div>
  )
}

export default Timeline