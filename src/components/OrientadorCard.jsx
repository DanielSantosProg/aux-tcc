import React from 'react'
import { UserPen } from 'lucide-react'
import { Link } from 'react-router-dom'

const OrientadorCard = ({orientador}) => {
    const nome = encodeURIComponent(orientador.nome)
  return (
    <>
        <div className='flex flex-row mx-4 w-3xl'>
            <Link to={`/orientador/${nome}`} state={{orientador}} type="button" className="flex items-center justify-between w-full py-5 font-medium text-gray-500 border-b border-gray-200 gap-3 hover:bg-gray-50 transition-colors">
                <span>{orientador.nome}</span>            
                <div className='flex flex-row items-center'>
                    <UserPen className={orientador.qtd_orientandos < orientador.max_orientandos ? 'text-gray-500' : 'text-red-500'} size={18} />
                    <p className='mx-2'>{orientador.qtd_orientandos}/{orientador.max_orientandos}</p>
                </div>
            </Link>
        </div>            
    </>
  )
}

export default OrientadorCard