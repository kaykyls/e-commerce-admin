import React from 'react'
import SidebarItem from './SidebarItem'
import {GoHome, GoListUnordered} from 'react-icons/go'
import {MdStorefront} from 'react-icons/md'
import {PiStorefrontLight} from 'react-icons/pi'
import {CiViewList} from 'react-icons/ci'
import {MdOutlineGroups} from 'react-icons/md'
import {IoSettingsOutline} from 'react-icons/io5'
import {GiConverseShoe} from 'react-icons/gi'
import Link from 'next/link'


const Sidebar = () => {
    return (
        <div className='fixed top-0 left-0 h-screen w-72 bg-white text-gray-800 m-0 flex flex-col gap-12  border-r border-medium-gray'>
            <Link href={"/"} className='flex text-3xl items-center font-medium px-10 py-4 gap-1'>
                <GiConverseShoe/>
                <span className='drop-shadow-md'>Shoes</span>
            </Link>
            <div>
                <div>
                    <SidebarItem
                        title='Dashboard'
                        icon={<GoHome/>}
                        href='/'
                    />
                    <SidebarItem
                        title='Products'
                        icon={<PiStorefrontLight/>}
                        href='/products'
                    />
                    <SidebarItem
                        title='Orders'
                        icon={<GoListUnordered/>}
                        href='/orders'
                    />
                    <SidebarItem
                        title='Categories'
                        icon={<CiViewList/>}
                        href='/categories'
                    />
                    <SidebarItem
                        title='Customers'
                        icon={<MdOutlineGroups/>}
                        href='/customers'
                    />
                    <SidebarItem
                        title='Settings'
                        icon={<IoSettingsOutline/>}
                        href='/settings'
                    />
                </div>
            </div> 
        </div>
    )
}

export default Sidebar