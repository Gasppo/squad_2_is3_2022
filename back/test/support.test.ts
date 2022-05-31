import request from 'supertest';
import app, { server } from '../script';

describe('Test support APIs', () => {
    it('Should return all support members', async () => {
        const response = await request(app).get('/supportMembers');
        expect(response.status).toBe(200);
        expect(response.body.supportMembers).toBeDefined();
    })

    it('Should return the created support member after creation', async () => {
        const response = await request(app).post('/supportMembers').send({
            name: 'Test',
            email: 'test@test.com'
        });
        expect(response.status).toBe(200);
        expect(response.body.supportMember).toBeDefined();
        expect(response.body.supportMember.name).toBe('Test');
        expect(response.body.supportMember.email).toBe('test@test.com')
    })

    it('Should return the updated support member after update', async () => {
        const getAllSupportMembersRes = await request(app).get('/supportMembers');
        expect(getAllSupportMembersRes.body.supportMembers).toBeDefined();
        const memberAmount = getAllSupportMembersRes.body.supportMembers?.length
        const lastID = getAllSupportMembersRes.body.supportMembers?.[memberAmount - 1].id;

        const response = await request(app).put(`/supportMembers/${lastID}`).send({
            name: 'Test',
            email: 'new@test.com'
        });
        expect(response.status).toBe(200);
        expect(response.body.supportMember).toBeDefined();
        expect(response.body.supportMember.name).toBe('Test');
        expect(response.body.supportMember.email).toBe('new@test.com')
    })

    it('Should return the deleted support member after deletion', async () => {
        const getAllSupportMembersRes = await request(app).get('/supportMembers');
        expect(getAllSupportMembersRes.body.supportMembers).toBeDefined();
        const memberAmount = getAllSupportMembersRes.body.supportMembers?.length
        const lastID = getAllSupportMembersRes.body.supportMembers?.[memberAmount - 1].id;

        const response = await request(app).delete(`/supportMembers/${lastID}`);
        expect(response.status).toBe(200);
        expect(response.body.supportMember).toBeDefined();
        expect(response.body.supportMember.name).toBe('Test');
        expect(response.body.supportMember.email).toBe('new@test.com')
    })

    afterAll(done => {
        server.close();
        done();
    });
    
})