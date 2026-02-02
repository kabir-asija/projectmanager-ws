import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import { Button, Box } from "@mui/material";
import { getTasks } from "./api/api.ts";
import type { Task } from "./types";
import Settings from "./pages/Settings";

function App() {
  const [page, setPage] = useState<"dashboard" | "analytics" | "settings">(
    "dashboard",
  );
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

const fetchTasks = async () => {
  try {
    setLoading(true);

    const res = await getTasks();
    
    const taskList = Array.isArray(res.data)
    ? res.data
    : res.data.tasks;

    setTasks(taskList ?? []);
  } catch (err) {
    console.error("Failed to fetch tasks", err);
    setTasks([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Box p={2}>
      <Box
        mb={2}
        display={"flex"}
        gap={5}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Button
          onClick={() => setPage("dashboard")}
          variant={page === "dashboard" ? "contained" : "text"}
        >
          Dashboard
        </Button>
        <Button
          onClick={() => setPage("analytics")}
          variant={page === "analytics" ? "contained" : "text"}
        >
          Analytics
        </Button>
        <Button
          onClick={() => setPage("settings")}
          variant={page === "settings" ? "contained" : "text"}
        >
          Settings
        </Button>
      </Box>

      {page === "dashboard" && (
        <Dashboard tasks={tasks} refreshTasks={fetchTasks} loading={loading} />
      )}

      {page === "analytics" && <Analytics tasks={tasks} />}

      {page === "settings" && <Settings />}
    </Box>
  );
}

export default App;
