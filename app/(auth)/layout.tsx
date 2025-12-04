import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full flex bg-[#F5F5F7] dark:bg-[#000000]">
      {/* Left - Form Side */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 bg-white dark:bg-[#000000] border-r border-black/5 dark:border-white/5">
        <div className="w-full max-w-sm mx-auto">
          <Link href="/" className="inline-block mb-12 hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Logo size={32} />
              <span className="text-xl font-bold tracking-tight">ShiftPilot</span>
            </div>
          </Link>
          {children}
        </div>
      </div>

      {/* Right - Visual Side (Desktop only) */}
      <div className="hidden lg:flex lg:w-[55%] bg-[#000000] relative overflow-hidden items-center justify-center p-12">
        {/* Background Effects */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] pointer-events-none opacity-40"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none opacity-40"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" style={{ opacity: 0.1 }}></div>

        <div className="relative z-10 max-w-xl text-center">
          <div className="mb-12 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-blue-500 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-[#1C1C1E] border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden">
              {/* Dashboard Preview Mockup */}
              <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-xs font-mono text-white/30">shiftpilot.app</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                  <div className="text-xs text-white/50 mb-1">Productivité</div>
                  <div className="text-2xl font-bold text-white">94%</div>
                  <div className="text-xs text-green-400 mt-1">+5.2% vs N-1</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                  <div className="text-xs text-white/50 mb-1">Coût Salarial</div>
                  <div className="text-2xl font-bold text-white">28.5%</div>
                  <div className="text-xs text-green-400 mt-1">-1.2% vs obj</div>
                </div>
              </div>
              
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className="w-8 h-8 rounded-full bg-white/10"></div>
                    <div className="flex-1 h-2 bg-white/10 rounded w-full"></div>
                    <div className="w-16 h-2 bg-white/10 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Gérez vos équipes avec <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
              une précision chirurgicale
            </span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Rejoignez les leaders de la restauration qui ont choisi ShiftPilot Enterprise pour scaler leurs opérations.
          </p>
        </div>
      </div>
    </div>
  )
}