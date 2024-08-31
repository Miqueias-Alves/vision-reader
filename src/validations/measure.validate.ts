import Joi from "joi";

export const measureValidate = Joi.object({
  customer_code: Joi.string().required().messages({
    "any.required": "Customer ID é obrigatório",
    "string.empty": "Customer ID não pode ser vazio",
  }),
  measure_datetime: Joi.string().required().messages({
    "any.required": "Data e hora da medição é obrigatório",
    "string.empty": "Data e hora da medição não pode ser vazio",
  }),
  measure_type: Joi.string().required().messages({
    "any.required": "Tipo de medição é obrigatório",
    "string.empty": "Tipo de medição não pode ser vazio",
  }),
  image: Joi.string().required().messages({
    "any.required": "Imagem em base64 é obrigatório",
    "string.empty": "Imagem em base64 não pode ser vazio",
  })
});

export const measureValidateUpdate = Joi.object({
  confirmed_value: Joi.number().required().messages({
    "any.required": "Valor da medição é obrigatório",
    "number.base": "Valor da medição deve ser um número",
  }),
  measure_uuid: Joi.string().required().messages({
    "any.required": "UUID da medição é obrigatório",
    "string.empty": "UUID da medição não pode ser vazio",
  })
});
