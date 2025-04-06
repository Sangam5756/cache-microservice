import express from "express";
import cacheRoute from "./routes/cacheRoutes";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/cache", cacheRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the Redis Cache API");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
