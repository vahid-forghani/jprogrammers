"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleRestApi = void 0;
const article_1 = require("./article");
const jwt_service_1 = require("./jwt.service");
const body_parser_1 = __importDefault(require("body-parser"));
var jsonParser = body_parser_1.default.json();
class ArticleRestApi {
    constructor(app) {
        this.jwtService = new jwt_service_1.JwtService();
        this.setupAccessRules(app);
        this.setupRoutes(app);
    }
    setupAccessRules(app) {
        app.use('/articles', (request, response, next) => {
            if (request.method != 'GET' && !this.jwtService.verify(request.header('token'))) {
                response.status(403).send({ message: 'Forbidden' });
                return;
            }
            next();
        });
    }
    setupRoutes(app) {
        app.get('/articles', (request, response) => {
            article_1.Article.find({}, (error, documents) => {
                response.send(documents);
            });
        });
        app.get('/articles/:id', (request, response) => {
            article_1.Article.findById(request.params.id, (error, document) => {
                response.send(document);
            });
        });
        app.post('/articles', jsonParser, (request, response) => {
            const article = request.body;
            delete article._id;
            article_1.Article.create(article, (error, document) => {
                response.send(document);
            });
        });
        app.put('/articles', jsonParser, (request, response) => {
            const article = request.body;
            article_1.Article.updateOne({ _id: article._id }, article, (error, document) => {
                response.send(document);
            });
        });
    }
}
exports.ArticleRestApi = ArticleRestApi;
