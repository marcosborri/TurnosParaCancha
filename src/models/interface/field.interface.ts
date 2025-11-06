export interface Field {
    //Getters

    getId(): number

    getName(): string

    getTypeField(): string

    getPrice(): number

    //Setters

    setId(id: number): void

    setName(name: string): void

    setTypeField(typeField: string): void 

    setPrice(price: number): void 
}
