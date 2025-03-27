const connect = require("./connect")

const express = require("express")

const cors = require("cors")

const posts = require("./postRoutes")

const users = require("./userRoutes") 



const app = express()
const PORT = 3000


const corsOptions = {
  origin: 'https://healthedpro-frontend.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods if needed
  credentials: true // Allow credentials if required
};

app.use(cors(corsOptions))

app.use(express.json())
app.use(posts)
app.use(users)



app.listen(PORT, () => {
  connect.connectToServer()
  console.log(`Server is running at port:${PORT}`);
})
