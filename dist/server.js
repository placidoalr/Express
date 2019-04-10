"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
let cidades = [];
cidades.push({
    id: 1,
    name: "Jaraguá do Sul"
}, {
    id: 2,
    name: "Corupá"
}, {
    id: 3,
    name: "Guaramirim"
});
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));
app.get('/teste', (request, response) => {
    response.send(cidades("id=3"));
});
const port = 3000;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
