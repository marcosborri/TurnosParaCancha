import { Field, TypeField} from "../../models/field.model";
import { faker } from '@faker-js/faker'

const Type_Fields: TypeField[] = ["F5", "F6", "F7", "F9", "F11"]

export const getOneField = (): Promise<Field> => {
    const newField = new Field(faker.number.int({min: 1, max: 100}), faker.word.noun(), faker.helpers.arrayElement(Type_Fields), faker.number.int({min: 1, max: 100000}))

    return Promise.resolve(newField)
};

export const getFields = (quant:number): Promise<Array<Field>> => {
    return new Promise(async (resolve, reject)=> {
        const Fields = new Array<Field>();
        if(quant <= 0){
            reject(new Error('Quantity must be higher than 0'));
        } else {
            for(let i = 0; i < quant; i++){
                Fields.push(await getOneField())
            }
            resolve(Fields)
        }
    })
}