import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import router from './app/modules/users/users.route'
import globalErrorHandler from './middlewares/globalErrorHandler'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users/', router)
app.use(globalErrorHandler)

app.get('/', async (req: Request, res: Response) => {
  res.send('University Management System Server is Up and Running')
})

export default app
