import React from 'react'

const CommentBox = () => {
  return (
    <div>        
        <form>
        <div class="w-full mb-4 border border-gray-300 rounded-lg bg-gray-50">
            <div class="px-4 py-2 bg-white rounded-t-lg">
                <label for="comment" class="sr-only">Seu Comentário</label>
                <textarea id="comment" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0" placeholder="Digite seu comentário..." required ></textarea>
            </div>
            <div class="flex items-center justify-between px-3 py-2 border-t border-gray-200">
                <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                    Postar comentário
                </button>
            </div>
        </div>
        </form>
    </div>
  )
}

export default CommentBox