import { PrismaClient, Customer } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { CustomerModel } from "../models/customer.model";

export const create = async (customer: CustomerModel): Promise<Customer> => {
  const prisma = new PrismaClient();
  const { name } = customer;

  return await prisma.customer.create({
    data: {
      id: uuid(),
      name,
    },
  });
};

export const findById = async (id: string): Promise<Customer | null> => {
  const prisma = new PrismaClient();
  return await prisma.customer.findUnique({
    where: {
      id,
    },
  });
};

export const findAll = async (): Promise<Customer[]> => {
  const prisma = new PrismaClient();
  return await prisma.customer.findMany();
};

export const findMeasuresByCustomerId = async (id: string, query?: string): Promise<any | null> => {
  const prisma = new PrismaClient();
  console.log(query);
  return await prisma.customer.findUnique({
    where: {
      id
    },
    include: {
      measurements: {
        where: {
          customerId: id,
          ...(query && { measureType: query }),
        },
      }
    },
  });
};
