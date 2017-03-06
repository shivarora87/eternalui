/**
 * Created by shiv on 06/03/2017.
 */
"use strict";

// import config       from "./config.json";
import express      from "express";
import path         from "path";
import  bodyParser  from "body-parser";
import {Logger}     from "./logger";
import {Postgres}   from "./postgres";
import {DbConnect}  from "./dbConnect";

import {AllProducts}   from "./routes/allProducts";
import {ProductsStore}   from "./stores/products";

var exphbs = require("express-handlebars");
var app = express();
var logger = new Logger();
var qt     = require("quickthumb");



// Setting  the handlebars templates with express
app.set("views", path.join(__dirname, "templates"));
app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: "main_layout",layoutsDir: path.join(__dirname, "templates/layouts")}
));
app.set("view engine", ".hbs");
app.use(express.static('public/'));

let db = new DbConnect("postgres://postgres:postgres@localhost:32769/Test");
db.createConnection()
    .then((connection) => {
        var server;
        app.use( bodyParser.json({limit: "50mb"}) );       // to support JSON-encoded bodies
        app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
            limit: "50mb",
            extended: true
        }));
        server = require("http").createServer(app);

        let postgres      = new Postgres(connection);
        let productsStore = new ProductsStore(postgres, logger);
        let allProducts   = new AllProducts(productsStore, logger);

        app.get("/", allProducts.products());
        app.get("/products", allProducts.toggleProducts());

        server.listen(3000, () => {
            logger.info("System Listen on port " + 3000);
        });

    }).catch((err) => {
    logger.fatal("Database Failure:  " +  err);
    process.exit();
});
