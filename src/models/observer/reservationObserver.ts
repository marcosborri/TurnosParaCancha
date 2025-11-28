import { Observer } from "./observer.interface";

export class ReservationObserver implements Observer {
  constructor(private userEmail: string) {}

  update(message: string): void {
    console.log(`Notificacion enviada a ${this.userEmail}: ${message}`);
  }
}
