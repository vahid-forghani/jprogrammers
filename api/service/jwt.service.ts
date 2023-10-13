import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'

dotenv.config();

export class JwtService {

  static generateToken(username: string): string {
    return jwt.sign({username}, '' + process.env.JWT_SECRET);
  }

  static verify(token: string | undefined): boolean {
    try {
      return !!token && !!jwt.verify(token, '' + process.env.JWT_SECRET);
    } catch (e) {
      return false;
    }
  }

}
