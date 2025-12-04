'use client'

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1B2A] p-4">
      <div className="max-w-md w-full text-center">
        <div className="size-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-amber-500 text-4xl">wifi_off</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Hors ligne</h1>
        <p className="text-slate-400 mb-6">
          Vous n'êtes pas connecté à Internet. Vérifiez votre connexion et réessayez.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          Réessayer
        </button>
      </div>
    </div>
  )
}

