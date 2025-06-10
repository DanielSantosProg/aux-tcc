import React, {useState} from 'react'
import OrientadorCard from '../../components/OrientadorCard'

const Orientadores = () => {
  const [orientadores, setOrientadores] = useState([{
    nome: 'Ana Carolina',
    qtd_orientandos: 5,
    max_orientandos: 10,
    email: 'anacarolina@ifba.edu.br',
    formacao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    area_atuacao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec efficitur est. Phasellus vel nisl sodales ligula hendrerit sagittis. Pellentesque at ipsum eleifend, porttitor quam. '
  },
  {
    nome: 'Neide',
    qtd_orientandos: 2,
    max_orientandos: 3,
    email: 'neide@ifba.edu.br',
    formacao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    area_atuacao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec efficitur est. Phasellus vel nisl sodales ligula hendrerit sagittis. Pellentesque at ipsum eleifend, porttitor quam. '
  },
  {
    nome: 'Júlio',
    qtd_orientandos: 4,
    max_orientandos: 6,
    email: 'julio@ifba.edu.br',
    formacao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    area_atuacao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec efficitur est. Phasellus vel nisl sodales ligula hendrerit sagittis. Pellentesque at ipsum eleifend, porttitor quam. '
  },
  {
    nome: 'Bulhões',
    qtd_orientandos: 3,
    max_orientandos: 3,
    email: 'bulhoes@ifba.edu.br',
    formacao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    area_atuacao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec efficitur est. Phasellus vel nisl sodales ligula hendrerit sagittis. Pellentesque at ipsum eleifend, porttitor quam. '
  },
  {
    nome: 'Rebeca',
    qtd_orientandos: 2,
    max_orientandos: 5,
    email: 'rebeca@ifba.edu.br',
    formacao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    area_atuacao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec efficitur est. Phasellus vel nisl sodales ligula hendrerit sagittis. Pellentesque at ipsum eleifend, porttitor quam. '
  },

]);
  return (
    <div className='flex overflow-y-auto flex-col items-center w-full bg-white'>
        <h1 className='text-5xl m-0 self-start text-start font-extrabold text-emerald-500 py-8 px-16'>Orientadores</h1>
        {orientadores.map((orientador, index) => (
          <div key={index} className='w-full'>
            <OrientadorCard orientador={orientador} />
          </div>
        ))}
    </div>
  )
}

export default Orientadores