import Link from 'next/link'
import { Logo } from '@/components/shared/Logo'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md mx-auto">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-8">
            <Logo size="md" />
          </Link>
          {children}
        </div>
      </div>

      {/* Right - Visual (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary-dark to-foreground items-center justify-center p-12">
        <div className="max-w-md text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Rejoignez +500 restaurants qui gagnent du temps
          </h2>
          <p className="text-white/80 mb-8">
            Créez vos plannings en 10 secondes, conformes au code du travail.
          </p>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-2xl font-bold">3h</p>
              <p className="text-xs text-white/70">économisées/sem</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-2xl font-bold">100%</p>
              <p className="text-xs text-white/70">conforme</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-2xl font-bold">4.9/5</p>
              <p className="text-xs text-white/70">satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
