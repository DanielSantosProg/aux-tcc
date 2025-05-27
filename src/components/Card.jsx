import React from 'react'

const Card = ({text, title}) => {
  return (  
    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 ">{text}</p>
        <button type="button" class="focus:outline-none text-white bg-emerald-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Acessar</button>
    </div>
  )
}

export default Card