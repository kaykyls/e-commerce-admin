import DashboardCard from './components/DashboardCard'

export default function Home() {
  return (
      <div className='flex justify-between gap-4 px-8 mt-16 w-full relative'>
        <DashboardCard
          title='Orders'
          info='345'
        />
        <DashboardCard
          title='Profit'
          info='1345'
        />
        <DashboardCard
          title='New Costumers'
          info='422'
        />
        <DashboardCard
          title='Messages'
          info='12'
        />
      </div>
  )
}