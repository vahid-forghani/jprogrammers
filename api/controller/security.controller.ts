import {Express} from "express";
import bodyParser from "body-parser";
import {SecurityService} from "../service/security.service";

const jsonParser = bodyParser.json();

export class SecurityController {

  constructor(app: Express) {
    this.setupRoutes(app);
  }

  private setupRoutes(app: Express) {

    app.post('/login', jsonParser, (request, response) => {
      const {username, password} = request.body;
      SecurityService.login(username, password).then(value => response.status(value.status).send(value));
    });

    app.post('/verify', jsonParser, (request, response) => {
      const {token} = request.body;
      const result = SecurityService.verify(token);
      response.status(result.status).send(result);
    });

  }

}
