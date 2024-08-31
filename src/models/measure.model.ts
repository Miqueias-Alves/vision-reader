export interface MeasureModel {
  id?: string;
  measureDateTime : Date;
  measureType : measureType;
  measureValue? : number;
  hasConfirmed? : boolean;
  imageUrl? : string;
  image? : string;
  customerId: string;
}

export type measureType = "WATER" | "GAS";
