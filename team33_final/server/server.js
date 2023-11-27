var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
var { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

app.get("/listDrivers", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
        .collection("drivers")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

app.get("/:id", async (req, res) => {
    const driverid = Number(req.params.id);
    console.log("Robot to find :", driverid);

    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = { "id": driverid };

    const results = await db.collection("drivers")
        .findOne(query);

    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});