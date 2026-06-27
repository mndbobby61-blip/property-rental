"use client";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export default function AdminChart({
  data,
}) {
  return (
    <div className="h-[300px]">

      <ResponsiveContainer>

        <BarChart data={data}>

          <XAxis dataKey="month" />

          <YAxis />

          <Bar dataKey="value" />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}