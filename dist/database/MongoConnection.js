"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Constants_1 = require("../config/Constants");
class MongoConnection {
    async connect() {
        try {
            await mongoose_1.default.connect(Constants_1.config.MONGO_CONNECTION || '', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('MongoDB Connected');
        }
        catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
}
exports.MongoConnection = MongoConnection;
