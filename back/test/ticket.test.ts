import request from 'supertest';
import app, { server } from '../script';

describe('Test Ticket APIs', () => {
    it('Should return all tickets', async () => {
        const response = await request(app).get('/tickets');
        expect(response.status).toBe(200);
        expect(response.body.tickets).toBeDefined();
    })

    it('Should return the created ticket after creation', async () => {
        const response = await request(app).post('/tickets').send({
            "title": "Test Ticket",
            "description": "Test Ticket description",
            "status": "OPEN",
            "priority": 2,
            "authorId": 1,
            "internal": true
        });
        expect(response.status).toBe(200);
        expect(response.body.ticket).toBeDefined();
        expect(response.body.ticket.title).toBe('Test Ticket');
        expect(response.body.ticket.description).toBe('Test Ticket description');
        expect(response.body.ticket.status).toBe('OPEN');
        expect(response.body.ticket.priority).toBe(2);
        expect(response.body.ticket.authorId).toBe(1);
        expect(response.body.ticket.internal).toBe(true);

    })
    
    it('Should return the updated ticket after update', async () => {
        const getAllTicketsRes = await request(app).get('/tickets');
        expect(getAllTicketsRes.body.tickets).toBeDefined();
        const memberAmount = getAllTicketsRes.body.tickets?.length
        const lastID = getAllTicketsRes.body.tickets?.[memberAmount - 1].id;
        console.log(lastID)
        const response = await request(app).put(`/tickets/${lastID}`).send({
            "title": "Test Ticket Changed",
            "description": "Test Ticket description Changed",
        });
        expect(response.status).toBe(200);
        expect(response.body.ticket).toBeDefined();
        expect(response.body.ticket.title).toBe('Test Ticket Changed');
        expect(response.body.ticket.description).toBe('Test Ticket description Changed');
        expect(response.body.ticket.status).toBe('OPEN');
        expect(response.body.ticket.priority).toBe(2);
        expect(response.body.ticket.authorId).toBe(1);
        expect(response.body.ticket.internal).toBe(true);

    })

    it('Should return the deleted ticket after deletion', async () => {
        const getAllTicketsRes = await request(app).get('/tickets');
        expect(getAllTicketsRes.body.tickets).toBeDefined();
        const memberAmount = getAllTicketsRes.body.tickets?.length
        const lastID = getAllTicketsRes.body.tickets?.[memberAmount - 1].id;

        const response = await request(app).delete(`/tickets/${lastID}`);
        expect(response.status).toBe(200);
        expect(response.body.ticket).toBeDefined();
        expect(response.body.ticket.title).toBe('Test Ticket Changed');
        expect(response.body.ticket.description).toBe('Test Ticket description Changed');
        expect(response.body.ticket.status).toBe('OPEN');
        expect(response.body.ticket.priority).toBe(2);
        expect(response.body.ticket.authorId).toBe(1);
        expect(response.body.ticket.internal).toBe(true);

    })

    
    afterAll(done => {
        server.close();
        done();
    });
})