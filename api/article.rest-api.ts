import {Express, Request, Response} from "express";
import {Article} from "./article";
import {JwtService} from "./jwt.service";
import bodyParser from "body-parser";
import {FileUtils} from "./FileUtils";

var jsonParser = bodyParser.json();

export class ArticleRestApi {

  jwtService = new JwtService();

  constructor(app: Express) {
    this.setupAccessRules(app);
    this.setupRoutes(app);
  }

  private setupAccessRules(app: Express) {
    app.use('/articles', (request, response, next) => {
      if (request.method != 'GET' && !this.jwtService.verify(request.header('token'))) {
        response.status(403).send({message: 'Forbidden'});
        return;
      }
      next();
    });
  }

  private setupRoutes(app: Express) {
    app.get('/articles', (request: Request, response: Response) => {
      Article.find({}, (error: any, documents: any) => {
        response.send(documents);
      });
    });

    app.get('/articles/:id', (request, response) => {
      Article.findOne({id: request.params.id}, (error: any, document: any) => {
        response.send(document);
      });
    });

    app.put('/articles', jsonParser, (request, response) => {
      const article = request.body;
      Article.findOne({id: article.id}, (error: any, document: any) => {
        if (document){
          Article.updateOne({id: article.id}, article, (error: any, document: any) => {
            response.send(document);
          });
        } else {
          Article.create(article, (error: any, document: any) => {
            response.send(document);
          });
        }
      });
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
