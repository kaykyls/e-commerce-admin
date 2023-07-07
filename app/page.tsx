import DashboardCard from './components/DashboardCard'

export default function Home() {
  return (
      <div className='flex gap-4 justify-center mt-16 w-full relative'>
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
