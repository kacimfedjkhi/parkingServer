import bodyParser from "body-parser";
import getParkings from "./parkingController";

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get("/", (req, res) => res.send(`Hello world`));

app.get("/parkings", getParkings);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
