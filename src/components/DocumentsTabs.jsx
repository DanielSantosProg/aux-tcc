import React from 'react'
import { Tabs, TabItem } from 'flowbite-react'
import { Download, FileUp } from 'lucide-react'

const DocumentsTabs = ({UserLoggedIn}) => {
  return (
    <div className="w-full max-w-4xl px-8">
      <Tabs aria-label="Tabs with icons" variant="underline">
        <TabItem active title="Documentos">
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Nome do Documento
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Data do Upload
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Descrição
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Download
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b border-gray-200">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Carta de Aceite
                            </th>
                            <td class="px-6 py-4">
                                02/06/2025
                            </td>
                            <td class="px-6 py-4 text-wrap">
                                Documento para assinatura do orientador
                            </td>
                            <td class="px-6 py-4">
                                <a href="#">
                                    <Download className='text-gray-800' size={18}/>
                                </a>                                
                            </td>                            
                        </tr>
                        <tr class="bg-white border-b border-gray-200">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Template Projeto
                            </th>
                            <td class="px-6 py-4">
                                02/06/2025
                            </td>
                            <td class="px-6 py-4">
                                Template opcional para ser usado na criação do projeto de pesquisa
                            </td>
                            <td class="px-6 py-4">
                                <a href="#">
                                    <Download className='text-gray-800' size={18}/>
                                </a>                                
                            </td>
                        </tr>
                        <tr class="bg-white">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                Normas ABNT
                            </th>
                            <td class="px-6 py-4">
                                02/06/2025
                            </td>
                            <td class="px-6 py-4">
                                Conjunto de normas ABNT importantes para o processo de criação de monografia
                            </td>
                            <td class="px-6 py-4">
                                <a href="#">
                                    <Download className='text-gray-800' size={18}/>
                                </a>                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </TabItem>
        {UserLoggedIn ? ( 
            <TabItem title="Entregas">
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Documento
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Data Limite de Entrega
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Data Upload
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Upload
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b border-gray-200">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    Carta de Aceite Assinada
                                </th>
                                <td class="px-6 py-4">
                                    02/03/2025
                                </td>
                                <td class="px-6 py-4">
                                    Não Entregue
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#">
                                        <FileUp className='text-gray-800' size={18}/>
                                    </a>                                
                                </td>
                            </tr>
                            <tr class="bg-white border-b border-gray-200">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    Projeto de Pesquisa
                                </th>
                                <td class="px-6 py-4">
                                    02/06/2025
                                </td>
                                <td class="px-6 py-4">
                                    Não Entregue
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#">
                                        <FileUp className='text-gray-800' size={18}/>
                                    </a>                                
                                </td>
                            </tr>
                            <tr class="bg-white">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    Monografia
                                </th>
                                <td class="px-6 py-4">
                                    08/12/2025
                                </td>
                                <td class="px-6 py-4">
                                    Não Entregue
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#">
                                        <FileUp className='text-gray-800' size={18}/>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </TabItem>
        ) : (
            <TabItem disabled title="Entregas">
                Você não têm acesso a esse conteúdo no momento.
            </TabItem>
        )}
      </Tabs>
    </div>
  )
}

export default DocumentsTabs