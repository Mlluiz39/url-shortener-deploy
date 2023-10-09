"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const URLController_1 = require("./controller/URLController");
const MongoConnection_1 = require("./database/MongoConnection");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const database = new MongoConnection_1.MongoConnection();
database.connect();
const urlController = new URLController_1.URLController();
app.post('/shorten', urlController.shortenURL);
app.get('/:hash', urlController.redirectURL);
app.get('/', urlController.getAllURLs);
app.get('/url/:id', urlController.getShortenedURLById);
app.get('/urls/:date', urlController.getURLsByDate);
app.listen(3000, () => {
    console.log(`Server listening on port ${3000}`);
});
