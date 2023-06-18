import cors from 'cors'
import express, { Application } from 'express'
import { UserRoutes } from './app/modules/user/user.route'
import globalErrorHandler from './middlewares/globalErrorHandler'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users/', UserRoutes)

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   Promise.reject(new Error('Something went wrong'))
// // res.send('Hello World')';
// // next()
// })

app.use(globalErrorHandler)
export default app
