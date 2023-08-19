import React from 'react'
import { FaChevronRight } from 'react-icons/fa'
import Link from 'next/link'

const page = () => {
    return (
        <div className='px-32 w-full mt-16'>
            <div className='flex flex-col text-xl'>
                <span className='mb-4'>Admins</span>
                <div className='flex flex-col gap-4'>
                    <Link href={"/settings/admins"} className='bg-white cursor-pointer px-4 py-2 rounded-lg flex justify-between items-center'>
                        <span>See All Admins</span>
                        <FaChevronRight/>
                    </Link>
                    <Link href={"/settings/admins/add"} className='bg-white cursor-pointer px-4 py-2 rounded-lg flex justify-between items-center'>
                        <span>Add New Admin</span>
                        <FaChevronRight/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default page