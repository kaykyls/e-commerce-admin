import React from 'react'
import { FaChevronRight } from 'react-icons/fa'
import Link from 'next/link'

const Settings = () => {
    return (
        <div className='px-32 w-full'>
            <div className='mb-8'>
                <span className='text-2xl'>Settings</span>
            </div>
            <div className='flex flex-col text-xl mb-8'>
                <span className='mb-4'>Account</span>
                <div className='flex flex-col gap-2'>
                    <Link href={"/settings/account"} className='bg-white cursor-pointer p-4 rounded-lg flex justify-between items-center'>
                        <span className='text-dark-gray'>Login</span>
                        <FaChevronRight/>
                    </Link>
                </div>
            </div>
            <div className='flex flex-col text-xl'>
                <span className='mb-4'>Admins</span>
                <div className='flex flex-col gap-2'>
                    <Link href={"/settings/admins"} className='bg-white cursor-pointer p-4 rounded-lg flex justify-between items-center'>
                        <span className='text-dark-gray'>See All Admins</span>
                        <FaChevronRight/>
                    </Link>
                    <Link href={"/settings/admins/add"} className='bg-white cursor-pointer p-4 rounded-lg flex justify-between items-center'>
                        <span className=' text-dark-gray'>Add New Admin</span>
                        <FaChevronRight/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Settings