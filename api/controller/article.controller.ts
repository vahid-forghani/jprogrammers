import {Express} from "express";
import {JwtService} from "../service/jwt.service";
import bodyParser from "body-parser";
import {FileUtils} from "../FileUtils";
import {ArticleService} from "../service/article.service";

const jsonParser = bodyParser.json();

export class ArticleController {

  URL_PREFIX = '/articles';

  constructor(app: Express) {
    this.setupAccessRules(app);
    this.setupRoutes(app);
  }

  private setupAccessRules(app: Express) {
    app.use(this.URL_PREFIX, (request, response, next) => {
      if (request.method != 'GET' && !JwtService.verify(request.header('token'))) {
        response.status(403).send({message: 'Forbidden'});
        return;
      }
      next();
    });
  }

  private setupRoutes(app: Express) {
    app.get(this.URL_PREFIX, (request, response) => {
      ArticleService.getAll().then(articles =>
        response.send(articles)
      );
    });

    app.get(`${this.URL_PREFIX}/:id`, (request, response) => {
      ArticleService.get(request.params.id).then(article => {
        response.send(article);
      });
    });

    app.put(this.URL_PREFIX, jsonParser, (request, response) => {
      const article = request.body;
      ArticleService.createOrUpdate(article).then(result => response.send(result));
    });

    app.delete(`${this.URL_PREFIX}/:id`, (request, response) => {
      ArticleService.delete(request.params.id).then(result => response.send(result));
    });

    app.get(`${this.URL_PREFIX}/:id/image`, (request, response) => {
      FileUtils.fetchFile(request.params.id + '-image', (error, data) => {
        response.send(data);
      });
    });

    app.post(`${this.URL_PREFIX}/:id/image/upload`, FileUtils.upload.single('file'), (request, response) => {
      FileUtils.rename(request.file?.filename, request.params.id + '-image');
      response.send({message: 'file uploaded successfully'});
    });
  }

}
