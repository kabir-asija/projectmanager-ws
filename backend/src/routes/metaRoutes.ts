import { Router } from "express";
import { prisma } from "../prisma.ts";

const router = Router();

router.get("/categories", async (_req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

router.get("/tags", async (_req, res) => {
  const tags = await prisma.tag.findMany();
  res.json(tags);
});

router.post("/tags", async (req, res) => {
  const { name, color } = req.body;
  const newTag = await prisma.tag.create({
    data: { name, color },
  });
  res.json(newTag);
});

router.post("/categories", async (req, res) => {
  const { name, color } = req.body;
  const newCategory = await prisma.category.create({
    data: { name, color },
  });
  res.json(newCategory);
});

router.delete("/tags/:id", async (req, res) => {
  const { id } = req.params;

  const taskCount = await prisma.task.count({
    where: {
      tags: {
        some: {
          tagId: id,
        },
      },
    },
  });

  if (taskCount > 0) {
    return res.status(400).json({
      message: "Cannot delete tag. Tasks are using it.",
    });
  }
  await prisma.taskTag.deleteMany({
    where: { tagId: id },
  });
  await prisma.tag.delete({
    where: { id },
  });
  res.json({ success: true });
});

router.delete("/categories/:id", async (req, res) => {
  const { id } = req.params;
  const taskCount = await prisma.task.count({
    where: { categoryId: id },
  });

  if (taskCount > 0) {
    return res.status(400).json({
      message: "Cannot delete category. Tasks are using it.",
    });
  }

  await prisma.category.delete({ where: { id } });
  res.json({ success: true });
});

export default router;
