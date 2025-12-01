import { useState } from 'react';
import { useSchedule } from '@/hooks/useSchedule';
import { useAuth } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

interface ScheduleGeneratorProps {
  startDate: Date;
  onGenerated?: (result: any) => void;
}

export function ScheduleGenerator({ startDate, onGenerated }: ScheduleGeneratorProps) {
  const { generateSchedule, isLoading, generatedSchedule, commitSchedule } = useSchedule();
  const { user } = useAuth(); // Assuming we have user with organization_id
  
  // Mock IDs for now if user context incomplete in dev
  const organizationId = 'org-id-placeholder'; // Replace with actual
  const establishmentId = 'est-id-placeholder'; // Replace with actual

  const handleGenerate = async () => {
    const startStr = startDate.toISOString().split('T')[0];
    const result = await generateSchedule({
      organizationId, // dynamic from context
      establishmentId,
      startDate: startStr,
      useWeather: true
    });
    if (result && onGenerated) onGenerated(result);
  };

  const handleCommit = async () => {
    if (!generatedSchedule) return;
    // Need to fetch establishmentId from somewhere or context
    await commitSchedule(organizationId, establishmentId, generatedSchedule.shifts, 'DRAFT');
  };

  return (
    <div className="bg-white dark:bg-[#1C1C1E] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#6C63FF]">auto_awesome</span>
          Générateur IA
        </h3>
        
        {!generatedSchedule ? (
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="bg-gradient-to-r from-[#6C63FF] to-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? 'Génération...' : 'Générer le planning'}
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => generateSchedule(null as any)} // Reset hack or add reset method
              className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white px-3 py-2 text-sm font-medium"
            >
              Annuler
            </button>
            <button
              onClick={handleCommit}
              disabled={isLoading}
              className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              Valider & Sauvegarder
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {generatedSchedule && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 mb-4">
              <h4 className="text-sm font-semibold mb-3">Résumé de la génération</h4>
              
              {generatedSchedule.summary.alerts.length > 0 && (
                <div className="mb-4 space-y-2">
                  {generatedSchedule.summary.alerts.map((alert, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg">
                      <span className="material-symbols-outlined text-[16px]">warning</span>
                      {alert}
                    </div>
                  ))}
                </div>
              )}

              {generatedSchedule.summary.weatherAdjustments.length > 0 && (
                <div className="mb-4 space-y-2">
                  {generatedSchedule.summary.weatherAdjustments.map((adj, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                      <span className="material-symbols-outlined text-[16px]">cloud</span>
                      {adj}
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {generatedSchedule.summary.employeesHours.map((emp) => (
                  <div key={emp.employeeId} className="p-2 bg-white dark:bg-[#1C1C1E] rounded border border-slate-200 dark:border-white/5">
                    <p className="text-xs font-medium truncate">{emp.name}</p>
                    <p className="text-xs text-slate-500">
                      {emp.totalHours}h 
                      <span className={emp.deviation > 2 ? 'text-red-500' : 'text-green-500'}>
                        {' '}({emp.deviation > 0 ? '+' : ''}{emp.deviation}h)
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

