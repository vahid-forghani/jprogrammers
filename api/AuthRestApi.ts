import { Express } from "express";
import { User } from "./User";
import bodyParser from "body-parser";
import { JwtService } from "./JwtService";
import bcrypt from "bcrypt";

var jsonParser = bodyParser.json();

export class AuthRestApi {

  jwtService = new JwtService();

  constructor(app: Express) {
    this.init(app);
  }

  private init(app: Express) {

    app.post('/login', jsonParser, (request, response) => {
      const {username, password} = request.body;
      User.find({username}, (error: any, documents: any) => {
        if (documents.length == 0){
          response.status(404).send({message: 'Not found'});
        } else {
          bcrypt.compare(password, documents[0].password, (err, result) => {
            if(result) {
              response.send({token: this.jwtService.generateToken(username)});
            } else {
              response.status(401).send({message: 'Unauthorized'});
            }
          });
        }
      });
    });

    app.post('/verify', jsonParser, (request, response) => {
      const {token} = request.body;
      if (this.jwtService.verify(token)){
        response.send({message: 'verified'});
      } else {
        response.status(400).send({message: 'not verified'});
      }
    });

  }

}
