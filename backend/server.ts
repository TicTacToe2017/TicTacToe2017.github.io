import * as express from "express";
import {Express} from "express";
import * as bodyParser from "body-parser";
import DbHelper from "./repository/db-helper";

console.log("Initialising DB...");
DbHelper
    .init()
    .then(() => { console.log("DB ready!"); });

let app: Express = express();

app.use(bodyParser.json());

app.use( function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  next();
});

import index from "./routes/index";
import users from "./routes/users";
import games from "./routes/games";

app.use("/", index);
app.use("/users", users);
app.use("/games", games);

app.listen(3000, () => {
    console.log("TicTacToe Service listening on port 3000...");
});