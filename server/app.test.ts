import app from './app';
import request from 'supertest';


describe('it the root path', () => {
    it('app module should be defined', () => {
        expect(app).toBeDefined();
    });

    it("POST /auth/registrazione should return 201", async () => {
        const response = await request(app).post("/auth/registrazione").send({
            email: "    ",
            password: "    "
        });
        expect(response.status).toBe(201);
    });

    it("POST /auth/registrazione should return 400", async () => {
        const response = await request(app).post("/auth/registrazione").send({
            email: "    ",
            password: "    "
        });
        expect(response.status).toBe(400);
    });

    it("GET /auth/validate should return 200", async () => {
        const response = await request(app).get("/auth/validate").send({
            email: "    ",
            password: "    "
        });
        expect(response.status).toBe(200);
    });

    it("GET /auth/validate should return 400", async () => {
        const response = await request(app).get("/auth/validate").send({
            email: "    ",
            password: "    "
        });
        expect(response.status).toBe(400);
    });

    it("POST /auth/login should return 200", async () => {
        const response = await request(app).post("/auth/login").send({
            email: "    ",
            password: "    "
        });
        expect(response.status).toBe(200);
    });

    it("POST /auth/login should return 401", async () => {
        const response = await request(app).post("/auth/login").send({
            email: "    ",
            password: "    "
        });
        expect(response.status).toBe(401);
    });


});


