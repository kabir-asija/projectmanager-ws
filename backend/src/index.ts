import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.ts";
import metaRoutes from "./routes/metaRoutes.ts";
import seedRoutes from "./routes/seedRoute.ts";

const app = express();

const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ message: "API WORKING!" });
});

app.use("/tasks", taskRoutes);
app.use("/dev", seedRoutes);
app.use("/meta", metaRoutes);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
