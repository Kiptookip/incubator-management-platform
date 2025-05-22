"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Technology",
    amount: 500000,
  },
  {
    name: "Healthcare",
    amount: 350000,
  },
  {
    name: "Education",
    amount: 300000,
  },
  {
    name: "Finance",
    amount: 400000,
  },
  {
    name: "Agriculture",
    amount: 450000,
  },
  {
    name: "Other",
    amount: 200000,
  },
]

export function FundingChart() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `${value / 1000}k`} />
          <Tooltip formatter={(value) => [`${value.toLocaleString()}`, "Amount"]} />
          <Legend />
          <Bar dataKey="amount" name="Funding Amount" fill="#1E88E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
