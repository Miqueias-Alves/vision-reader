import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(String(process.env.GEMINI_API_KEY));
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generate = async (base64: string) => {
  try {
    const mimeType = base64.split(",")[0].split(":")[1].split(";")[0];
    const base64Data = base64.replace(/^data:image\/jpeg;base64,/, "");

    const prompt = "Extraia o valor do kw/h do medidor de energia elétrica, e informe apenas o valor numérico. Exemplos: 1, 10, 100, 1000 etc.";
    const result = await model.generateContent([prompt, {
      inlineData: {
        data: base64Data,
        mimeType: mimeType
      }
    }]);
    return result.response.text();
  } catch (error) {
    console.error(error);
    return error;
  }
};
