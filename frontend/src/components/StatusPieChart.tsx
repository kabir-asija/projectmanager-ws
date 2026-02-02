import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { Task } from "../types/index.ts";
import { Typography, Box } from "@mui/material";

const COLORS = {
  todo: "#9e9e9e",
  "in-progress": "#ff9800",
  done: "#4caf50",
};

export default function StatusPieChart({ tasks }: { tasks: Task[] }) {
  const data = [
    { name: "Todo", value: tasks.filter((t) => t.status === "todo").length },
    {
      name: "In Progress",
      value: tasks.filter((t) => t.status === "in-progress").length,
    },
    { name: "Done", value: tasks.filter((t) => t.status === "done").length },
  ];

  const total = data.reduce((sum, d) => sum + d.value, 0);

  if (!total) {
    return <Typography align="center">No data</Typography>;
  }

  return (
    <Box height={300}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={100}
            label
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={
                  COLORS[
                    entry.name
                      .toLowerCase()
                      .replace(" ", "-") as keyof typeof COLORS
                  ]
                }
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}
