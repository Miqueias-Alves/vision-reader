import e, { Request, Response } from "express";
import { isBase64 } from "../helpers/image.helper";
import * as geminiService from "../services/gemini.service";
import * as measureService from "../services/measure.service";
import * as customerService from "../services/customer.service";
import { MeasureDTO } from "../dto/measure";
import { measureValidate, measureValidateUpdate } from "../validations/measure.validate";
/**
 * Realiza o upload de uma imagem e salva no banco de dados
 */
export const upload = async (req: Request, res: Response): Promise<void> => {
  const { error } = measureValidate.validate(req.body);

  if (error) {
    res.status(400).json({error_code: "INVALID_DATA", error_description: error.details.map(detail => detail.message)});
    return;
  }

  try {
    const { 
      image,
      customer_code,
      measure_datetime,
      measure_type,
     } = req.body;

    const customer = await customerService.findById(customer_code);

    if (!customer) {
      res.status(404).json({
        error_code: "CUSTOMER_NOT_FOUND",
        error_description: "Cliente não encontrado",
      });
      return;
    }

    if (!isBase64(image)) {
      res.status(400).json({
        error_code: "INVALID_IMAGE",
        error_description: "A imagem enviada não é Base64",
      });
      return;
    }

    const measureIsExist = await measureService.findByMeasureDateTimeAndMeasureType(measure_datetime, measure_type);

    if (measureIsExist) {
      res.status(400).json({
        error_code: "DOUBLE_REPORT",
        error_description: "Leitura do mês já realizada",
      });
      return;
    }

    const result = await geminiService.generate(image)

    if (!result) {
      res.status(500).send("Error on image generation");
      return;
    }

    const payload = {
      measureDateTime: measure_datetime,
      measureType: measure_type,
      measureValue: Number(result),
      imageUrl: 'https://example.com/image.jpg',
      customerId: customer.id,
    };
      
    const response = await measureService.create(payload as MeasureDTO);
    
    res.status(201).json({
      image_url: response.imageUrl,
      measure_value: response.measureValue,
      measure_uuid: response.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(JSON.stringify(error));
  }
};

export const confirm = async (req: Request, res: Response): Promise<void> => {
  const { error } = measureValidateUpdate.validate(req.body);

  if (error) {
    res.status(400).json({error_code: "INVALID_DATA", error_description: error.details.map(detail => detail.message)});
    return;
  }

  const { measure_uuid, confirmed_value } = req.body;

  const measure = await measureService.findById(measure_uuid);

  if (!measure) {
    res.status(404).json({
      error_code: "MEASURE_NOT_FOUND",
      error_description: "Leitura do mês não realizada",
    })
    return;
  } else if (measure.hasConfirmed) {
    res.status(409).json({
      error_code: "CONFIRMATION_DUPLICATE",
      error_description: "Leitura do mês já confirmada",
    });
    return;
  }

  const response = await measureService.saveValue(measure_uuid, confirmed_value);

  res.status(200).json({
    "success": true,
  });
};