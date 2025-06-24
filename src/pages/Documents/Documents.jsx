import React, {useState} from 'react'
import DocumentsTabs from '../../components/DocumentsTabs'

const Documents = () => {
    const [userLogin, setUserLogin] = useState(true);

  return (
    <div className='flex flex-col w-full max-w-7xl px-4'>
        <h1 className='text-5xl m-0 self-start text-start font-extrabold text-emerald-500 pt-8 px-16'>Documentos</h1>
        <p className="text-gray-600 py-4 px-16">Faça o download de documentos importantes ou faça suas entregas.</p>
        <DocumentsTabs UserLoggedIn={userLogin}/>
    </div>
  )
}

export default Documents