import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';

describe('it the root path', () => {

    var token = "";

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_LINK.replace("<password>", process.env.MONGO_PASS), { useNewUrlParser: true, useUnifiedTopology: true } as any);
        const payload = { id: "64774612a81420f303d426c3", username: "testone", password: "test" }
        token = jwt.sign(payload, process.env.SUPER_SECRET, { expiresIn: 86400 });
    });

    it("POST /auth/registrazione should return 201", async () => {
        const response = await request(app).post("/auth/registrazione").send({
            username: "testone",
            password: "test",
            email: "test@mail.com"
        }).set('Accept', 'application/json');
        expect(response.status).toBe(201);
    });

    it("POST /auth/registrazione should return 401", async () => {
        const response = await request(app).post("/auth/registrazione").send({
            email: "",
            password: "",
            username: ""
        });
        expect(response.status).toBe(401);
    });

    it("GET /auth/validate should return 401", async () => {
        const response = await request(app).get("/auth/validate").query({ token: "test" });
        expect(response.status).toBe(401);
    });


    // da vedere meglio siccome dipende dalla mail
    // it("GET /auth/validate should return 200", async () => {
    //     const response = await request(app).get("/auth/validate").query({ token: token });
    //     expect(response.status).toBe(200);
    // });

    it("POST /auth/login should return 200", async () => {
        const response = await request(app).post("/auth/login").send({
            username: "testone",
            password: "test"
        });
        expect(response.status).toBe(200);
    });

    it("POST /auth/login should return 401", async () => {
        const response = await request(app).post("/auth/login").send({
            username: "devedareerrore",
            password: "daidaierrore"
        });
        expect(response.status).toBe(401);
    });

    it("GET /auth/validatoken should return 401", async () => {
        const response = await request(app).get("/auth/validatoken").query({ token: "test" });
        expect(response.status).toBe(401);
    });

    it("GET /auth/validatoken should return 200", async () => {
        const response = await request(app).get("/auth/validatoken").query({ token: token });
        expect(response.status).toBe(200);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

});


