import {
  TextField,
  Button,
  MenuItem,
  Box,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip
} from '@mui/material'
import { useEffect, useState } from 'react'
import { createTask, getCategories, getTags } from '../api/api'
import type { Category, Tag } from '../types/index.ts'

export default function TaskForm({ onSuccess }: { onSuccess: () => void }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('todo')
  const [categoryId, setCategoryId] = useState('')
  const [tagIds, setTagIds] = useState<string[]>([])
  const [dueDate, setDueDate] = useState('')

  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    getCategories().then(res => setCategories(res.data))
    getTags().then(res => setTags(res.data))
  }, [])

  const handleSubmit = async () => {
    await createTask({
      title,
      description,
      status,
      categoryId,
      tagIds,
      dueDate
    })
    onSuccess()
    setTitle('')
    setDescription('')
    setCategoryId('')
    setTagIds([])
    setDueDate('')
  }

  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      <TextField
        label="Title"
        required
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <TextField
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <TextField
        select
        label="Status"
        value={status}
        onChange={e => setStatus(e.target.value)}
      >
        <MenuItem value="todo">Todo</MenuItem>
        <MenuItem value="in-progress">In Progress</MenuItem>
        <MenuItem value="done">Done</MenuItem>
      </TextField>

      <TextField
        select
        label="Category"
        required
        value={categoryId}
        onChange={e => setCategoryId(e.target.value)}
        sx={{ minWidth: 160 }}
      >
        {categories.map(c => (
          <MenuItem key={c.id} value={c.id}>
            {c.name}
          </MenuItem>
        ))}
      </TextField>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Tags</InputLabel>
        <Select
          multiple
          value={tagIds}
          onChange={e => setTagIds(e.target.value as string[])}
          input={<OutlinedInput label="Tags" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {selected.map(id => {
                const tag = tags.find(t => t.id === id)
                return <Chip key={id} label={tag?.name} />
              })}
            </Box>
          )}
        >
          {tags.map(tag => (
            <MenuItem key={tag.id} value={tag.id}>
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        type="date"
        label="Due Date"
        InputLabelProps={{ shrink: true }}
        required
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />

      <Button variant="contained" onClick={handleSubmit}>
        Add Task
      </Button>
    </Box>
  )
}
