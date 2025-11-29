import { LoginForm } from '@/components/auth/LoginForm'

export const metadata = {
  title: 'Connexion | ShiftPilot',
  description: 'Connectez-vous à votre compte ShiftPilot',
}

export default function LoginPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-display-xs text-foreground mb-2">
          Content de vous revoir 👋
        </h1>
        <p className="text-foreground-secondary">
          Connectez-vous pour accéder à vos plannings
        </p>
      </div>
      <LoginForm />
    </>
  )
}
