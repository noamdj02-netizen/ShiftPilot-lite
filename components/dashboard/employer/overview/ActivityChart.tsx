'use client'

import { Chart } from '@/components/dashboard/ui/Chart'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { day: 'Lun', hours: 52 },
  { day: 'Mar', hours: 64 },
  { day: 'Mer', hours: 58 },
  { day: 'Jeu', hours: 68 },
  { day: 'Ven', hours: 62 },
  { day: 'Sam', hours: 72 },
  { day: 'Dim', hours: 66 },
]

export function ActivityChart() {
  return (
    <Chart title="Heures travaillées / jour">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6C63FF" stopOpacity={0.1} />
            </linearGradient>
          </defs>
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
            formatter={(value: number) => [`${value}h`, 'Heures']}
          />
          <Area 
            type="monotone" 
            dataKey="hours" 
            stroke="#6C63FF" 
            fill="url(#colorHours)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Chart>
  )
}

