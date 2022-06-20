import { createTicket, deleteTicket, getAllTickets, getAllTicketsByAuthor, getAllTicketsByProduct, getTicketById, updateTicket } from './api/ticket'
const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const app = express()


app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//Add CORS headers
app.use((req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})


app.use(express.json())
// app.get('/', async (req: any, res: any) => {
//   res.sendFile(__dirname + '/index.html')
// })




//SupportMembers - Out of scope
// app.get('/supportMembers', getAllSupportMembers)
// app.get('/supportMembers/:id', getSupportMemberById)
// app.post('/supportMembers', createSupportMember) 
// app.delete('/supportMembers/:id', deleteSupportMember)
// app.put('/supportMembers/:id', updateSupportMember)

//Tickets
app.get('/tickets', getAllTickets)
app.get('/tickets/:id', getTicketById)
app.get('/tickets/author/:id', getAllTicketsByAuthor)
app.get('/tickets/product/:id', getAllTicketsByProduct)
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