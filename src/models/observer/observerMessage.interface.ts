import { Observer } from "./observer.interface";

export class ObserverMessage implements Observer {
  update(message: string): void {
    console.log("Notificación:", message);
  }
}
