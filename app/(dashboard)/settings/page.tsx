'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { useOrganization } from '@/hooks/useOrganization'
import { useSettings } from '@/hooks/useSettings'

type Tab = 'profile' | 'security' | 'organization' | 'notifications' | 'integrations'

export default function SettingsPage() {
  const { profile } = useAuth()
  const { organization } = useOrganization()
  const { updateProfile, updateOrganization, updatePassword, isLoading } = useSettings()
  
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  
  // Form states
  const [profileForm, setProfileForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
  })
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  })
  const [orgForm, setOrgForm] = useState({
    name: '',
    slug: '',
    siret: '',
    address: ''
  })

  useEffect(() => {
    if (profile) {
      setProfileForm({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
      })
    }
  }, [profile])

  useEffect(() => {
    if (organization) {
      setOrgForm({
        name: organization.name || '',
        slug: organization.slug || '',
        siret: organization.siret || '',
        address: organization.address || ''
      })
    }
  }, [organization])

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return
    await updateProfile(profile.id, {
      first_name: profileForm.first_name,
      last_name: profileForm.last_name
    })
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordForm.new !== passwordForm.confirm) return // Add error toast
    await updatePassword(passwordForm.new)
    setPasswordForm({ current: '', new: '', confirm: '' })
  }

  const handleOrgSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!organization) return
    await updateOrganization(organization.id, orgForm)
  }

  const tabs = [
    { id: 'profile', label: 'Mon Profil', icon: 'person' },
    { id: 'security', label: 'Sécurité', icon: 'security' },
    { id: 'organization', label: 'Entreprise', icon: 'business' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'integrations', label: 'Intégrations', icon: 'extension' },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Paramètres</h1>
        <p className="text-slate-500 dark:text-slate-400">Gérez vos préférences et celles de votre entreprise</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-[#1C1C1E] text-accent shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white dark:bg-[#1C1C1E] rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm p-6 md:p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-2xl">
                <div className="flex items-center gap-6 mb-8">
                  <div className="size-20 rounded-full bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                    {profileForm.first_name?.[0]}{profileForm.last_name?.[0]}
                  </div>
                  <div>
                    <button type="button" className="px-4 py-2 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white text-sm font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                      Changer l'avatar
                    </button>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">JPG, GIF ou PNG. 1MB max.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Prénom</label>
                    <input
                      type="text"
                      value={profileForm.first_name}
                      onChange={(e) => setProfileForm({ ...profileForm, first_name: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-accent/50 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nom</label>
                    <input
                      type="text"
                      value={profileForm.last_name}
                      onChange={(e) => setProfileForm({ ...profileForm, last_name: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-accent/50 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    disabled
                    className="w-full px-4 py-2 bg-slate-100 dark:bg-white/5 border border-transparent rounded-lg text-slate-500 cursor-not-allowed"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isLoading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8 max-w-2xl">
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Mot de passe</h3>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Mot de passe actuel</label>
                      <input
                        type="password"
                        value={passwordForm.current}
                        onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-accent/50 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nouveau mot de passe</label>
                        <input
                          type="password"
                          value={passwordForm.new}
                          onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-accent/50 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Confirmer</label>
                        <input
                          type="password"
                          value={passwordForm.confirm}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-accent/50 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    Mettre à jour le mot de passe
                  </button>
                </form>

                <div className="border-t border-slate-200 dark:border-white/10 pt-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Authentification à deux facteurs</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Ajoutez une couche de sécurité supplémentaire</p>
                    </div>
                    <button className="px-4 py-2 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                      Activer 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'organization' && (
              <form onSubmit={handleOrgSubmit} className="space-y-6 max-w-2xl">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nom de l'établissement</label>
                  <input
                    type="text"
                    value={orgForm.name}
                    onChange={(e) => setOrgForm({ ...orgForm, name: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-accent/50 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">URL du workspace</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 py-2 rounded-l-lg border border-r-0 border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-500 text-sm">
                      shiftpilot.app/
                    </span>
                    <input
                      type="text"
                      value={orgForm.slug}
                      onChange={(e) => setOrgForm({ ...orgForm, slug: e.target.value })}
                      className="flex-1 px-4 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-r-lg focus:ring-2 focus:ring-accent/50 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">SIRET</label>
                    <input
                      type="text"
                      value={orgForm.siret}
                      onChange={(e) => setOrgForm({ ...orgForm, siret: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-accent/50 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Adresse</label>
                  <textarea
                    value={orgForm.address}
                    onChange={(e) => setOrgForm({ ...orgForm, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-accent/50 focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isLoading ? 'Enregistrement...' : 'Sauvegarder les informations'}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-8 max-w-2xl">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Canaux de notification</h3>
                  {[
                    { id: 'email', label: 'Email', desc: 'Recevoir les récapitulatifs et alertes par email' },
                    { id: 'push', label: 'Notifications Push', desc: 'Recevoir des notifications sur votre mobile/navigateur' },
                    { id: 'sms', label: 'SMS', desc: 'Recevoir les alertes urgentes par SMS' },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{item.label}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/30 dark:peer-focus:ring-accent/20 rounded-full peer dark:bg-white/10 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-8 max-w-2xl">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Connecteurs disponibles</h3>
                  {[
                    { name: 'Zettle by PayPal', status: 'active', desc: 'Synchronisation des ventes en temps réel' },
                    { name: 'Tiller / SumUp', status: 'inactive', desc: 'Import des données de caisse' },
                    { name: 'Pennylane', status: 'active', desc: 'Export comptable automatique' },
                    { name: 'Skello', status: 'inactive', desc: 'Import des anciens plannings' },
                  ].map((integration, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-lg bg-white dark:bg-white/10 shadow-sm flex items-center justify-center">
                          <span className="material-symbols-outlined text-slate-400">extension</span>
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{integration.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{integration.desc}</p>
                        </div>
                      </div>
                      <button
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          integration.status === 'active'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-400'
                        }`}
                      >
                        {integration.status === 'active' ? 'Connecté' : 'Connecter'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}