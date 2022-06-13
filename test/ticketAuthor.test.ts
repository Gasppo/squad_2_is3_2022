import request from 'supertest';
import app, { server } from '../script';

describe('Test Ticket Author APIs', () => {
    it('Should return all ticket authors', async () => {
        const response = await request(app).get('/ticketAuthors');
        expect(response.status).toBe(200);
        expect(response.body.ticketAuthors).toBeDefined();
    })

    it('Should return the created ticket author after creation', async () => {
        const response = await request(app).post('/ticketAuthors').send({
            razonSocial: "UNIVERSIDAD CATOLICA ARGENTINA",
            CUIT: "30-53621658-4",
        });
        expect(response.status).toBe(200);
        expect(response.body.ticketAuthor).toBeDefined();
        expect(response.body.ticketAuthor.razonSocial).toBe("UNIVERSIDAD CATOLICA ARGENTINA");
        expect(response.body.ticketAuthor.CUIT).toBe('30-53621658-4');

    })

    it('Should return the updated ticket author after update', async () => {

        const getAllTicketAuthorsRes = await request(app).get('/ticketAuthors');
        expect(getAllTicketAuthorsRes.body.ticketAuthors).toBeDefined();
        const memberAmount = getAllTicketAuthorsRes.body.ticketAuthors?.length
        const lastID = getAllTicketAuthorsRes.body.ticketAuthors?.[memberAmount - 1].id;

        const response = await request(app).put(`/ticketAuthors/${lastID}`).send({
            razonSocial: "UCA",
        });
        expect(response.status).toBe(200);

        expect(response.body.ticketAuthor).toBeDefined();
        expect(response.body.ticketAuthor.razonSocial).toBe("UCA");
        expect(response.body.ticketAuthor.CUIT).toBe('30-53621658-4');

    })

    it('Should return the deleted ticket author after deletion', async () => {
        const getAllTicketAuthorsRes = await request(app).get('/ticketAuthors');
        expect(getAllTicketAuthorsRes.body.ticketAuthors).toBeDefined();
        const memberAmount = getAllTicketAuthorsRes.body.ticketAuthors?.length
        const lastID = getAllTicketAuthorsRes.body.ticketAuthors?.[memberAmount - 1].id;

        const response = await request(app).delete(`/ticketAuthors/${lastID}`);
        expect(response.status).toBe(200);
        expect(response.body.ticketAuthor).toBeDefined();
        expect(response.body.ticketAuthor.razonSocial).toBe("UCA");
        expect(response.body.ticketAuthor.CUIT).toBe('30-53621658-4');
    })

    afterAll(done => {
        server.close();
        done();
    });

})