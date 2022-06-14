import request from 'supertest';
import app from '../script';

describe('Test support APIs', () => {
    let server: any;

    beforeAll(async () => {
        server = app.listen(process.env.PORT || 4100)
    })
    
    xit('Should return all support members', async () => {
        const response = await request(app).get('/supportMembers');
        expect(response.status).toBe(200);
        expect(response.body.supportMembers).toBeDefined();
    })

    xit('Should return the created support member after creation', async () => {
        const response = await request(app).post('/supportMembers').send({
            firstName: 'Test',
            lastName: 'SupportMember',
            email: 'supportmember@test.com'
        });
        expect(response.status).toBe(200);
        expect(response.body.supportMember).toBeDefined();
        expect(response.body.supportMember.firstName).toBe('Test');
        expect(response.body.supportMember.lastName).toBe('SupportMember');
        expect(response.body.supportMember.email).toBe('supportmember@test.com');
    })

    xit('Should return the updated support member after update', async () => {
        const getAllSupportMembersRes = await request(app).get('/supportMembers');
        expect(getAllSupportMembersRes.body.supportMembers).toBeDefined();
        const memberAmount = getAllSupportMembersRes.body.supportMembers?.length
        const lastID = getAllSupportMembersRes.body.supportMembers?.[memberAmount - 1].id;

        const response = await request(app).put(`/supportMembers/${lastID}`).send({
            firstName: 'TestUpdated',
            lastName: 'SupportMemberUpdated',
        });
        expect(response.status).toBe(200);
        expect(response.body.supportMember).toBeDefined();
        expect(response.body.supportMember.firstName).toBe('TestUpdated');
        expect(response.body.supportMember.lastName).toBe('SupportMemberUpdated');
        expect(response.body.supportMember.email).toBe('supportmember@test.com');

    })

    xit('Should return the deleted support member after deletion', async () => {
        const getAllSupportMembersRes = await request(app).get('/supportMembers');
        expect(getAllSupportMembersRes.body.supportMembers).toBeDefined();
        const memberAmount = getAllSupportMembersRes.body.supportMembers?.length
        const lastID = getAllSupportMembersRes.body.supportMembers?.[memberAmount - 1].id;

        const response = await request(app).delete(`/supportMembers/${lastID}`);
        expect(response.status).toBe(200);
        expect(response.body.supportMember).toBeDefined();
        expect(response.body.supportMember.firstName).toBe('TestUpdated');
        expect(response.body.supportMember.lastName).toBe('SupportMemberUpdated');
        expect(response.body.supportMember.email).toBe('supportmember@test.com');
    })

    afterAll(done => {
        server.close();
        done();
    });
    
})