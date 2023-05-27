"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleRestApi = void 0;
const Article_1 = require("./Article");
const JwtService_1 = require("./JwtService");
class ArticleRestApi {
    constructor(app) {
        this.jwtService = new JwtService_1.JwtService();
        this.setupAccessRules(app);
        this.setupRoutes(app);
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
    setupRoutes(app) {
        app.get('/articles', (request, response) => {
            Article_1.Article.find({}, (error, documents) => {
                response.send(documents);
            });
        });
    }
}
exports.ArticleRestApi = ArticleRestApi;
