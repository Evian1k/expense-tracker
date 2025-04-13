import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function ExpenseChart({ data }) {
  const grouped = data.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + Number(exp.amount);
    return acc;
  }, {});

  const chartData = Object.entries(grouped).map(([key, value]) => ({
    category: key,
    total: value,
  }));

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Expenses by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
