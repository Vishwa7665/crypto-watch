"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const fetchAndSaveCryptoData_1 = require("./utils/fetchAndSaveCryptoData");
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
dotenv_1.default.config({ path: 'static.env' });
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
const mongodbUrl = process.env.MONGODB_URL || 'your-default-mongodb-url';
mongoose_1.default
    .connect(mongodbUrl, {})
    .then(() => {
    console.log('Connected to database');
})
    .catch((err) => {
    console.error('Error in database:', err);
});
app.use('/', routes_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Starts the server
app.listen(port, () => {
    console.log('Server started listening on', port);
});
setInterval(fetchAndSaveCryptoData_1.fetchPriceAndSaveToDb, 5000);
exports.default = app;
