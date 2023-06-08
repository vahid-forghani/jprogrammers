import { Express, Request, Response } from "express";
import { Article } from "./article";
import { JwtService } from "./jwt.service";
import bodyParser from "body-parser";

var jsonParser = bodyParser.json();

export class ArticleRestApi {

  jwtService = new JwtService();

  constructor(app: Express) {
    this.setupAccessRules(app);
    this.setupRoutes(app);
  }

  private setupAccessRules(app: Express) {
    app.use('/articles', (request, response, next) => {
      if (request.method != 'GET' && !this.jwtService.verify(request.header('token'))){
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
      Article.findById(request.params.id, (error: any, document: any) => {
        response.send(document);
      });
    });

    app.post('/articles', jsonParser, (request, response) => {
      const article = request.body;
      delete article._id;
      Article.create(article, (error: any, document: any) => {
        response.send(document);
      });
    });

    app.put('/articles', jsonParser, (request, response) => {
      const article = request.body;
      Article.updateOne({_id: article._id}, article, (error: any, document: any) => {
        response.send(document);
      });
    });
  }

}
