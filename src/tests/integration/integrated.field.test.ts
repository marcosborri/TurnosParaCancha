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

    test("Elements quantity should be 5", ()=>{
        const fields = getFields(5)
        mockedFieldModel.getFields.mockResolvedValue(fields)

        return request(app).get("/fields/").then(({ body })=>{
            expect(body.length).toBe(5)
        })
    })
})