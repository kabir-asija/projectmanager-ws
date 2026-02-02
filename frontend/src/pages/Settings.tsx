import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

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

export default function Settings() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [catName, setCatName] = useState("");
  const [catColor, setCatColor] = useState("#1976d2");

  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("#9c27b0");

  const fetchAll = async () => {
    const [catRes, tagRes] = await Promise.all([
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/meta/categories`),
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/meta/tags`),
    ]);
    setCategories(catRes.data);
    setTags(tagRes.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAll();
  }, []);

  const addCategory = async () => {
    if (!catName) return;
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/meta/categories`, {
      name: catName,
      color: catColor,
    });
    setCatName("");
    fetchAll();
  };

  const addTag = async () => {
    if (!tagName) return;
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/meta/tags`, {
      name: tagName,
      color: tagColor,
    });
    setTagName("");
    fetchAll();
  };

  const deleteCategory = async (id: string) => {
     if (!window.confirm("Delete this category?")) return;

  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/meta/categories/${id}`);
    fetchAll();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    alert(err.response?.data?.message || "Delete failed");
  }
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/meta/categories/${id}`);
    fetchAll();
  };

  const deleteTag = async (id: string) => {
  if (!window.confirm("Delete this tag?")) return;

  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/meta/tags/${id}`);
    fetchAll();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    alert(err.response?.data?.message || "Delete failed");
  }
};

  return (
    <Box p={3}>
            <h1 style={{ alignSelf: "start" }}>Manage Tags & Categories</h1>


      {/* Categories */}
      <Paper sx={{ p: 2, mb: 4 }} elevation={3}>
        <Typography variant="h6" mb={2}>
          Categories
        </Typography>

        <Box display="flex" gap={2} mb={2}>
          <TextField
            label="Category Name"
            size="small"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
          />
          <TextField
            type="color"
            size="small"
            value={catColor}
            onChange={(e) => setCatColor(e.target.value)}
          />
          <Button variant="contained" onClick={addCategory}>
            Add
          </Button>
        </Box>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Color</TableCell>
              <TableCell width={80}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>
                  <Chip
                    label={c.color}
                    sx={{ backgroundColor: c.color, color: "#fff" }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteCategory(c.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Tags */}
      <Paper sx={{ p: 2 }} elevation={3}>
        <Typography variant="h6" mb={2}>
          Tags
        </Typography>

        <Box display="flex" gap={2} mb={2}>
          <TextField
            label="Tag Name"
            size="small"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
          />
          <TextField
            type="color"
            size="small"
            value={tagColor}
            onChange={(e) => setTagColor(e.target.value)}
          />
          <Button variant="contained" onClick={addTag}>
            Add
          </Button>
        </Box>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Color</TableCell>
              <TableCell width={80}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags.map((t) => (
              <TableRow key={t.id}>
                <TableCell>{t.name}</TableCell>
                <TableCell>
                  <Chip
                    label={t.color}
                    sx={{ backgroundColor: t.color, color: "#fff" }}
                  />
                </TableCell>
                <TableCell>
                 <IconButton onClick={() => deleteTag(t.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
