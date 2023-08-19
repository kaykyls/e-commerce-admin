"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarItemProps {
    title: string
    icon: React.ReactNode
    href: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({title, icon, href}) => {
    const pathname = usePathname()
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        setIsActive(pathname === href || pathname.startsWith(`${href}/`) && href !== '/')
    }, [pathname])

    return (
        <Link href={href} className={`${!isActive ? "text-dark-gray font-normal" : "text-black font-medium"} flex items-center text-xl px-10 py-4 gap-5`}>
            <div className='text-3xl'>
                {icon}
            </div>
            <span className='text-xl'>{title}</span>
            {
                isActive && <span className='absolute right-0 h-8 rounded-l-full w-1 bg-blue-600'></span>
            }  
        </Link>
    )
}

export default SidebarItem