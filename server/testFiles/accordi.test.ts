import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';

describe('it /accordo path', () => {

    var token = "";

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_LINK.replace("<password>", process.env.MONGO_PASS), { useNewUrlParser: true, useUnifiedTopology: true } as any);
        const payload = { id: "64774612a81420f303d426c3", username: "testone", password: "test" }
        token = jwt.sign(payload, process.env.SUPER_SECRET, { expiresIn: 86400 });
    });

    it("POST /accordi/crea should return 400", async () => {
        const response = await request(app).put("/accordo/crea").send({
            userID_2: "test",
            libro: "test",
            libri_proposti: ["test1", "test2"]
        })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(400);
    });

    it("POST /accordi/crea should return 201", async () => {
        const response = await request(app).put("/accordo/crea").send({
            userID_2: "6460f123711998e3c154fb58",
            data: "test",
            libro: "64807af6c8de8850330acd8c",
            libri_proposti: ["64807af6c8de8850330acd8c", "64807af6c8de8850330acd8c"]
        })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(201);
    });



    afterAll(async () => {
        await mongoose.connection.close();
    });

});


