import { PrismaClient } from '@prisma/client'
import express from 'express'
import { createSupportMember, deleteSupportMember, getAllSupportMembers, getSupportMemberById, updateSupportMember } from './api/supportMember'
import { createTicket, deleteTicket, getAllTickets, getTicketById, updateTicket } from './api/ticket'
import { createTicketAuthor, deleteTicketAuthor, getAllTicketAuthors, getTicketAuthorById, updateTicketAuthor } from './api/ticketAuthors'


const prisma = new PrismaClient()
const app = express()
app.use(express.json())
export const server = app.listen(4000, () => {
  console.log('Server started on http://localhost:4000')
})

app.get('/', async (req, res) => {
  res.send('Hello Worlds!')
})


//SupportMembers
app.get('/supportMembers', getAllSupportMembers)
app.get('/supportMembers/:id', getSupportMemberById)
app.post('/supportMembers', createSupportMember) 
app.delete('/supportMembers/:id', deleteSupportMember)
app.put('/supportMembers/:id', updateSupportMember)

//Tickets
app.get('/tickets', getAllTickets)
app.get('/tickets/:id', getTicketById)
app.post('/tickets', createTicket)
app.delete('/tickets/:id', deleteTicket)
app.put('/tickets/:id', updateTicket)

//TicketAuthors
app.get('/ticketAuthors', getAllTicketAuthors)
app.get('/ticketAuthors/:id', getTicketAuthorById)
app.post('/ticketAuthors', createTicketAuthor)
app.delete('/ticketAuthors/:id', deleteTicketAuthor)
app.put('/ticketAuthors/:id', updateTicketAuthor)


export default app