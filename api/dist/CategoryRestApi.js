"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRestApi = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const Category_1 = require("./Category");
const JwtService_1 = require("./JwtService");
var jsonParser = body_parser_1.default.json();
class CategoryRestApi {
    constructor(app) {
        this.jwtService = new JwtService_1.JwtService();
        this.setupAccessRules(app);
        this.setUpRoutes(app);
    }
    setupAccessRules(app) {
        app.use('/categories', (request, response, next) => {
            if (request.method != 'GET' && !this.jwtService.verify(request.header('token'))) {
                response.status(403).send({ message: 'Forbidden' });
                return;
            }
            next();
        });
    }
    setUpRoutes(app) {
        app.get('/categories', (request, response) => {
            Category_1.Category.find({}, (error, documents) => {
                response.send(documents);
            });
        });
        app.post('/categories', jsonParser, (request, response) => {
            const { name } = request.body;
            Category_1.Category.create({ name }, (error, document) => {
                response.send(document);
            });
        });
        app.patch('/categories', jsonParser, (request, response) => {
            const category = request.body;
            Category_1.Category.updateOne({ _id: category._id }, category, (error, document) => {
                response.send(document);
            });
        });
    }
}
exports.CategoryRestApi = CategoryRestApi;
