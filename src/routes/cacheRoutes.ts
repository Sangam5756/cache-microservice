import express, { Request, Response } from "express";
import redis from "../redisClient";

const router = express.Router();

// get the cache with a key
router.get("/:key", async (req: Request, res: Response): Promise<any> => {
  const key = req.params.key;
  const value = await redis.get(key);

  if (!value) {
    return res.status(404).json({ message: "cache miss" });
  }

  res.json({ message: "cache hit", value: JSON.parse(value) });
});

// set the cache with a key and value
router.post("/:key", async (req: Request, res: Response): Promise<any> => {
  const key = req.params.key;
  const { value, ttl } = req.body;
  if (!value) {
    return res.status(400).json({ message: "value is required" });
  }
  const isPresent = await redis.exists(key);
  if (isPresent) {
    return res.status(409).json({ message: "cache already exists" });
  }
  await redis.set(key, JSON.stringify(value), "EX", ttl || 60 * 60 * 24);
  res.json({ message: "cache set", key, ttl });
});

// delete the cache if the data is updated
router.delete("/:key", async (req: Request, res: Response): Promise<any> => {
  const key = req.params.key;
  if (!key) {
    return res.status(400).json({ message: "key is required" });
  }
  await redis.del(key);
  res.json({ message: "cache deleted", key });
});

export default router;
