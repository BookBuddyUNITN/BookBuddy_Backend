import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';

const utente_test_id = process.env.ID_USER_TEST;


describe('it /accordo path', () => {

    var token = "";

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_LINK.replace("<password>", process.env.MONGO_PASS), { useNewUrlParser: true, useUnifiedTopology: true } as any);
        const payload = { id: utente_test_id, username: "testone", password: "test" }
        token = jwt.sign(payload, process.env.SUPER_SECRET, { expiresIn: 86400 });
        
    });

    it("GET /libreriaPersonale should return 200", async () => {
        const response = await request(app).get("/libreriaPersonale/list")
        .query({ id: utente_test_id})
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(200);
    });

    it("GET /libreriaPersonale should return 403", async () => {
        const response = await request(app).get("/libreriaPersonale/list")
        .set('Accept', 'application/json')
        .set('x-access-token', "test_token");
        expect(response.status).toBe(403);
    });

    it("POST /libreriaPersonale should return 201", async () => {
        const response = await request(app).post("/libreriaPersonale").send({
            isbn: "978-1-60309-502-0",
            locazione: [0, 0]
        })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(201);
    });

    it("POST /libreriaPersonale should return 400", async () => {
        const response = await request(app).post("/libreriaPersonale").send({
            isbn: "invalid_isbn",
            locazione: [0, 0]
        })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(400);
    });

    it("DELETE /libreriaPersonale should return 200", async () => {
        const response = await request(app).delete("/libreriaPersonale")
        .query({ isbn: "978-1-60309-502-0" })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(200);
    });

    it("DELETE /libreriaPersonale should return 400", async () => {
        const response = await request(app).delete("/libreriaPersonale")
        .query({ isbn: "invalid_isbn" })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(400);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

});


