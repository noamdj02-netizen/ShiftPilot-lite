'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import ScheduleWeekView from '@/components/planning/ScheduleWeekView'

export function PlanningView() {
  const [loading, setLoading] = useState(true)
  const [organizationId, setOrganizationId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOrg() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('organization_id')
        .eq('id', user.id)
        .single()

      setOrganizationId(profile?.organization_id || null)
      setLoading(false)
    }

    fetchOrg()
  }, [])

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-slate-400">Chargement du planning...</div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <ScheduleWeekView />
    </div>
  )
}

