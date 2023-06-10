import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';

import { getWishlistByISBN } from '../../database/manager/managerWishlist';

const utente_test_id = process.env.ID_USER_TEST;


describe('it /wishlist path', () => {

    var token = "";

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_LINK.replace("<password>", process.env.MONGO_PASS), { useNewUrlParser: true, useUnifiedTopology: true } as any);
        const payload = { id: utente_test_id, username: "testone", password: "test" }
        token = jwt.sign(payload, process.env.SUPER_SECRET, { expiresIn: 86400 });
        
    });

    it("GET /wishlist/list should return 200", async () => {
        const response = await request(app).get("/wishlist/list")
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(200);
    });

    it("GET /wishlist/list should return 401", async () => {
        const response = await request(app).get("/wishlist/list")
        expect(response.status).toBe(401);
    });

    it("GET /wishlist/listall should return 200", async () => {
        const response = await request(app).get("/wishlist/listall")
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(200);
    });

    it("GET /wishlist/listall should return 401", async () => {
        const response = await request(app).get("/wishlist/listall")
        expect(response.status).toBe(401);
    });

    it("PUT /wishlist/add should return 201", async () => {
        const response = await request(app).put("/wishlist/add").send({
            isbn: "978-1-60309-502-0"
        })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(201);
    });

    it("PUT /wishlist/add should return 400", async () => {
        const response = await request(app).put("/wishlist/add").send({
            isbn: "invalid_isbn"
        })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(400);
    });

    it("testing di getWishlistByISBN", async () => {
        const wishlist = await getWishlistByISBN("978-1-60309-469-6");
        expect(wishlist).not.toBeNull();
    });

    it("DELETE /wishlist/delete should return 200", async () => {
        const response = await request(app).delete("/wishlist/delete")
        .query({ isbn: "978-1-60309-502-0" })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(200);
    });

    it("DELETE /wishlist/delete should return 400", async () => {
        const response = await request(app).delete("/wishlist/delete")
        .query({ isbn: "invalid_isbn" })
        .set('Accept', 'application/json')
        .set('x-access-token', token);
        expect(response.status).toBe(400);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

});


