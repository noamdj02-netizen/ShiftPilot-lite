'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getInitials, ROLES, COLORS } from '@/lib/utils'
import type { Collaborateur } from '@/types'

const initialCollaborateurs: Collaborateur[] = [
  { id: '1', name: 'Marie Dupont', role: 'Serveuse', phone: '06 12 34 56 78', email: 'marie@lorsan.fr', contrat: 'CDI', heures: 35, color: '#8B5CF6', disponible: true },
  { id: '2', name: 'Thomas Martin', role: 'Barman', phone: '06 23 45 67 89', email: 'thomas@lorsan.fr', contrat: 'CDI', heures: 35, color: '#F59E0B', disponible: true },
  { id: '3', name: 'Sophie Bernard', role: 'Chef de rang', phone: '06 34 56 78 90', email: 'sophie@lorsan.fr', contrat: 'CDI', heures: 39, color: '#10B981', disponible: true },
  { id: '4', name: 'Lucas Petit', role: 'Commis', phone: '06 45 67 89 01', email: 'lucas@lorsan.fr', contrat: 'CDD', heures: 35, color: '#3B82F6', disponible: false },
  { id: '5', name: 'Emma Leroy', role: 'Serveuse', phone: '06 56 78 90 12', email: 'emma@lorsan.fr', contrat: 'CDI', heures: 35, color: '#EC4899', disponible: true },
  { id: '6', name: 'Antoine Moreau', role: 'Chef cuisinier', phone: '06 67 89 01 23', email: 'antoine@lorsan.fr', contrat: 'CDI', heures: 39, color: '#EF4444', disponible: true },
]

export default function CollaborateursPage() {
  const [collaborateurs, setCollaborateurs] = useState<Collaborateur[]>(initialCollaborateurs)
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Collaborateur>>({
    name: '',
    role: '',
    phone: '',
    email: '',
    contrat: 'CDI',
    heures: 35,
    color: COLORS[0],
    disponible: true,
  })

  const filtered = collaborateurs.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = !filterRole || c.role === filterRole
    return matchSearch && matchRole
  })

  const stats = {
    total: collaborateurs.length,
    disponibles: collaborateurs.filter(c => c.disponible).length,
    cdi: collaborateurs.filter(c => c.contrat === 'CDI').length,
    heuresSem: collaborateurs.reduce((acc, c) => acc + c.heures, 0),
  }

  const handleOpenModal = (id?: string) => {
    if (id) {
      const collab = collaborateurs.find(c => c.id === id)
      if (collab) {
        setFormData(collab)
        setEditingId(id)
      }
    } else {
      setFormData({ name: '', role: '', phone: '', email: '', contrat: 'CDI', heures: 35, color: COLORS[0], disponible: true })
      setEditingId(null)
    }
    setShowModal(true)
  }

  const handleSave = () => {
    if (!formData.name || !formData.role) return
    if (editingId) {
      setCollaborateurs(prev => prev.map(c => c.id === editingId ? { ...c, ...formData } as Collaborateur : c))
    } else {
      const newId = String(Date.now())
      setCollaborateurs(prev => [...prev, { ...formData, id: newId } as Collaborateur])
    }
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    setCollaborateurs(prev => prev.filter(c => c.id !== id))
    setShowDeleteModal(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Collaborateurs</h1>
          <p className="text-slate-400 mt-1">{collaborateurs.length} collaborateur{collaborateurs.length > 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => handleOpenModal()} className="px-4 py-2 bg-gradient-to-r from-[#6C63FF] to-[#4F46E5] rounded-xl text-sm text-white hover:opacity-90 transition-opacity shadow-lg shadow-[#6C63FF]/25 flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">add</span>
          Ajouter
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">search</span>
          <input
            type="text"
            placeholder="Rechercher un collaborateur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#6C63FF]/50"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
        >
          <option value="">Tous les postes</option>
          {ROLES.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-5">
          <p className="text-2xl font-bold text-white mb-1">{stats.total}</p>
          <p className="text-sm text-slate-400">Total</p>
        </div>
        <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-5">
          <p className="text-2xl font-bold text-white mb-1">{stats.disponibles}</p>
          <p className="text-sm text-slate-400">Disponibles</p>
        </div>
        <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-5">
          <p className="text-2xl font-bold text-white mb-1">{stats.cdi}</p>
          <p className="text-sm text-slate-400">CDI</p>
        </div>
        <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-5">
          <p className="text-2xl font-bold text-white mb-1">{stats.heuresSem}h</p>
          <p className="text-sm text-slate-400">Heures/sem</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((collab, idx) => (
          <motion.div
            key={collab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold" style={{ backgroundColor: collab.color }}>
                  {getInitials(collab.name)}
                </div>
                <div>
                  <p className="font-semibold text-white">{collab.name}</p>
                  <p className="text-sm text-slate-400">{collab.role}</p>
                </div>
              </div>
              <div className={`w-2 h-2 rounded-full ${collab.disponible ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="material-symbols-outlined text-base">phone</span>
                {collab.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="material-symbols-outlined text-base">email</span>
                {collab.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="material-symbols-outlined text-base">badge</span>
                {collab.contrat} - {collab.heures}h/sem
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleOpenModal(collab.id)} className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm text-white transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-base">edit</span>
                Modifier
              </button>
              <button onClick={() => setShowDeleteModal(collab.id)} className="flex-1 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-sm text-red-400 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-base">delete</span>
                Supprimer
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <div className="bg-[#1C1C1E] border border-white/10 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-white mb-6">{editingId ? 'Modifier' : 'Ajouter'} un collaborateur</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Nom complet</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                      placeholder="Marie Dupont"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Poste</label>
                    <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white">
                      <option value="">Sélectionner...</option>
                      {ROLES.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Téléphone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                      placeholder="marie@lorsan.fr"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Contrat</label>
                      <select value={formData.contrat} onChange={(e) => setFormData({ ...formData, contrat: e.target.value as any })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white">
                        <option value="CDI">CDI</option>
                        <option value="CDD">CDD</option>
                        <option value="Extra">Extra</option>
                        <option value="Apprenti">Apprenti</option>
                        <option value="Stage">Stage</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Heures/sem</label>
                      <input
                        type="number"
                        value={formData.heures}
                        onChange={(e) => setFormData({ ...formData, heures: parseInt(e.target.value) || 0 })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                        min="0"
                        max="50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Couleur</label>
                    <div className="flex gap-2 flex-wrap">
                      {COLORS.map(color => (
                        <button
                          key={color}
                          onClick={() => setFormData({ ...formData, color })}
                          className={`w-10 h-10 rounded-lg transition-all ${formData.color === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1C1C1E]' : ''}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="disponible"
                      checked={formData.disponible}
                      onChange={(e) => setFormData({ ...formData, disponible: e.target.checked })}
                      className="w-4 h-4 rounded border-white/10 bg-white/5 text-[#6C63FF] focus:ring-[#6C63FF]"
                    />
                    <label htmlFor="disponible" className="text-sm text-slate-400">Disponible</label>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors">
                      Annuler
                    </button>
                    <button onClick={handleSave} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#4F46E5] rounded-xl text-white hover:opacity-90 transition-opacity">
                      {editingId ? 'Enregistrer' : 'Ajouter'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowDeleteModal(null)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <div className="bg-[#1C1C1E] border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-white mb-2">Supprimer le collaborateur</h3>
                <p className="text-slate-400 mb-6">Cette action est irréversible. Êtes-vous sûr ?</p>
                <div className="flex gap-3">
                  <button onClick={() => setShowDeleteModal(null)} className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors">
                    Annuler
                  </button>
                  <button onClick={() => handleDelete(showDeleteModal)} className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-white transition-colors">
                    Supprimer
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

