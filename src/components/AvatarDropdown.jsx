import React from 'react'
import { UserCog, LogOutIcon } from 'lucide-react'

const AvatarDropdown = () => {
  return (
    <div>        
        <div id="dropdownAvatar" class="z-10 hidden bg-gray-50 divide-y divide-gray-100 rounded-lg shadow-sm w-44">
            <div class="px-4 py-3 text-sm text-gray-900">
                <div>Daniel Santos</div>
                <div class="font-medium truncate">danielsantosprog@gmail.com</div>
            </div>
            <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownUserAvatarButton">
                <li>
                    <a href="#" class="flex flex-row px-4 py-2 hover:bg-gray-100">
                        <UserCog size={18} color='grey' />
                        <span className='px-2 text-gray-700'>Configurações</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="flex flex-row px-4 py-2 hover:bg-gray-100">
                        <UserCog size={18} color='grey' />
                        <span className='px-2 text-gray-700'>Opção 2</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="flex flex-row px-4 py-2 hover:bg-gray-100">
                        <UserCog size={18} color='grey' />
                        <span className='px-2 text-gray-700'>Opção 3</span>
                    </a>
                </li>
            </ul>
                <a href="#" class="flex flex-row px-4 py-2 text-sm hover:bg-red-50">
                    <LogOutIcon size={18} color='red'/>
                    <span className='px-2 text-red-500'>Sair</span>
                </a>
        </div>
    </div>
  )
}

export default AvatarDropdown