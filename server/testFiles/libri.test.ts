import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';

import { Libro } from '../../database/models/Libro';

const utente_test_id = process.env.ID_USER_TEST;


describe('it /accordo path', () => {

    var token = "";
    var libro_to_delete = "";
    var libro_to_get = "";

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_LINK.replace("<password>", process.env.MONGO_PASS), { useNewUrlParser: true, useUnifiedTopology: true } as any);
        const payload = { id: utente_test_id, username: "testone", password: "test" }
        token = jwt.sign(payload, process.env.SUPER_SECRET, { expiresIn: 86400 });

        const libro_delete = new Libro({
            titolo: "test",
            autore: "test",
            ISBN: "978-1-60309-507-5",
            generi: ["test"],
            recensioni: []
        });
        libro_to_delete = (await libro_delete.save()).ISBN;

        const libro_get = new Libro({
            titolo: "test",
            autore: "test",
            ISBN: "978-1-60309-258-6",
            generi: ["test"],
            recensioni: []
        });
        libro_to_get = (await libro_get.save()).ISBN;
    });

    it("GET /libro/lista should return 200", async () => {
        const response = await request(app).get("/libro/lista")
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(200);
    });

    it("GET /libro/lista should return 403", async () => {
        const response = await request(app).get("/libro/lista")
        .set('Accept', 'application/json')
        .set('x-access-token', "test_token");
        expect(response.status).toBe(403);
    });

    it("GET /libro/libro should return 200", async () => {
        const response = await request(app).get("/libro/libro")
        .query({ ISBN: libro_to_get })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(200);
    });

    it("GET /libro/libro should return 400", async () => {
        const response = await request(app).get("/libro/libro")
        .query({ ISBN: "invalid_isbn" })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(400);
    });

    it("DELETE /libro/cancella should return 200", async () => {
        const response = await request(app).delete("/libro/cancella")
        .query({ ISBN: libro_to_delete })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(200);
    });

    it("DELETE /libro/cancella should return 400", async () => {
        const response = await request(app).delete("/libro/cancella")
        .query({ ISBN: "invalid_isbn" })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(400);
    });

    afterAll(async () => {
        await Libro.deleteOne({ ISBN: libro_to_delete });
        await Libro.deleteOne({ ISBN: libro_to_get });
        await mongoose.connection.close();
    });

});


