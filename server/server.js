import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import { serve } from "inngest/express";
import { inngest, functions } from './inngest/index.js';
import dotenv from 'dotenv';
dotenv.config()

const app = express()
await connectDB();

const port = 3000

app.use(express.json());
app.use(cors())

app.use("/api/inngest", serve({ client: inngest, functions }));
        
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

export default app; 