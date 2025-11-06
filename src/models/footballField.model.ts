import { Field } from "./interface/field.interface"

export class FootballField implements Field {
	constructor(
		protected id: number,
		protected name: string,
		protected typeField: string,
		protected price: number
	) {}

	//Getters

	public getId(): number {
		return this.id
	}

	public getName(): string {
		return this.name
	}

	public getTypeField(): string {
		return this.typeField
	}

	public getPrice(): number {
		return this.price
	}

	//Setters

	public setId(id: number) {
		this.id = id
	}

	public setName(name: string) {
		this.name = name
	}

	public setTypeField(typeField: string) {
		this.typeField = typeField
	}

	public setPrice(price: number) {
		this.price = price
	}
}
