const express = require("express")
const cors = require("cors")

const app = express()

// Detailed CORS configuration
const corsOptions = {
  origin: [
    'https://healthedpro-frontend.vercel.app',
    'http://localhost:3000' // Include localhost for local development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'Access-Control-Allow-Methods',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Headers'
  ],
  credentials: true,
  optionsSuccessStatus: 200
}

// Apply CORS with specific options
app.use(cors(corsOptions))

// Handle preflight requests explicitly
app.options('*', cors(corsOptions))

// Rest of your existing middleware and routes
app.use(express.json())
app.use("/api/posts", posts)
app.use("/api/users", users)

module.exports = app
