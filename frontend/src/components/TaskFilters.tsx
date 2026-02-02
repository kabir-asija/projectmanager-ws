import {
  TextField,
  MenuItem,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { useMemo, useState } from "react";
import type { Task } from "../types/index.ts";

type SortKey = "dueDate" | "title" | "status" | null;

type Props = {
  tasks: Task[];
  onFilter: (tasks: Task[]) => void;
  onSortChange: (key: "dueDate" | "title" | "status" | null) => void;
  sortBy: SortKey;
};

export default function TaskFilters({ tasks, onFilter, onSortChange }: Props) {
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (status) result = result.filter((t) => t.status === status);

    if (category) result = result.filter((t) => t.category.id === category);

    if (tags.length)
      result = result.filter((t) =>
        tags.every((tagId) => t.tags.some((tg) => tg.tag.id === tagId)),
      );

    if (search)
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.description?.toLowerCase().includes(search.toLowerCase()),
      );

    return result;
  }, [status, category, tags, search, tasks]);

  const applyFilters = () => {
    onFilter(filteredTasks);
  };

  const clearFilters = () => {
    setStatus("");
    setCategory("");
    setTags([]);
    setSearch("");
    onFilter(tasks);
  };

  const categories = Array.from(
    new Map(tasks.map((t) => [t.category.id, t.category])).values(),
  );

  const allTags = Array.from(
    new Map(
      tasks.flatMap((t) => t.tags.map((tg) => [tg.tag.id, tg.tag])),
    ).values(),
  );

  return (
    <>
      <h3>Filters</h3>
      <Box display="flex" gap={2} flexWrap="wrap">
        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="todo">Todo</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </TextField>

        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Sort By"
          defaultValue=""
          onChange={(e) =>
            onSortChange(
              e.target.value
                ? (e.target.value as "dueDate" | "title" | "status" | null)
                : null,
            )
          }
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="status">Status</MenuItem>
          <MenuItem value="dueDate">Due Date</MenuItem>
        </TextField>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Tags</InputLabel>
          <Select
            multiple
            value={tags}
            onChange={(e) => setTags(e.target.value as string[])}
            input={<OutlinedInput label="Tags" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                {selected.map((id) => {
                  const tag = allTags.find((t) => t.id === id);
                  return <Chip key={id} label={tag?.name} />;
                })}
              </Box>
            )}
          >
            {allTags.map((tag) => (
              <MenuItem key={tag.id} value={tag.id}>
                {tag.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button variant="contained" onClick={applyFilters}>
          Apply
        </Button>

        <Button onClick={clearFilters}>Clear</Button>
      </Box>
    </>
  );
}
