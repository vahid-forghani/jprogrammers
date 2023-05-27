import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config();

export class JwtService {

  generateToken(username: string): string {
    return jwt.sign({username}, '' + process.env.JWT_SECRET);
  }

  verify(token: string | undefined): boolean {
    try {
      return !!token && !!jwt.verify(token, '' + process.env.JWT_SECRET);
    } catch(e) {
      return false;
    }
  }

}
