import prisma from "../../src/database";
import { UserInput } from "../../src/repository";
import { faker } from '@faker-js/faker';

export async function buildUser(email: string, password?: string) {
  const userData: UserInput = {
    email: `${faker.person.firstName()}@email.com`,
    password: faker.string.uuid()
  };

  const user = await prisma.user.create({ data: userData });
  return user;
}