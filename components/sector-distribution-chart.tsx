"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Technology", value: 35 },
  { name: "Healthcare", value: 20 },
  { name: "Education", value: 15 },
  { name: "Finance", value: 10 },
  { name: "Agriculture", value: 15 },
  { name: "Other", value: 5 },
]

const COLORS = ["#1E88E5", "#64B5F6", "#FFCA28", "#FFA726", "#42A5F5", "#90CAF9"]

export function SectorDistributionChart() {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
