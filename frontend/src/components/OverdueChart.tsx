import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import type { Task } from "../types/index.ts";

const COLORS = ["#ef5350", "#ffa726", "#42a5f5", "#66bb6a", "#ab47bc"];

export default function OverdueChart({ tasks }: { tasks: Task[] }) {
  const today = new Date();

  // Filter only overdue tasks
  const overdueTasks = tasks.filter(
    (t) => new Date(t.dueDate) < today && t.status !== "done"
  );

  // Group by category
  const data = Object.values(
    overdueTasks.reduce((acc: Record<string, { name: string; count: number }>, t) => {
      const catName = t.category.name;
      if (!acc[catName]) acc[catName] = { name: catName, count: 0 };
      acc[catName].count += 1;
      return acc;
    }, {})
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" barSize={40}>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
