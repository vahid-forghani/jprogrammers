"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRestApi = void 0;
const user_1 = require("./user");
const body_parser_1 = __importDefault(require("body-parser"));
const jwt_service_1 = require("./jwt.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
var jsonParser = body_parser_1.default.json();
class AuthRestApi {
    constructor(app) {
        this.jwtService = new jwt_service_1.JwtService();
        this.init(app);
    }
    init(app) {
        app.post('/login', jsonParser, (request, response) => {
            const { username, password } = request.body;
            user_1.User.find({ username }, (error, documents) => {
                if (documents.length == 0) {
                    response.status(404).send({ message: 'Not found' });
                }
                else {
                    bcrypt_1.default.compare(password, documents[0].password, (err, result) => {
                        if (result) {
                            response.send({ token: this.jwtService.generateToken(username) });
                        }
                        else {
                            response.status(401).send({ message: 'Unauthorized' });
                        }
                    });
                }
            });
        });
        app.post('/verify', jsonParser, (request, response) => {
            const { token } = request.body;
            if (this.jwtService.verify(token)) {
                response.send({ message: 'verified' });
            }
            else {
                response.status(400).send({ message: 'not verified' });
            }
        });
    }
}
exports.AuthRestApi = AuthRestApi;
