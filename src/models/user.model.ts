
export class User {
  constructor(
    private id: number,
    private username: string,
    private email: string,
    private phonenumber: number
  ) { }

  //Getters
  public getId(): number {
    return this.id;
  }

  public getUsername(): string {
    return this.username;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPhonenumber(): number {
    return this.phonenumber;
  }

  //Setters

  public setId(id: number) {
    this.id = id;
  }

  public setUsername(username: string) {
    this.username = username;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public setPhonenumber(phone: number) {
    this.phonenumber = phone;
  }
}
