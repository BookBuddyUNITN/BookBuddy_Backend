import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';

import { AccordoModel } from '../../database/models/Accordo';

const utente_test_id = process.env.ID_USER_TEST;

describe('it /accordo path', () => {

    var token = "";

    var accordo_to_delete = "";
    var accordo_to_scegli = "";

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_LINK.replace("<password>", process.env.MONGO_PASS), { useNewUrlParser: true, useUnifiedTopology: true } as any);
        const payload = { id: utente_test_id, username: "testone", password: "test" }
        token = jwt.sign(payload, process.env.SUPER_SECRET, { expiresIn: 86400 });

        //crea un accordo finto da eliminare dopo
        const accordo_delete = new AccordoModel({
            userID_1: utente_test_id,
            userID_2: "64846825616ed79c8aab8677", 
            data: Date.now(),  
            libro: "64846bbf4b921c367a1fc772",
            libri_proposti: ["64846de54b921c367a1fc791"]
        });
        accordo_to_delete = (await accordo_delete.save())._id.toString();

        const accordo_scegli = new AccordoModel({
            userID_1: "64846825616ed79c8aab8677",
            userID_2: utente_test_id, 
            data: Date.now(),  
            libro: "64846bbf4b921c367a1fc772",
            libri_proposti: ["64846de54b921c367a1fc791"]
        });
        accordo_to_scegli = (await accordo_scegli.save())._id.toString();
        
    });

    it("PUT /accordi/crea should return 400", async () => {
        const response = await request(app).put("/accordo/crea").send({
            userID_2: "test",
            libro: "test",
            libri_proposti: ["test1", "test2"]
        })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(400);
    });

    it("PUT /accordi/crea should return 201", async () => {
        const response = await request(app).put("/accordo/crea").send({
            userID_2: "64846825616ed79c8aab8677",
            libro: "64846bbf4b921c367a1fc772",
            libri_proposti: ["64846de54b921c367a1fc791"]
        })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(201);
    });

    it("DELETE /accordi/elimina should return 200", async () => {
        const response = await request(app).delete("/accordo/elimina")
        .query({ id: accordo_to_delete })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(200);
    });

    it("DELETE /accordi/elimina should return 400", async () => {
        const response = await request(app).delete("/accordo/elimina")
        .query({ id: "testid" })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(400);
    });

    it("POST /accordi/scegli should return 400", async () => {
        const response = await request(app).post("/accordo/scegli").send({
            id: "testid",
            libro_scelto: "testlibro"
        })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(400);
    });

    it("POST /accordi/scegli should return 200", async () => {
        const response = await request(app).post("/accordo/scegli").send({
            id: accordo_to_scegli,
            libro_scelto: "64846de54b921c367a1fc791"
        })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(200);
    });




    afterAll(async () => {
        await AccordoModel.deleteMany({ userID_1: utente_test_id });
        await AccordoModel.deleteMany({ _id : accordo_to_scegli });
        await AccordoModel.deleteMany({ _id: accordo_to_delete });
        await mongoose.connection.close();
    });

});


