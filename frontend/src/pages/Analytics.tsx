import { Paper, Typography } from "@mui/material";
import type { Task } from "../types";
import StatusPieChart from "../components/StatusPieChart";
import CategoryBarChart from "../components/CategoryBarChart";
import TimelineChart from "../components/TimelineChart";
import OverdueChart from "../components/OverdueChart";

export default function Analytics({ tasks }: { tasks: Task[] }) {
  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Typography variant="h4" mb={4} fontWeight={600}>
        Analytics Dashboard
      </Typography>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "34px",
        }}
      >
        <div style={{ flex: "1 1 48%" }}>
          <Paper style={cardStyle}>
            <Typography variant="h6" mb={2}>
              Task Status Distribution
            </Typography>
            <StatusPieChart tasks={tasks} />
          </Paper>
        </div>

        <div style={{ flex: "1 1 48%" }}>
          <Paper style={cardStyle}>
            <Typography variant="h6" mb={2}>
              Tasks by Category
            </Typography>
            <CategoryBarChart tasks={tasks} />
          </Paper>
        </div>

        <div style={{ flex: "1 1 48%" }}>
          <Paper style={cardStyle}>
            <Typography variant="h6" mb={2}>
              Task Creation Timeline
            </Typography>
            <TimelineChart tasks={tasks} />
          </Paper>
        </div>

        <div style={{ flex: "1 1 48%" }}>
          <Paper style={cardStyle}>
            <Typography variant="h6" mb={2}>
              Overdue Tasks by Category
            </Typography>
            <OverdueChart tasks={tasks} />
          </Paper>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  padding: "24px",
  height: "320px",
  borderRadius: "16px",
  boxShadow: "0 16px 18px rgba(0,0,0,0.08)",
};
