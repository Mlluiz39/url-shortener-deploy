"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLController = void 0;
const URL_1 = require("../model/URL");
const shortid_1 = __importDefault(require("shortid"));
const Constants_1 = require("../config/Constants");
class URLController {
    async shortenURL(req, res) {
        const { originURL } = req.body;
        const url = await URL_1.URLModel.findOne({ originURL });
        async (params) => {
            if (url) {
                res.json(url);
                return;
            }
            if (!url) {
                res.status(400).json({ error: 'Error' });
                return;
            }
        };
        const hash = shortid_1.default.generate();
        const shortURL = `${Constants_1.config.API_URL}/${hash}`;
        const createdAt = new Date();
        const newUrl = await URL_1.URLModel.create({ hash, originURL, shortURL, createdAt });
        res.json(newUrl);
    }
    async redirectURL(req, res) {
        const { hash } = req.params;
        const url = await URL_1.URLModel.findOne({ hash });
        if (url) {
            res.redirect(url.originURL);
            return;
        }
        res.status(400).json({ error: 'URL not found' });
    }
    async getAllURLs(req, res) {
        try {
            const urls = await URL_1.URLModel.find();
            res.json(urls);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getShortenedURLById(req, res) {
        const { id } = req.params;
        const url = await URL_1.URLModel.findOne({ id });
        if (url) {
            res.json(url);
        }
        else {
            res.status(404).json({ error: 'URL not found' });
        }
    }
    async getURLsByDate(req, res) {
        const { date } = req.params;
        const urls = await URL_1.URLModel.find({ createdAt: { $gte: new Date(date) } });
        if (urls.length > 0) {
            res.json(urls);
        }
        else {
            res.status(404).json({ error: 'No URLs found for the specified date' });
        }
    }
}
exports.URLController = URLController;
