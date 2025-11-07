import { Application } from "express";
import Server from "../../server";
import request from 'supertest';
import FieldModel from './../../models/implementations/mock/mockField'
import { getFields, getOneField } from "../fake/fields.fake";
import { describe, it, expect, beforeAll, beforeEach, test, vi } from 'vitest';

const message = "on port 3000";
let app:Application
let server:Server;
vi.mock('./../../models/implementations/mock/mockField', () => ({
  default: {
    getFields: vi.fn(),
    getField: vi.fn(),
    addField: vi.fn(),
    editFieldName: vi.fn(),
    editFieldType: vi.fn(),
    editFieldPrice: vi.fn(),
    deleteField: vi.fn()
  }
}));
const mockedFieldModel = vi.mocked(FieldModel);

describe('integration [GET] /', ()=> {
    beforeAll(async ()=>{
        server = new Server(3000);
        app = server.app;
        const newField = await getOneField()
        console.log(newField);
    });
    test("Should return Hello World", ()=>{
        return request(app).get('/').expect(200).then((response)=>{
            expect(response.text).toEqual(message)
        })
    })
})

describe('integration [GET] /fields/', ()=>{

    test("Elements quantity should be 5", async ()=>{
        const fields = await getFields(5);
        mockedFieldModel.getFields.mockResolvedValue(fields);

        return request(app).get("/fields/").then(({ body })=>{
            expect(body.length).toBe(5)
        })
    })
})

describe('integration [GET] /fields/:id', ()=>{
    test("should return one field", async()=>{
        const oneField = await getOneField();
        mockedFieldModel.getField.mockResolvedValue(oneField);

        const id = oneField.getId();

        const { status, body } = await request(app).get(`/fields/${id}`);
        expect(status).toBe(200)
        expect(body).toEqual(oneField)
    })
})

describe('integration [POST] /fields/', ()=>{
    test("should create a test", async () =>{
        const oneField = await getOneField();
        mockedFieldModel.addField.mockResolvedValue(oneField);

        const data = {
            name: oneField.getName(),
            type: oneField.getTypeField(),
            price: oneField.getPrice()
        };

        const { status, body } = await request(app)
            .post("/fields/")
            .send(data);

        expect(status).toBe(201);
        expect(body.name).toBe(data.name);
        expect(body.typeField).toBe(data.type);
        expect(body.price).toBe(data.price);
    })
})

describe('integration [PUT] /fields/:id/name', ()=>{
    test("Should update the field name", async ()=>{
        const oneField = await getOneField();
        mockedFieldModel.editFieldName.mockResolvedValue({
            ...oneField,
            getName: () => "New Name"
        });
        const { status, body } = await request(app).put(`/fields/name`).send({ id: oneField.getId(), name: "New Name" });
        expect(status).toBe(200);
        expect(body.name).toBe("New Name")
    })
})