import './globals.css'
import { Inter } from 'next/font/google'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Panel from './components/Panel'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'E-Commerce Admin',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  return (
    <html lang="en">
      <body className={inter.className}>
        <Panel children={children}/>
      </body>
    </html>
  )
}