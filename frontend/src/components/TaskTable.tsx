import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import type { Task } from "../types/index.ts";

export default function TaskTable({ tasks }: { tasks: Task[] }) {
  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 3, backgroundColor: "#f3ffff" }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: "#e0e0ff" }}>
          <TableRow>
            <TableCell>
              <b>Title</b>
            </TableCell>
            <TableCell>
              <b>Status</b>
            </TableCell>
            <TableCell>
              <b>Category</b>
            </TableCell>
            <TableCell>
              <b>Tags</b>
            </TableCell>
            <TableCell>
              <b>Due Date</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} hover>
              <TableCell>{task.title}</TableCell>

              <TableCell>
                <Chip
                  label={task.status}
                  color={
                    task.status === "done"
                      ? "success"
                      : task.status === "in-progress"
                        ? "warning"
                        : "default"
                  }
                  size="small"
                />
              </TableCell>

              <TableCell>
                <Chip
                  label={task.category.name}
                  sx={{
                    backgroundColor: task.category.color,
                    color: "#fff",
                  }}
                  size="small"
                />
              </TableCell>

              <TableCell>
                {task.tags.map((t) => (
                  <Chip
                    key={t.tag.id}
                    label={t.tag.name}
                    size="small"
                    style={{ backgroundColor: t.tag.color, color: "#fff" ,marginRight:2}}
                  />
                ))}
              </TableCell>

              <TableCell>
                {new Date(task.dueDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
