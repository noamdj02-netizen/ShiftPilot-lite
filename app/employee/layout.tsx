import { EmployeeBottomNav } from '@/components/layout/EmployeeBottomNav'

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black pb-20 md:pb-0">
      <main className="max-w-md mx-auto min-h-screen bg-white dark:bg-[#0D1B2A] shadow-2xl md:my-8 md:rounded-3xl md:overflow-hidden md:h-[800px] relative">
        <div className="h-full overflow-y-auto scrollbar-hide">
           {children}
        </div>
        <EmployeeBottomNav />
      </main>
    </div>
  )
}

