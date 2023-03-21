import { getModelForClass, prop } from "@typegoose/typegoose";

export class Recepie {
  @prop()
  public title?: string;

  @prop()
  public language?: string;

  @prop()
  public email?: string;

  @prop()
  public ingredients?: string;

  @prop()
  public steps?: string;

  @prop()
  public type?: string;

  @prop()
  public img?: string;
}

const RecepieModel = getModelForClass(Recepie);

export default RecepieModel;
