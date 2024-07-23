"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cryptoDataController_1 = require("../controllers/cryptoDataController");
const router = express_1.default.Router();
router.get('/price/:symbol', cryptoDataController_1.fetchPriceDataOfSingleCoin);
exports.default = router;
