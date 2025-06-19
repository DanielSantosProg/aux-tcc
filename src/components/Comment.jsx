import { ClipboardCopy } from 'lucide-react'
import React, {useState} from 'react'

const Comment = ({ comment }) => {
    return (
    <div className='w-full py-4'>
      <div class="flex items-start gap-2.5">
        <img class="w-12 h-8 rounded-full" src="src/assets/user.png" alt="Foto Usuario" />
        <div class="flex flex-col w-full max-w-2xl leading-1.5 p-2 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
            <div class="flex items-center space-x-2 rtl:space-x-reverse">
                <span class="text-sm font-semibold text-gray-900">{comment.userName}</span>
                <span class="text-sm font-normal text-gray-500">{comment.timeSent}</span>
            </div>
            <p class="text-sm font-normal py-2.5 text-gray-900">{comment.message}</p>
            <span class="text-sm font-normal text-gray-500">Enviado</span>
        </div>
        <a href="/progresso" className='py-8' title='Ir para a atividade'>
            <ClipboardCopy className='text-gray-700' size={22}/>
        </a>    
        </div>
    </div>
  )
}

export default Comment
