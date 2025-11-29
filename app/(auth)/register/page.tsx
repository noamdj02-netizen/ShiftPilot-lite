import { Suspense } from 'react'
import { RegisterForm } from '@/components/auth/RegisterForm'

export const metadata = {
  title: 'Inscription | ShiftPilot',
  description: 'Créez votre compte ShiftPilot et commencez votre essai gratuit de 14 jours',
}

export default function RegisterPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-display-xs text-foreground mb-2">
          Créez votre compte 🚀
        </h1>
        <p className="text-foreground-secondary">
          14 jours gratuits, sans carte bancaire
        </p>
      </div>
      <Suspense fallback={<div>Chargement...</div>}>
        <RegisterForm />
      </Suspense>
    </>
  )
}
