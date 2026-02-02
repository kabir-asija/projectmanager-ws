import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  InputLabel,
  Select,
  Chip,
  OutlinedInput,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

type Category = {
  id: string;
  name: string;
  color: string;
};

type Tag = {
  id: string;
  name: string;
  color: string;
};

export default function TaskFormModal({ open, onClose, onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [categoryId, setCategoryId] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [tags, setTags] = useState<Tag[]>([]);
  const [tagIds, setTagIds] = useState<string[]>([]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
        title,
        description,
        status,
        categoryId,
        dueDate,
        tagIds,
      });
      onSuccess();
      setTitle('')
    setDescription('')
    setCategoryId('')
    setTagIds([])
    setDueDate('')
      onClose();
    } catch {
      alert("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/meta/categories`)
        .then((res) => setCategories(res.data));

      axios
        .get<Tag[]>(`${import.meta.env.VITE_BACKEND_URL}/meta/tags`)
        .then((res) => setTags(res.data));
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Task</DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
          />

          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="todo">Todo</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </TextField>

          <TextField
            select
            label="Category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>

          <InputLabel id="tags-label">Tags</InputLabel>
          <Select
            multiple
            value={tagIds}
            onChange={(e) => setTagIds(e.target.value as string[])}
            input={<OutlinedInput label="Tags" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                {selected.map((id) => {
                  const tag = tags.find((t) => t.id === id);
                  return (
                    <Chip
                      key={id}
                      label={tag?.name}
                      size="small"
                      style={{ backgroundColor: tag?.color, color: "#fff" }}
                    />
                  );
                })}
              </Box>
            )}
          >
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.id}>
                {tag.name}
              </MenuItem>
            ))}
          </Select>

          <TextField
            type="date"
            label="Due Date"
            InputLabelProps={{ shrink: true }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
