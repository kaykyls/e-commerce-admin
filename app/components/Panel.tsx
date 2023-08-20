"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

interface PanelProps {
    children: React.ReactNode
}

const Panel:React.FC<PanelProps> = ({children}:PanelProps) => {
    const pathname = usePathname()

    return (
        <div> {pathname === '/login' ? (
            children
        ) : (
            <>
            <Sidebar />
            <div className='flex flex-col left-72 w-[calc(100%-288px)] relative bg-light-gray min-h-screen'>
                <Navbar />
                {children}
            </div>
            </>
        )}</div>
    )
}

export default Panel