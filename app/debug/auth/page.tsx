'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AuthDebugPage() {
  const [config, setConfig] = useState<{
    supabaseUrl: string | undefined
    supabaseKey: string | undefined
    hasUrl: boolean
    hasKey: boolean
    clientWorks: boolean
  } | null>(null)
  const [testResult, setTestResult] = useState<string>('')

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    let clientWorks = false
    try {
      const client = createClient()
      clientWorks = !!client
    } catch (e) {
      clientWorks = false
    }

    setConfig({
      supabaseUrl,
      supabaseKey,
      hasUrl: !!supabaseUrl && supabaseUrl !== 'https://placeholder.supabase.co',
      hasKey: !!supabaseKey && supabaseKey !== 'placeholder-key',
      clientWorks,
    })
  }, [])

  const testConnection = async () => {
    setTestResult('Testing...')
    try {
      const client = createClient()
      const { data, error } = await client.auth.getSession()
      
      if (error) {
        setTestResult(`❌ Error: ${error.message}`)
      } else {
        setTestResult(`✅ Session check successful. User: ${data.session?.user?.email || 'Not logged in'}`)
      }
    } catch (e) {
      setTestResult(`❌ Exception: ${e instanceof Error ? e.message : 'Unknown error'}`)
    }
  }

  if (!config) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0B] p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-[#1C1C1E] rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
          🔍 Diagnostic d'authentification
        </h1>

        <div className="space-y-4">
          {/* Configuration */}
          <div className="border border-slate-200 dark:border-white/10 rounded-lg p-4">
            <h2 className="font-semibold mb-3 text-slate-900 dark:text-white">Configuration</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className={config.hasUrl ? 'text-green-600' : 'text-red-600'}>
                  {config.hasUrl ? '✅' : '❌'}
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  NEXT_PUBLIC_SUPABASE_URL: {config.hasUrl ? 'Configuré' : 'Manquant'}
                </span>
              </div>
              {config.supabaseUrl && (
                <div className="ml-6 text-xs text-slate-500 dark:text-slate-400 break-all">
                  {config.supabaseUrl}
                </div>
              )}

              <div className="flex items-center gap-2">
                <span className={config.hasKey ? 'text-green-600' : 'text-red-600'}>
                  {config.hasKey ? '✅' : '❌'}
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  NEXT_PUBLIC_SUPABASE_ANON_KEY: {config.hasKey ? 'Configuré' : 'Manquant'}
                </span>
              </div>
              {config.supabaseKey && (
                <div className="ml-6 text-xs text-slate-500 dark:text-slate-400 break-all">
                  {config.supabaseKey.substring(0, 30)}...
                </div>
              )}

              <div className="flex items-center gap-2">
                <span className={config.clientWorks ? 'text-green-600' : 'text-red-600'}>
                  {config.clientWorks ? '✅' : '❌'}
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  Client Supabase: {config.clientWorks ? 'Fonctionne' : 'Erreur'}
                </span>
              </div>
            </div>
          </div>

          {/* Test */}
          <div className="border border-slate-200 dark:border-white/10 rounded-lg p-4">
            <h2 className="font-semibold mb-3 text-slate-900 dark:text-white">Test de connexion</h2>
            <button
              onClick={testConnection}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tester la connexion Supabase
            </button>
            {testResult && (
              <div className="mt-3 p-3 bg-slate-100 dark:bg-slate-800 rounded text-sm">
                {testResult}
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="border border-blue-200 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h2 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
              Instructions
            </h2>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
              <li>Si les variables sont manquantes, configurez-les dans Vercel Dashboard</li>
              <li>Redéployez après avoir ajouté les variables</li>
              <li>Vérifiez les URLs de redirection dans Supabase Dashboard</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

