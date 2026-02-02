import type { Request, Response } from "express";
import { prisma } from "../prisma.ts";

export const getTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        category: true,
        tags: {
          include: { tag: true },
        },
      },
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

export const createTask = async (req:Request, res:Response) => {
  const { title, description, status, categoryId, dueDate, tagIds } = req.body;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        categoryId,
        dueDate: new Date(dueDate),
        tags: tagIds && tagIds.length > 0
          ? {
              create: tagIds.map((tagId: any) => ({
                tag: { connect: { id: tagId } }
              }))
            }
          : undefined
      },
      include: {
        category: true,
        tags: { include: { tag: true } }
      }
    });

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create task" });
  }
};
