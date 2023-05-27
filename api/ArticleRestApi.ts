import { Express, Request, Response } from "express";
import { Article } from "./Article";
import { JwtService } from "./JwtService";

export class ArticleRestApi {

  jwtService = new JwtService();

  constructor(app: Express) {
    this.setupAccessRules(app);
    this.setupRoutes(app);
  }

  private setupAccessRules(app: Express) {
    app.use('/categories', (request, response, next) => {
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
  }

}
