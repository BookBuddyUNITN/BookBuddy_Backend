import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';

const utente_test_id = process.env.ID_USER_TEST;

describe('it /ricerca path', () => {

    var token = "";

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_LINK.replace("<password>", process.env.MONGO_PASS), { useNewUrlParser: true, useUnifiedTopology: true } as any);
        const payload = { id: utente_test_id, username: "testone", password: "test" }
        token = jwt.sign(payload, process.env.SUPER_SECRET, { expiresIn: 86400 });

    });

    // locale

    it("POST /ricerca/locale should return 200", async () => {
        const response = await request(app).post("/ricerca/locale").send({
            locazione: [0, 0],
            distanzaMassima: 1000,
            searchString: ""
        }).set('Accept', 'application/json')
            .set('x-access-token', token);
        expect(response.status).toBe(200);
    });

    it("POST /ricerca/locale should return 200", async () => {
        const response = await request(app).post("/ricerca/locale").send({
            locazione: [0, 0],
            distanzaMassima: 1000,
            searchString: "978-1-60309-494-8"
        }).set('Accept', 'application/json')
            .set('x-access-token', token);
        expect(response.status).toBe(200);
    });

    it("POST /ricerca/locale should return 400 (manca distanza)", async () => {
        const response = await request(app).post("/ricerca/locale").send({
            locazione: [0, 0],
            distanzaMassima: 1000
        }).set('Accept', 'application/json')
            .set('x-access-token', token);
        expect(response.status).toBe(400);
    });

    it("POST /ricerca/locale should return 200", async () => {
        const response = await request(app).post("/ricerca/locale").send({
            locazione: [0, 0],
            distanzaMassima: 1000,
            searchString: "Animal Stories"
        }).set('Accept', 'application/json')
            .set('x-access-token', token);
        expect(response.status).toBe(200);
    });


    it("POST /ricerca/locale should return 200", async () => {
        const response = await request(app).post("/ricerca/locale").send({
            locazione: [0, 0],
            distanzaMassima: 1000,
            searchString: "Takei"
        }).set('Accept', 'application/json')
            .set('x-access-token', token);
        expect(response.status).toBe(200);
    });

    // ricerca globale
    it("POST /ricerca/globale should return 200", async () => {
        const response = await request(app).post("/ricerca/globale").send({
            searchString: "Animal Stories"
        }).set('Accept', 'application/json')
            .set('x-access-token', token);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data.libri");
        expect(response.body.data.libri.length).toBe(74);
    });

    it("POST /ricerca/globale should return 200", async () => {
        const response = await request(app).post("/ricerca/globale").send({
            searchString: ""
        }).set('Accept', 'application/json')
            .set('x-access-token', token);
        expect(response.status).toBe(200);
        expect(response.body.data.libri.length).toBe(0);
    });


    afterAll(async () => {
        await mongoose.connection.close();
    });

});


