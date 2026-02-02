import { Router } from "express";
import { prisma } from "../prisma.ts";

const router = Router();

router.post("/seed", async (_req, res) => {
  try {
    const categories = await prisma.category.createMany({
      data: [
        { name: "Work", color: "#FF5733" },
        { name: "Personal", color: "#33FF57" },
        { name: "Urgent", color: "#3357FF" },
      ],
      skipDuplicates: true,
    });

    const tags = await prisma.tag.createMany({
      data: [
        { name: "High Priority", color: "#FF33A1" },
        { name: "Low Priority", color: "#33FFA5" },
        { name: "Optional", color: "#FFC133" },
      ],
      skipDuplicates: true,
    });

    res.json({ message: "Seeded categories & tags" });
  } catch (err) {
    res.status(500).json({ error: "Seeding failed" });
  }
});

export default router;
