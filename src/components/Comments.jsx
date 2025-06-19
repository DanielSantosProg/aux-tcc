import React, {useState} from 'react'
import Comment from './Comment'
import { NotebookText } from 'lucide-react'

const Comments = ({ comments }) => {
    return (
    <div className='w-full max-w-4xl min-w-4xl px-8'>
      {comments.map((comment, index) => (
        <div key={index} className='w-full'>
            <div className='flex flex-row items-center '>
                <NotebookText className='text-gray-700' size={18}/>
                <h4 className='px-2'>{comment.subject}</h4>
            </div>
            <Comment comment={comment} />
        </div>
      ))}       
    </div>
  )
}

export default Comments
