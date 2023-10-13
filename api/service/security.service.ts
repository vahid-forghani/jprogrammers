import {UserRepository} from "../repository/user.repository";
import bcrypt from "bcrypt";
import {JwtService} from "./jwt.service";

export class SecurityService {

  static async login(username: string, password: string): Promise<any> {
    let document = await UserRepository.findOne({username});
    if (!document) {
      return {status: 404, message: 'Not found'};
    } else {
      let result = await bcrypt.compare(password, document.password + '');
      if (result) {
        return {status: 200, token: JwtService.generateToken(username)};
      } else {
        return {status: 401, message: 'Unauthorized'};
      }
    }
  }

  static verify(token: string) {
    if (JwtService.verify(token)) {
      return {status: 200, message: 'verified'};
    } else {
      return {status: 400, message: 'not verified'};
    }
  }

}
