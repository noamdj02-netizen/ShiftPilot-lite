'use client'

export default function EmployeesPage() {
  const employees = [
    {
      id: 'E001',
      name: 'Léa Dubois',
      role: 'Serveuse',
      department: 'Salle',
      status: 'Actif',
      type: 'CDI',
      hours: '35h',
      joined: '12/01/2021',
      img: 'https://i.pravatar.cc/150?u=4',
    },
    {
      id: 'E002',
      name: 'Julien Petit',
      role: 'Manager',
      department: 'Direction',
      status: 'En congés',
      type: 'CDI',
      hours: '39h',
      joined: '03/05/2019',
      img: 'https://i.pravatar.cc/150?u=5',
    },
    {
      id: 'E003',
      name: 'Chloé Martin',
      role: 'Barista',
      department: 'Bar',
      status: 'Actif',
      type: 'CDD',
      hours: '25h',
      joined: '10/09/2022',
      img: 'https://i.pravatar.cc/150?u=6',
    },
    {
      id: 'E004',
      name: 'Marc Lefebvre',
      role: 'Cuisinier',
      department: 'Cuisine',
      status: 'Inactif',
      type: 'Extra',
      hours: '0h',
      joined: '15/11/2023',
      img: 'https://i.pravatar.cc/150?u=7',
    },
    {
      id: 'E005',
      name: 'Thomas Bernard',
      role: 'Plongeur',
      department: 'Cuisine',
      status: 'Actif',
      type: 'CDI',
      hours: '35h',
      joined: '20/02/2022',
      img: 'https://i.pravatar.cc/150?u=8',
    },
  ]

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      {/* Header */}
      <div className="px-6 py-5 bg-white dark:bg-surface-dark border-b border-steel-dark/30 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-bold">Collaborateurs</h1>
          <p className="text-xs text-slate-500 mt-1">Gestion administrative et contractuelle</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-steel-dark/50 rounded text-sm font-medium hover:bg-white/5 transition flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">upload</span> Import CSV
          </button>
          <button className="px-4 py-2 bg-accent text-white rounded text-sm font-medium hover:bg-accent/90 transition flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-sm">add</span> Nouveau
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 flex flex-wrap items-center gap-3">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-lg">search</span>
          <input
            type="text"
            placeholder="Rechercher (Nom, ID, Rôle)..."
            className="pl-9 pr-4 py-1.5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-steel-dark/30 rounded text-sm w-72 focus:ring-1 focus:ring-accent focus:border-accent"
          />
        </div>
        <div className="h-8 w-px bg-steel-dark/30 mx-2"></div>
        <select className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-steel-dark/30 rounded px-3 py-1.5 text-sm focus:ring-accent">
          <option>Tous les départements</option>
          <option>Salle</option>
          <option>Cuisine</option>
          <option>Bar</option>
        </select>
        <select className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-steel-dark/30 rounded px-3 py-1.5 text-sm focus:ring-accent">
          <option>Statut: Tous</option>
          <option>Actif</option>
          <option>Inactif</option>
        </select>
      </div>

      {/* Data Grid */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        <div className="bg-white dark:bg-surface-dark border border-steel-dark/30 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-[#151e32] border-b border-steel-dark/30">
              <tr>
                <th className="px-6 py-3 font-semibold text-slate-600 dark:text-slate-300 uppercase text-xs tracking-wider">
                  Identité
                </th>
                <th className="px-6 py-3 font-semibold text-slate-600 dark:text-slate-300 uppercase text-xs tracking-wider">
                  Poste
                </th>
                <th className="px-6 py-3 font-semibold text-slate-600 dark:text-slate-300 uppercase text-xs tracking-wider">
                  Contrat
                </th>
                <th className="px-6 py-3 font-semibold text-slate-600 dark:text-slate-300 uppercase text-xs tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 font-semibold text-slate-600 dark:text-slate-300 uppercase text-xs tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-dark/20">
              {employees.map((emp, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.img}
                        alt={emp.name}
                        className="size-9 rounded-full object-cover border border-steel-dark/30"
                      />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{emp.name}</p>
                        <p className="text-xs text-slate-500">ID: {emp.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-700 dark:text-slate-300">{emp.role}</p>
                    <p className="text-xs text-slate-500">{emp.department}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 border border-steel-dark/30 rounded text-xs font-mono text-slate-500">
                        {emp.type}
                      </span>
                      <span className="text-xs text-slate-500">{emp.hours}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Depuis: {emp.joined}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        emp.status === 'Actif'
                          ? 'bg-success/10 text-success border-success/20'
                          : emp.status === 'En congés'
                          ? 'bg-warning/10 text-warning border-warning/20'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-500 border-slate-200 dark:border-white/10'
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 hover:text-accent">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button className="p-1 hover:text-accent">
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center text-xs text-slate-500">
          <p>Affichage de 5 sur 42 collaborateurs</p>
          <div className="flex gap-1">
            <button className="px-2 py-1 border border-steel-dark/30 rounded hover:bg-white/5 disabled:opacity-50">
              Précédent
            </button>
            <button className="px-2 py-1 border border-steel-dark/30 rounded hover:bg-white/5">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  )
}
