import bodyParser from "body-parser";
import {Express, Request, Response} from "express";
import {CategoryRepository} from "../repository/category.repository";
import {JwtService} from "../service/jwt.service";

var jsonParser = bodyParser.json();

export class CategoryController {

  constructor(app: Express) {
    this.setupAccessRules(app);
    this.setUpRoutes(app);
  }

  private setupAccessRules(app: Express) {
    app.use('/categories', (request, response, next) => {
      if (request.method != 'GET' && !JwtService.verify(request.header('token'))) {
        response.status(403).send({message: 'Forbidden'});
        return;
      }
      next();
    });
  }

  private setUpRoutes(app: Express) {
    app.get('/categories', (request: Request, response: Response) => {
      CategoryRepository.find({}, (error: any, documents: any) => {
        response.send(documents);
      });
    });

    app.post('/categories', jsonParser, (request, response) => {
      const {name} = request.body;
      CategoryRepository.create({name}, (error: any, document: any) => {
        response.send(document);
      });
    });

    app.patch('/categories', jsonParser, (request, response) => {
      const category = request.body;
      CategoryRepository.updateOne({_id: category._id}, category, (error: any, document: any) => {
        response.send(document);
      });
    });
  }

}
