# 🧠 Redis Cache Server

## 💡 What is it?

This is a **custom-built cache server** that lets your backend services store and retrieve data using a centralized Redis server.

Instead of every service managing Redis by itself, this server gives you a **simple HTTP API** to interact with Redis.

Think of it like:

```
Your Services ---> [Cache Server] ---> [Redis]
```

---

## 📘 Why Use a Cache?

Caching helps you:

- ⚡ **Speed up responses** (skip DB calls)
- 🧠 **Store temporary data** (like OTPs, search results)
- 💵 **Save resources** (less CPU/DB usage)
- 🔁 **Share data across services** (OTP, user profile, etc.)

---

## 🚀 How It Works – Simple Routes

All routes start with:

```
https://your-cache-domain.com/cache
```

---

### 🔍 1. GET Cached Data

**Use this to check if data exists in cache.**

```http
GET /cache/any-key
```

**Example:**

```http
GET /cache/user:123
```

✅ If found:

```json
{
  "message": "cache hit",
  "value": { "name": "Alice", "role": "admin" }
}
```

❌ If not found:

```json
{
  "message": "cache miss"
}
```

---

### 💾 2. SET Cache

**Use this to store data with optional expiry (TTL).**

```http
POST /cache/any-key
Content-Type: application/json
```

**Body:**

```json
{
  "value": { "name": "Alice" },
  "ttl": 300
}
```

**Example:**

```http
POST /cache/user:123
{
  "value": { "name": "Alice" },
  "ttl": 3600
}
```

---

### 🗑️ 3. DELETE Cache

**Use this when you update or no longer need cached data.**

```http
DELETE /cache/any-key
```

**Example:**

```http
DELETE /cache/user:123
```
---

## ✅ Benefits

| Feature | Benefit |
|--------|---------|
| 🚀 Fast | Skips DB, returns cached data instantly |
| 🔁 Reusable | Can be used in LMS, service discovery, etc. |
| 📦 Centralized | One server handles cache for everything |
| ⏳ TTL Support | Auto-expiry of old data |
| 🛠️ Easy API | No need to use Redis client libraries |

---

## 🧠 Common Use Cases

| Use Case | Key | TTL |
|----------|-----|-----|
| OTP storage | `otp:user@example.com` | 5 min |
| User data cache | `user:123` | 1 hr |
| API response | `cache:/courses` | 10 min |
| Search results | `search:reactjs` | 2 min |
