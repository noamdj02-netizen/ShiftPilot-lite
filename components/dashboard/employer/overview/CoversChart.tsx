'use client'

import { Chart } from '@/components/dashboard/ui/Chart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const data = [
  { day: 'Lun', simulés: 180, réels: 165 },
  { day: 'Mar', simulés: 220, réels: 210 },
  { day: 'Mer', simulés: 200, réels: 195 },
  { day: 'Jeu', simulés: 240, réels: 235 },
  { day: 'Ven', simulés: 280, réels: 275 },
  { day: 'Sam', simulés: 320, réels: 315 },
  { day: 'Dim', simulés: 250, réels: 245 },
]

export function CoversChart() {
  return (
    <Chart title="Couverts simulés vs réels">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.2} />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1C1C1E',
              borderColor: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              fontSize: '12px',
              color: '#fff'
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
            iconType="circle"
          />
          <Bar dataKey="simulés" fill="#6C63FF" radius={[8, 8, 0, 0]} />
          <Bar dataKey="réels" fill="#10b981" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Chart>
  )
}

