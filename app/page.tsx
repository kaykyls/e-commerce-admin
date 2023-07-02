import Image from 'next/image'
import Sidebar from './components/Sidebar'
import DashboardCard from './components/DashboardCard'

export default function Home() {
  return (
      <div className='flex gap-4 justify-center mt-16 ms-[235px] w-full'>
        <DashboardCard
          title='Orders'
          info='100'
        />
        <DashboardCard
          title='Profit'
          info='100'
        />
        <DashboardCard
          title='New Costumers'
          info='100'
        />
        <DashboardCard
          title='Messages'
          info='100'
        />
      </div>
  )
}
