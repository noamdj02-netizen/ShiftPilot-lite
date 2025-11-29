import DashboardChat from '@/components/dashboard/DashboardChat'

export default function MessagesPage() {
  return (
    <div className="p-6 space-y-6 h-full">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Messages</h1>
      <DashboardChat />
    </div>
  )
}

