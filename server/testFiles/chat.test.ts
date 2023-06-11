import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';

import { Chat } from '../../database/models/Chat';
import { AccordoModel } from '../../database/models/Accordo';

const utente_test_id = process.env.ID_USER_TEST;
const utente_test_id2 = "64846825616ed79c8aab8677"



describe('it /accordo path', () => {

    var token = "";
    var chat_to_get = "";
    var accordo_to_get = "";
    var accordo_test_id = "";

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_LINK.replace("<password>", process.env.MONGO_PASS), { useNewUrlParser: true, useUnifiedTopology: true } as any);
        const payload = { id: utente_test_id, username: "testone", password: "test" }
        token = jwt.sign(payload, process.env.SUPER_SECRET, { expiresIn: 86400 });

        

        if (AccordoModel.exists({ libro: "test_libro_test" })) {
            await AccordoModel.deleteMany({ libro: "test_libro_test" });
        }
        const accordo_test = new AccordoModel({
            userID_1: utente_test_id,
            userID_2: utente_test_id2,
            data: new Date(),
            libro: "test_libro_test",
            libri_proposti: ["test_libro1", "test_libro2"],
            libro_scelto: "test_libro1",
            stato: "libro scelto"
        });

        accordo_test_id = (await accordo_test.save())._id.toString();
        
        if (AccordoModel.exists({ idAccordo: "test_accordo" })) {
            await AccordoModel.deleteMany({ idAccordo: "test_accordo" });
        }
        const accordo = new AccordoModel({
            userID_1: utente_test_id,
            userID_2: utente_test_id2,
            data: new Date(),
            libro: "test_libro",
            libri_proposti: ["test_libro1", "test_libro2"],
            libro_scelto: "test_libro1",
            stato: "libro scelto"
        });

        accordo_to_get = (await accordo.save())._id.toString();


        if (Chat.exists({ idAccordo: accordo_to_get })) {
            await Chat.deleteMany({ idAccordo: accordo_to_get });
        }
        const chat = new Chat({
            idAccordo: accordo_to_get,
            idUtente1: utente_test_id,
            idUtente2: utente_test_id2,
            messaggi: []
        });

        chat_to_get = (await chat.save())._id.toString();

    });

    it("GET /chat/myChat should return 200", async () => {
        const response = await request(app).get("/chat/myChat")
            .query({ chatID: chat_to_get, amount: 10, end: 100 })
            .set('Accept', 'application/json')
            .set('x-access-token', token);
        expect(response.status).toBe(200);
    });

    it("GET /chat/myChat should return 400", async () => {
        const response = await request(app).get("/chat/myChat")
            .query({ chatID: "test_chat_id", amount: 10, end: 20 })
            .set('Accept', 'application/json')
            .set('x-access-token', token);
        expect(response.status).toBe(400);
    });

    it("POST /chat/create should return 200", async () => {
        const response = await request(app).post("/chat/create")
            .send({ idAccordo: accordo_test_id, idUtente1: utente_test_id, idUtente2: utente_test_id2 })
            .set('Accept', 'application/json')
            .set('x-access-token', token);
        expect(response.status).toBe(200);
    });

    it("POST /chat/create should return 400", async () => {
        const response = await request(app).post("/chat/create")
            .send({ idAccordo: "test_accordo", idUtente1: utente_test_id, idUtente2: utente_test_id2 })
            .set('Accept', 'application/json')
            .set('x-access-token', token);
        expect(response.status).toBe(400);
    });

    it("POST /chat/messaggi/send should return 200", async () => {
        const response = await request(app).post("/chat/messaggi/send")
            .send({ type: "text", payload: "test_payload", chatID: chat_to_get })
            .set('Accept', 'application/json')
            .set('x-access-token', token);
        expect(response.status).toBe(200);
    });

    it("POST /chat/messaggi/send should return 400", async () => {
        const response = await request(app).post("/chat/messaggi/send")
            .send({ type: "text", payload: "test_payload", chatID: "test_chat_id" })
            .set('Accept', 'application/json')
            .set('x-access-token', token);
        expect(response.status).toBe(400);
    });

    afterAll(async () => {
        await Chat.deleteMany({ _id: chat_to_get });
        await AccordoModel.deleteMany({ _id: accordo_to_get });
        await AccordoModel.deleteMany({ _id: accordo_test_id });
        await mongoose.connection.close();
    });

});


