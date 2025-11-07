import express from "express";
import fieldRoutes from "./routes/field.routes";

class Server {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
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
    this.app.use("/fields", fieldRoutes)
    // this.app.use("/users",userRoute);
    // this.app.use( "/categories",categoryRoute);
    // this.app.use("/products",productRouote)
    // this.app.use("/restart",restartRoute);
  }
  start(callback: () => void) {
    this.app.listen(this.port, callback);
  }
}
export default Server;
