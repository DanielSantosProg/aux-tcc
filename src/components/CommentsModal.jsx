// components/CommentsModal.jsx
import React, {useEffect} from 'react'
import Comment from './Comment'
import CommentBox from './CommentBox';

const CommentsModal = ({ comments, title }) => {

    useEffect(() => {
        
      }, [comments]);

  return (
    <>
        <div id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-4xl max-h-full">
                <div class="relative bg-white rounded-lg shadow-sm">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                        <div className="flex flex-col items-baseline">
                            <h3 class="text-2xl text-gray-700 font-semibold">
                                {title}
                            </h3>
                            <span>Comentários</span>
                        </div>                        
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="static-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div class="p-4 md:p-5 space-y-4">
                        {comments.map((comment, index) => (
                            <div key={index} className="px-2">
                                <Comment comment={comment}/>
                            </div>
                        ))}                        
                    </div>
                    <div className='p-4'>
                        <CommentBox />
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default CommentsModal
