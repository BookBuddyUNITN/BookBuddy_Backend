import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';

import { AccordoModel } from '../../database/models/Accordo';

const utente_test_id = "648468bd5705b5cd76fb432b"

describe('it /accordo path', () => {

    var token = "";

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_LINK.replace("<password>", process.env.MONGO_PASS), { useNewUrlParser: true, useUnifiedTopology: true } as any);
        const payload = { id: utente_test_id, username: "testone", password: "test" }
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
            userID_2: "64846825616ed79c8aab8677",
            libro: "64846bbf4b921c367a1fc772",
            libri_proposti: ["64846de54b921c367a1fc791"]
        })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(201);
    });



    afterAll(async () => {
        await AccordoModel.deleteMany({ userID_1: utente_test_id });
        await mongoose.connection.close();
    });

});


