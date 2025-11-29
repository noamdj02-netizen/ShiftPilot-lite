import { redirect } from 'next/navigation'

export default function EmployeeHoursPage() {
  // Simple placeholder for hours page
  return (
    <div className="p-4 space-y-6">
       <h1 className="text-2xl font-bold text-slate-900 dark:text-white pt-2">Mes Heures</h1>
       <div className="grid grid-cols-2 gap-4">
         <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl">
           <p className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase">Ce mois</p>
           <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-1">142h</p>
         </div>
         <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl">
           <p className="text-green-600 dark:text-green-400 text-xs font-bold uppercase">Prévu</p>
           <p className="text-3xl font-bold text-green-900 dark:text-green-100 mt-1">151h</p>
         </div>
       </div>
       
       <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden">
         <div className="p-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
           <h3 className="font-bold text-slate-900 dark:text-white">Historique</h3>
         </div>
         <div className="divide-y divide-slate-100 dark:divide-white/5">
           {[1,2,3,4].map((_, i) => (
             <div key={i} className="p-4 flex items-center justify-between">
               <div>
                 <p className="text-sm font-medium text-slate-900 dark:text-white">Semaine {34 - i}</p>
                 <p className="text-xs text-slate-500">Août 2025</p>
               </div>
               <span className="font-mono font-bold text-slate-700 dark:text-slate-300">35h 00</span>
             </div>
           ))}
         </div>
       </div>
    </div>
  )
}

