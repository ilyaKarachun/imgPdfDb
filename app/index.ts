import express from "express"
import * as dotenv from "dotenv"
import userRouter from "../routers/userRouter"
import pdfRouter from "../routers/pdfRouter"
import uploadRouter from "../routers/uploadRouter"
import authRouter from "../routers/authRouter"

dotenv.config()

const PORT: number = Number(process.env.APP_PORT) || 2000

const app = express()

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/pdfCreate', pdfRouter)

const start = async () => {
  try {
    await app.listen(PORT)
    console.log(`Server running on port ${PORT}`)
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

start().catch((err) => {
  console.log(`Server stopped with err: ${err}`)
})
