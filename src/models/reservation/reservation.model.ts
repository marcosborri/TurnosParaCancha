import { Field } from '../field/field.model';
import { User } from '../user/user.model';

export class Reservation {
  constructor(
    private id: number,
    private user: User,
    private field: Field,
    private start: Date,
    private end: Date,
    private paid: boolean,
  ) {}

  //Getters

  public getId(): number {
    return this.id;
  }

  public getUser(): User {
    return this.user;
  }

  public getStart(): Date {
    return this.start;
  }

  public getEnd(): Date {
    return this.end;
  }

  public getPaid(): boolean {
    return this.paid;
  }

  public getField(): Field {
    return this.field;
  }

  //Setters
  public setId(id: number) {
    this.id = id;
  }

  public setUser(user: User) {
    this.user = user;
  }

  public setStart(start: Date) {
    this.start = start;
  }

  public setField(field: Field) {
    this.field = field;
  }

  public setEnd(end: Date) {
    this.end = end;
  }

  public setPaid(paid: boolean) {
    this.paid = paid;
  }
}
