import express from "express";
import indexRoutes from "./routes/index";
import { reservationSubject } from "./models/observer/reservation.interface";
import { ObserverMessage } from "./models/observer/observerMessage.interface";

class Server {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    reservationSubject.subscribe(new ObserverMessage());

    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(express.json({ limit: "150mb" }));
  }
  routes() {
    this.app.get("/", (req, res) => {
      res.send("on port 3000");
    });

    this.app.use("/", indexRoutes);
  }
  start(callback: () => void) {
    this.app.listen(this.port, callback);
  }
}
export default Server;
