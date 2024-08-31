import { Request, Response } from "express";
import * as customerService from "../services/customer.service";

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const response = await customerService.create({ name });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({message: "Error on create customer", error});
  }
}

export const findById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const response = await customerService.findById(id);

  if (!response) {
    res.status(404).json({message: "Customer not found"});
    return;
  }

  res.status(200).json(response);
}

export const findAll = async (req: Request, res: Response): Promise<void> => {
  const response = await customerService.findAll();
  res.status(200).json(response);
}

export const findMeasuresByCustomerId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { measure_type } = req.query;

  const type = measure_type ? measure_type.toString().toUpperCase() : null;

  if(type) {
    if (type !== "WATER" && type !== "GAS") {
      res.status(400).json({
        error_code: "INVALID_TYPE",
        error_description: "Tipo de medição não permitido",
      });
      return;
    }
  }

  const response = await customerService.findMeasuresByCustomerId(id, measure_type as string);

  if (!response || response.measurements.length === 0) {
    res.status(404).json({
      error_code: "MEASURES_NOT_FOUND",
      message: "Nenhuma leitura encontrada",
    });
    return;
  }

  res.status(200).json({
    customer_code: response.id,
    measures: response.measurements.map((measure: any) => ({
      measure_uuid: measure.id,
      measure_datetime: measure.measureDateTime,
      measure_type: measure.measureType,
      has_confirmed: measure.hasConfirmed,
      image_url: measure.imageUrl,
    })),
  });
}
