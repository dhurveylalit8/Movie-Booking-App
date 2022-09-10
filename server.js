const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const serverConfig = require("./configs/server.config")
const dbConfig = require("./configs/db.config");
const init = require("./init")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(dbConfig.DB_URL);

const db = mongoose.connection;
db.on("error", () => {
    console.log("#### Error while connecting to MongoDB ####")
});
db.once("open", () => {
    console.log("#### Connected to MongoDB ####")
});

require("./routes/movie.route")(app);
require("./routes/theatre.route")(app);

app.listen(serverConfig.PORT, () => {
    console.log(`#### Connected to server at port no : ${serverConfig.PORT}  ####`);
})