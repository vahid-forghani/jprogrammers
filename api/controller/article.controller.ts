import {Express, Request, Response} from "express";
import {JwtService} from "../service/jwt.service";
import bodyParser from "body-parser";
import {FileUtils} from "../FileUtils";
import {ArticleService} from "../service/article.service";

const jsonParser = bodyParser.json();

export class ArticleController {

  constructor(app: Express) {
    this.setupAccessRules(app);
    this.setupRoutes(app);
  }

  private setupAccessRules(app: Express) {
    app.use('/articles', (request, response, next) => {
      if (request.method != 'GET' && !JwtService.verify(request.header('token'))) {
        response.status(403).send({message: 'Forbidden'});
        return;
      }
      next();
    });
  }

  private setupRoutes(app: Express) {
    app.get('/articles', (request: Request, response: Response) => {
      ArticleService.getAll().then(articles =>
        response.send(articles)
      );
    });

    app.get('/articles/:id', (request, response) => {
      ArticleService.get(request.params.id).then(article => {
        response.send(article);
      });
    });

    app.put('/articles', jsonParser, (request, response) => {
      const article = request.body;
      ArticleService.createOrUpdate(article).then(result => response.send(result));
    });

    app.get('/articles/:id/image', (request, response) => {
      FileUtils.fetchFile(request.params.id + '-image', (error, data) => {
        response.send(data);
      });
    });

    app.post('/articles/:id/image/upload', FileUtils.upload.single('file'), (request, response) => {
      FileUtils.rename(request.file?.filename, request.params.id + '-image');
      response.send({message: 'file uploaded successfully'});
    });

    app.get('/articles/:id/avatar', (request, response) => {
      FileUtils.fetchFile(request.params.id + '-avatar', (error, data) => {
        response.send(data);
      });
    });

    app.post('/articles/:id/avatar/upload', FileUtils.upload.single('file'), (request, response) => {
      FileUtils.rename(request.file?.filename, request.params.id + '-avatar');
      response.send({message: 'file uploaded successfully'});
    });
  }

}
