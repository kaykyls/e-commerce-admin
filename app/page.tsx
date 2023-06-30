import Image from 'next/image'
import Sidebar from './components/Sidebar'
import DashboardCard from './components/DashboardCard'

export default function Home() {
  return (
    <div className='flex bg-slate-200 h-screen'>
      <Sidebar />
      <div className='flex gap-4 justify-center mt-16 ms-[235px] w-full'>
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </div>

    </div>
  )
}
