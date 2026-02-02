import * as XLSX from "xlsx";
import type { Task } from "../types";

export function exportTasksToExcel(tasks: Task[]) {
  const rows = tasks.map((t) => ({
    Title: t.title,
    Status: t.status,
    Category: t.category.name,
    Tags: t.tags.map((tg) => tg.tag.name).join(", "),
    DueDate: new Date(t.dueDate).toLocaleDateString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");
  XLSX.writeFile(workbook, "tasks.xlsx");
}