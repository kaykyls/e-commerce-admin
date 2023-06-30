import React from 'react'
import Link from 'next/link'

interface SidebarItemProps {
    title: string
    icon: React.ReactNode
    href: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({title, icon, href}) => {
    return (
        <div className='flex items-center text-2xl px-10 py-4 gap-2 font-normal'>
            {icon}
            <Link href={href}>{title}</Link>
        </div>
    )
}

export default SidebarItem