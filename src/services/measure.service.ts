import { PrismaClient, Measurement } from "@prisma/client";
import { v4 as uuid } from "uuid";
import moment from "moment";
import { MeasureDTO }from "../dto/measure";

export const create = async (measure: MeasureDTO): Promise<Measurement> => {
  const prisma = new PrismaClient();
  const { measureDateTime, measureType, measureValue, imageUrl, customerId } = measure;

  const date = moment(measureDateTime, "DD/MM/YYYY").format("YYYY-MM-DDTHH:mm:ss.SSS");

  return await prisma.measurement.create({
    data: {
      id: uuid(),
      measureDateTime : new Date(date),
      measureType,
      measureValue,
      hasConfirmed: false,
      imageUrl,
      customerId,
    },
  });
};

export const findByMeasureDateTimeAndMeasureType = async (measureDateTime: string, measureType: string): Promise<Measurement | null> => {
  const prisma = new PrismaClient();

  const date = moment(measureDateTime, "DD/MM/YYYY").format("YYYY-MM-DD");

  console.log(date);

  // comparar a data com o formato YYYY-MM-DD com a data do banco de dados no formato YYYY-MM-DD
  return await prisma.measurement.findFirst({
    where: {
      measureDateTime: {
        gte: new Date(date),
      },
      measureType: {
        equals: measureType,
      },
    },
  });
};

export const findById = async (id: string): Promise<Measurement | null> => {
  const prisma = new PrismaClient();

  return await prisma.measurement.findUnique({
    where: {
      id,
    },
  });
};

export const saveValue = async (id: string, value: number): Promise<Measurement> => {
  const prisma = new PrismaClient();

  return await prisma.measurement.update({
    where: {
      id,
    },
    data: {
      measureValue: value,
      hasConfirmed: true,
      updatedAt: new Date(),
    },
  });
};
