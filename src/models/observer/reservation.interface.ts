import { Subject } from "./subject.interface";
import { Observer } from "./observer.interface";

export class ReservationSubject implements Subject {
  private observers: Observer[] = [];

  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer) {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notify(message: string) {
    for (const observer of this.observers) {
      observer.update(message);
    }
  }
}

export const reservationSubject = new ReservationSubject();
