import { createTicket, deleteTicket, getAllTickets,  getTicketById, updateTicket } from './api/ticket'
import { createTicketAuthor, deleteTicketAuthor, getAllTicketAuthors, getAuthorByCUIT, getTicketAuthorById, updateTicketAuthor } from './api/ticketAuthors'
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
app.get('/', async (req: any, res: any) => {
  res.send('Hello Worlds!')
})


//SupportMembers - Out of scope
// app.get('/supportMembers', getAllSupportMembers)
// app.get('/supportMembers/:id', getSupportMemberById)
// app.post('/supportMembers', createSupportMember) 
// app.delete('/supportMembers/:id', deleteSupportMember)
// app.put('/supportMembers/:id', updateSupportMember)

//Tickets
app.get('/tickets', getAllTickets)
app.get('/tickets/:id', getTicketById)
app.post('/tickets', createTicket)
app.delete('/tickets/:id', deleteTicket)
app.put('/tickets/:id', updateTicket)

//TicketAuthors - Out of scope
// app.get('/ticketAuthors', getAllTicketAuthors)
// app.get('/ticketAuthors/:id', getTicketAuthorById)
// app.get('/ticketAuthors/CUIT/:CUIT', getAuthorByCUIT)
// app.post('/ticketAuthors', createTicketAuthor)
// app.delete('/ticketAuthors/:id', deleteTicketAuthor)
// app.put('/ticketAuthors/:id', updateTicketAuthor)


export default app