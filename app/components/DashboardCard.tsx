import React from 'react'

interface DashboardCardProps {
    title: string
    info: string
}

const DashboardCard: React.FC<DashboardCardProps> = ({title, info}) => {
    return (
        <div className='bg-white w-full py-10 rounded-lg flex items-center'>
            <div className="ms-4 flex flex-col justify-center">
                <h3 className='text-slate-400 text-xl mb-2'>{title}</h3>
                <span className='text-slate-800 font-medium text-4xl'>{info}</span>
            </div>
            
        </div>
    )
}

export default DashboardCard