import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersRoute from './app/modules/users/user.route'

const app: Application = express()

app.use(cors())
//parse
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application route
app.use('/api/v1/users/', usersRoute)

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
