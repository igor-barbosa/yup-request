import writeController from "../../utils/writeController";
import loginRequest from "../requests/auth/loginRequest";
import loginSessionRequest from "../requests/auth/loginSessionRequest";
import jwt from 'jsonwebtoken';
import ENVIRONMENT from "../../../environment";

export default class AuthorizationController {

    static login = writeController(loginRequest,async (req, res) => {
        const {user} = req.context;
        const {password, ...userData} = user;
        const token = jwt.sign(userData, ENVIRONMENT.AUTH.JWT_KEY);
        
        res.cookie('authorizationToken', token, {httpOnly: true}).send(userData);

    });

    static checkSession = writeController(loginSessionRequest,async (req, res) => {
        res.send(req.context.auth);
    })
}