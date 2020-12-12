import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import expressSession from "express-session";

const main = async () => {
  const app = express();

  await createConnection({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "databasename",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    entities: [path.join(__dirname, "./entities/*")],
  })
    .then(() => console.log("connected to database"))
    .catch((error) => console.log({ error }));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(
    expressSession({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    })
  );

  app.listen(4000, () => {
    console.log("Server started at localhost:4000");
  });
};

main().catch((error) => {
  console.log({ error });
});
