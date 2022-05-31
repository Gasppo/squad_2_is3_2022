import { PrismaClient } from '@prisma/client'
import express from 'express'
import { createSupportMember, getAllSupportMembers } from './api/supportMember'


const prisma = new PrismaClient()
const app = express()
app.use(express.json())
app.listen(4000, () => {
  console.log('Server started on http://localhost:4000')
})

app.get('/', async (req, res) => {
  res.send('Hello Worlds!')
})

app.get('/hola', getAllSupportMembers)
app.post('/hola', createSupportMember) 