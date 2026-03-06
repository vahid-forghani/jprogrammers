import bodyParser from "body-parser";
import { Express, Request, Response } from "express";
import { CategoryRepository } from "../repository/category.repository";
import { JwtService } from "../service/jwt.service";

var jsonParser = bodyParser.json();

export class CategoryController {

  constructor(app: Express) {
    this.setupAccessRules(app);
    this.setUpRoutes(app);
  }

  private setupAccessRules(app: Express) {
    app.use('/categories', (request, response, next) => {
      if (request.method != 'GET' && !JwtService.verify(request.header('token'))) {
        response.status(403).send({ message: 'Forbidden' });
        return;
      }
      next();
    });
  }

  private setUpRoutes(app: Express) {
    app.get('/categories', (request: Request, response: Response) => {
      CategoryRepository.find({})
        .then(documents => response.send(documents));
    });

    app.post('/categories', jsonParser, (request, response) => {
      const { name } = request.body;
      CategoryRepository.create({ name })
        .then(document => response.send(document));
    });

    app.patch('/categories', jsonParser, (request, response) => {
      const category = request.body;
      CategoryRepository.updateOne({ _id: category._id }, category)
        .then(document => response.send(document));
    });
  }

}
