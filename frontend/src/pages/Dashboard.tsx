import { useEffect, useState } from "react";
import type { Task } from "../types";
import TaskTable from "../components/TaskTable";
import TaskFilters from "../components/TaskFilters";
import { Button, Box } from "@mui/material";
import TaskFormModal from "../components/TaskFormModal";
import { exportTasksToExcel } from "../utils/exportTasks";

type Props = {
  tasks: Task[];
  refreshTasks: () => void;
  loading: boolean;
};

type SortKey = "dueDate" | "title" | "status" | null;

export default function Dashboard({ tasks, refreshTasks, loading }: Props) {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!sortBy) return 0;

    switch (sortBy) {
      case "dueDate":
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case "title":
        return a.title.localeCompare(b.title);
      case "status":
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  return (
    <Box p={2} display="flex" flexDirection="column" alignItems="center">
      <h1 style={{ alignSelf: "start" }}>Task Management Dashboard</h1>

      <TaskFilters
        tasks={tasks}
        onFilter={setFilteredTasks}
        onSortChange={setSortBy}
        sortBy={sortBy}
      />

      <Box display="flex" justifyContent="flex-end" mb={2} mt={3} gap={4}>
        <Button
          variant="outlined"
          onClick={() => exportTasksToExcel(sortedTasks)}
        >
          Export as XLSX
        </Button>
        <Button variant="contained" onClick={() => setOpen(true)}>
          + Create Task
        </Button>
      </Box>

      <TaskFormModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={refreshTasks}
      />

      {loading ? <p>Loading...</p> : <TaskTable tasks={sortedTasks} />}
    </Box>
  );
}
