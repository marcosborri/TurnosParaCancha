import { User } from "../../models/user.model";
import { faker } from "@faker-js/faker";

export const getOneUser = (): Promise<User> => {
    const newUser = new User(faker.number.int({min: 1, max: 100}), faker.internet.username(), faker.internet.email(), faker.number.int({min: 2000, max: 100000}));

    return Promise.resolve(newUser)
}