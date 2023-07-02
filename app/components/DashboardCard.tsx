import React from 'react'

interface DashboardCardProps {
    title: string
    info: string
}

const DashboardCard: React.FC<DashboardCardProps> = ({title, info}) => {
    return (
        <div className='bg-white w-72 h-60 rounded-lg'>
            <h3>{title}</h3>
            <span>{info}</span>
        </div>
    )
}

export default DashboardCard