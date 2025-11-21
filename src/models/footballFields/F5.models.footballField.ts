import { Field } from "../field.model";


export class Football5 extends Field {
  constructor(name: string) {
    super(0, name, "F5", 1500);
  }


  //Función de prueba
  public setDiscount(percent: number): number {
    if (percent < 1 || percent > 100) {
      throw new Error("Invalid percentage");
    }
    const discount = percent / 100;
    this.setPrice(this.getPrice() * (1 - discount));
    return this.getPrice();
  }
}
