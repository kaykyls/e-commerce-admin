import DashboardCard from './components/DashboardCard'

export default function Home() {
  return (
    <div className='px-8 flex flex-col'>
      <div className='mb-8'>
        <span className='text-2xl'>Dashboard</span>
      </div>
      <div className='flex justify-between gap-4 w-full relative'>
        <DashboardCard
          title='Orders'
          info='345'
        />
        <DashboardCard
          title='Revenue'
          info='$1345.99'
        />
        <DashboardCard
          title='Costumers'
          info='422'
        />
        <DashboardCard
          title='Visitors'
          info='1245'
        />
      </div>
    </div>
  )
}