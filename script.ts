import { createSupportMember, deleteSupportMember, getAllSupportMembers, getSupportMemberById, updateSupportMember } from './api/supportMember'
import { createTicket, deleteTicket, getAllTickets, getAllTicketsWithAuthor, getTicketById, updateTicket } from './api/ticket'
import { createTicketAuthor, deleteTicketAuthor, getAllTicketAuthors, getTicketAuthorById, updateTicketAuthor } from './api/ticketAuthors'
const express = require('express')

const app = express()

//Add CORS headers
app.use((req: any, res: any, next: any ) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})


app.use(express.json())
export const server = app.listen(4123, () => {
  console.log('Server started on http://localhost:4000')
})

app.get('/', async (req: any, res: any) => {
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
app.get('/tickets/full', getAllTicketsWithAuthor)
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