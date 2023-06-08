import bodyParser from "body-parser";
import { Express, Request, Response } from "express";
import { Category } from "./category";
import { JwtService } from "./jwt.service";

var jsonParser = bodyParser.json();

export class CategoryRestApi {

  jwtService = new JwtService();

  constructor(app: Express) {
    this.setupAccessRules(app);
    this.setUpRoutes(app);
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

  private setUpRoutes(app: Express) {
    app.get('/categories', (request: Request, response: Response) => {
      Category.find({}, (error: any, documents: any) => {
        response.send(documents);
      });
    });

    app.post('/categories', jsonParser, (request, response) => {
      const {name} = request.body;
      Category.create({name}, (error: any, document: any) => {
        response.send(document);
      });
    });

    app.patch('/categories', jsonParser, (request, response) => {
      const category = request.body;
      Category.updateOne({_id: category._id}, category, (error: any, document: any) => {
        response.send(document);
      });
    });
  }

}
