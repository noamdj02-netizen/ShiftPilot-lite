import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function EmployeesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  const { data: profile } = await supabase.from('profiles').select('organization_id').eq('id', user.id).single();
  
  const { data: employees } = await supabase
    .from('profiles')
    .select('*')
    .eq('organization_id', profile?.organization_id)
    .eq('is_active', true);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Employés</h1>
        <button className="bg-[#6C63FF] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#5a52d5]">
            + Ajouter
        </button>
      </div>

      <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-white/5 text-white font-medium">
                <tr>
                    <th className="p-4">Nom</th>
                    <th className="p-4">Rôle</th>
                    <th className="p-4">Contrat</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {employees?.map((emp) => (
                    <tr key={emp.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 text-white font-medium">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                                    {emp.first_name?.[0]}{emp.last_name?.[0]}
                                </div>
                                {emp.first_name} {emp.last_name}
                            </div>
                        </td>
                        <td className="p-4">{emp.role === 'owner' ? 'Gérant' : 'Employé'}</td>
                        <td className="p-4">
                            <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-500 text-xs">
                                {emp.contract_type || 'CDI'}
                            </span>
                        </td>
                        <td className="p-4">{emp.email}</td>
                        <td className="p-4">
                            <button className="text-slate-500 hover:text-white">Modifier</button>
                        </td>
                    </tr>
                ))}
                {(!employees || employees.length === 0) && (
                    <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-500">
                            Aucun employé trouvé. Invitez votre équipe !
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>
    </div>
  )
}

