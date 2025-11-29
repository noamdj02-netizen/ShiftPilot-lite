import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <Sidebar />
      <main className="lg:pl-64 pt-16 pb-16 md:pb-0">
        <div className="h-full">{children}</div>
      </main>
      <BottomNav />
    </div>
  )
}
