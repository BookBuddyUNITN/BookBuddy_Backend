import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';

import scambioModel from '../../database/models/Scambio';
import Location from '../../database/classes/Location';

const utente_test_id = process.env.ID_USER_TEST;
const utente_test_id2 = "64846825616ed79c8aab8677"

describe('it /accordo path', () => {

    var token = "";
    var scambio_to_get = "";
    var scambio_to_delete = "";

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_LINK.replace("<password>", process.env.MONGO_PASS), { useNewUrlParser: true, useUnifiedTopology: true } as any);
        const payload = { id: utente_test_id, username: "testone", password: "test" }
        token = jwt.sign(payload, process.env.SUPER_SECRET, { expiresIn: 86400 });


        if (!await scambioModel.exists({ utente1: "testone_to_get", utente2: "testtwo_to_get" })) await scambioModel.deleteOne({ utente1: "testone_to_get", utente2: "testtwo_to_get" });
        const scambio = new scambioModel({
            utente1: "testone_to_get",
            utente2: "testtwo_to_get",
            libro1: "testlibro1",
            libro2: "testlibro2",
            data: Date.now(),
            locazione: new Location(0, 0)
        });
        const result = await scambio.save();
        scambio_to_get = result._id.toString();

        if (!await scambioModel.exists({ utente1: "testone_to_delete", utente2: "testtwo_to_delete" })) await scambioModel.deleteOne({ utente1: "testone_to_delete", utente2: "testtwo_to_delete" });
        const scambio2 = new scambioModel({
            utente1: "testone_to_delete",
            utente2: "testtwo_to_delete",
            libro1: "testlibro1",
            libro2: "testlibro2",
            data: Date.now(),
            locazione: new Location(0, 0)
        });
        const result2 = await scambio2.save();
        scambio_to_delete = result2._id.toString();

    });

    it("GET /scambi/get should return 200", async () => {
        const response = await request(app).get("/scambi/get")
            .query({ id: scambio_to_get })
            .set('Accept', 'application/json')
            .set('x-access-token', token);
        expect(response.status).toBe(200);
    });

    it("GET /scambi/get should return 400", async () => {
        const response = await request(app).get("/scambi/get")
            .query({ id: "test_id" })
            .set('Accept', 'application/json')
            .set('x-access-token', token);
        expect(response.status).toBe(400);
    });

    it("POST /scambi/get  should return 201", async () => {
        const response = await request(app).post("/scambi/post ")
            .send({
                utente2: utente_test_id2,
                libro1: "64846dda4b921c367a1fc789",
                libro2: "64846ddf4b921c367a1fc78d",
                location: new Location(0, 0),
                data: Date.now()
            })
            .set('Accept', 'application/json')
            .set('x-access-token', token);
        expect(response.status).toBe(201);
    });

    it("POST /scambi/get  should return 400", async () => {
        const response = await request(app).post("/scambi/post ")
            .send({
                utente2: "testtwo_to_get",
                libro1: "testlibro1",
                libro2: "testlibro2",
                location: new Location(0, 0),
                data: Date.now()
            })
            .set('Accept', 'application/json')
            .set('x-access-token', token);
        expect(response.status).toBe(400);
    });

    it("DELETE /scambi/delete should return 200", async () => {
        const response = await request(app).delete("/scambi/delete")
        .query({ id: scambio_to_delete })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(200);
    });

    it("DELETE /scambi/delete should return 400", async () => {
        const response = await request(app).delete("/scambi/delete")
        .query({ id: "test_id" })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(400);
    });

    it("PUT /scambi/confirm should return 200", async () => {
        const response = await request(app).put("/scambi/confirm")
        .send({ id: scambio_to_get })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(200);
    });
    
    it("PUT /scambi/confirm should return 400", async () => {
        const response = await request(app).put("/scambi/confirm")
        .query({ id: "test_id" })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(400);
    });


    afterAll(async () => {
        await scambioModel.deleteOne({ _id: scambio_to_get });
        await scambioModel.deleteOne({ _id: scambio_to_delete });
        await mongoose.connection.close();
    });

});


