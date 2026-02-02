import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { Task } from "../types";

export default function TimelineChart({ tasks }: { tasks: Task[] }) {
  // Group tasks by date (YYYY-MM-DD)
  const data = Object.values(
    tasks.reduce((acc: Record<string, { date: string; count: number }>, task) => {
      const dateKey = new Date(task.dueDate).toISOString().split("T")[0];
      if (!acc[dateKey]) acc[dateKey] = { date: dateKey, count: 0 };
      acc[dateKey].count += 1;
      return acc;
    }, {})
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#1976d2" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}
