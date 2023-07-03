import DashboardCard from './components/DashboardCard'

export default function Home() {
  return (
      <div className='flex gap-4 justify-center mt-16 left-64 w-[calc(100%-256px)] relative'>
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
