import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';

import { Libro } from '../../database/models/Libro';

const utente_test_id = process.env.ID_USER_TEST;

describe('it /accordo path', () => {

    var token = "";
    var libro_to_review = {
        isbn: "",
        recensione_id: ""
    };

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_LINK.replace("<password>", process.env.MONGO_PASS), { useNewUrlParser: true, useUnifiedTopology: true } as any);
        const payload = { id: utente_test_id, username: "testone", password: "test" }
        token = jwt.sign(payload, process.env.SUPER_SECRET, { expiresIn: 86400 });

        const isbn1 = "978-1-60309-516-7";
        if (!await Libro.exists({ ISBN: isbn1 })) await Libro.deleteOne({ ISBN: isbn1 });

        const libro_review = new Libro({
            titolo: "test",
            autore: "test",
            ISBN: isbn1,
            generi: ["test"],
            recensioni: []
        });

        libro_review.recensioni.push({ testo: "daeliminare", voto: 5, utenteID: utente_test_id, username: "testone" });
        libro_review.recensioni.push({ testo: "daprendere", voto: 5, utenteID: utente_test_id, username: "testone" });
        const result = await libro_review.save();
        libro_to_review = {
            isbn: result.ISBN,
            recensione_id: result.recensioni[0]._id.toString()
        };
    });

    it("GET /recensioni/get should return 200", async () => {
        const response = await request(app).get("/recensioni/get")
            .query({ isbn: libro_to_review.isbn })
            .set('Accept', 'application/json')
            .set('x-access-token', token);
        expect(response.status).toBe(200);
    });

    it("GET /recensioni/get should return 400", async () => {
        const response = await request(app).get("/recensioni/get")
            .query({ isbn: "test_isbn" })
            .set('Accept', 'application/json')
            .set('x-access-token', token);
        expect(response.status).toBe(400);
    });

    it("POST /recensioni/post should return 200", async () => {
        const response = await request(app).post("/recensioni/post")
        .send({ testo: "test", voto: 5, isbn: libro_to_review.isbn })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(201);
    });

    it("POST /recensioni/post should return 400", async () => {
        const response = await request(app).post("/recensioni/post")
        .send({ testo: "test", voto: 5, isbn: "invalid_isbn" })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(400);
    });

    it("DELETE /recensioni/delete should return 200", async () => {
        const response = await request(app).delete("/recensioni/delete")
        .query({ isbn: libro_to_review.isbn, recensione_id: libro_to_review.recensione_id })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(200);
    });

    it("DELETE /recensioni/delete w invalid isbn should return 400", async () => {
        const response = await request(app).delete("/recensioni/delete")
        .query({ isbn: "test_isbn", recensione_id: libro_to_review.recensione_id })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(400);
    });

    it("DELETE /recensioni/delete w invalid recensione_id should return 400", async () => {
        const response = await request(app).delete("/recensioni/delete")
        .query({ isbn: libro_to_review.isbn, recensione_id: "invalid_id" })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(400);
    });

    afterAll(async () => {
        await Libro.deleteOne({ ISBN: libro_to_review.isbn });
        await mongoose.connection.close();
    });

});


