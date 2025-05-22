"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 12,
  },
  {
    name: "Feb",
    total: 16,
  },
  {
    name: "Mar",
    total: 10,
  },
  {
    name: "Apr",
    total: 22,
  },
  {
    name: "May",
    total: 30,
  },
  {
    name: "Jun",
    total: 28,
  },
  {
    name: "Jul",
    total: 18,
  },
  {
    name: "Aug",
    total: 24,
  },
  {
    name: "Sep",
    total: 14,
  },
  {
    name: "Oct",
    total: 8,
  },
  {
    name: "Nov",
    total: 16,
  },
  {
    name: "Dec",
    total: 24,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Bar dataKey="total" fill="#1E88E5" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
