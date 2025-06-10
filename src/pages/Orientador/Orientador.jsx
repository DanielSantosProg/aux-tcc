import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { UserPen } from 'lucide-react'

const Orientador = () => {
    const { nome } = useParams()
    const location = useLocation()
    const orientador = location.state?.orientador
    const available = orientador.qtd_orientandos < orientador.max_orientandos ? true : false

    return (
      <div className="flex flex-col p-10 w-6xl items-start">
        <h1 className="text-3xl font-bold self-start text-emerald-500">Ficha do Orientador</h1>
        <img class="rounded-sm w-36 h-24 m-4 mt-8" src="/src/assets/user.png" alt="User Avatar"></img>
        <div className='border-2 m-2'>
            <p className="text-lg border-b-2 p-4"><strong>Nome:</strong> {decodeURIComponent(nome)}</p>
            <p className="text-lg border-b-2 p-4"><strong>Email:</strong> {orientador.email}</p>
            <p className="text-lg border-b-2 p-4"><strong>Formação:</strong><br/>{orientador.formacao}</p>
            <p className="text-lg border-b-2 p-4"><strong>Áreas de atuação:</strong><br/>{orientador.area_atuacao}</p>
            <div className='flex flex-row items-center p-4 justify-between'>
                <div className='flex flex-row items-center'>
                    <UserPen className={available ? 'text-gray-500' : 'text-red-500'} size={24} />
                    <p className={available ? 'text-gray-500 mx-2' : 'text-red-500 mx-2'}><strong>{orientador.qtd_orientandos}/{orientador.max_orientandos}</strong></p>
                    <span>Orientandos</span>
                    <p className='px-4'><strong>Status: </strong>{available ? 'Disponível' : 'Indisponível'}</p>
                </div>                
                <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Solicitar Orientação</button>
            </div>
        </div>
      </div>
    )
  }

export default Orientador