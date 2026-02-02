import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { Task } from "../types/index.ts";

export default function CategoryBarChart({ tasks }: { tasks: Task[] }) {
  const data = Object.values(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tasks.reduce((acc: any, task) => {
      const cat = task.category.name;

      if (!acc[cat]) {
        acc[cat] = { name: cat, count: 0 };
      }

      acc[cat].count += 1;
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
        <Bar dataKey="count" fill="#1976d2" barSize={40}  activeBar={{ fill: "#000" }} />
      </BarChart>
    </ResponsiveContainer>
  );
}
