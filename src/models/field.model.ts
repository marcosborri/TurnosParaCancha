export type TypeField = "F5" | "F6" | "F7" | "F11";

export abstract class Field {
  constructor(
    protected id: number,
    protected name: string,
    protected typeField: TypeField,
    protected price: number
  ) { }

  public getId(): number {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }
  public getTypeField(): TypeField {
    return this.typeField;
  }
  public getPrice(): number {
    return this.price;
  }

  public setId(id: number) {
    this.id = id;
  }
  public setName(name: string) {
    this.name = name;
  }
  public setTypeField(typeField: TypeField) {
    this.typeField = typeField;
  }
  public setPrice(price: number) {
    this.price = price;
  }
}
