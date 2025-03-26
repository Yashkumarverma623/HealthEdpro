const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connect = require("./connect");
const posts = require("./postRoutes");
const users = require("./userRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://healthedpro-frontend.vercel.app',
      'https://healthedpro-7teaf75d0-yash-s-projects-2f3638fa.vercel.app',
      'http://localhost:3000',  // Local development
      'http://localhost:5173'   // Vite default port
    ];

    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Explicit headers middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Handle preflight requests
app.options('*', cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.options("*", cors(corsOptions));

app.use("/api/posts", posts);
app.use("/api/users", users);

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

const shutdown = () => {
  console.log("Shutting down server...");
  process.exit(0);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

const startServer = async () => {
  try {
    await connect.connectToServer();
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
