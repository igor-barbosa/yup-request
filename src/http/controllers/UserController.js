import createUserRequest from './../requests/user/createUserRequest'
import editUserRequest from './../requests/user/editUserRequest'
import User from './../models/User';
import writeController from '../../utils/writeController';

export default class UserController {
    static createUser = writeController(createUserRequest,async (req, res) => {
        const data = await User.create(req.body);
        res.send(data);
    });

    static editUser = writeController(editUserRequest,async(req, res) => {
        const data = await User.update(req.params.id, req.body);
        res.send(data)
    });

    static getUser = writeController(async(req, res) => {
        const data = await User.findById(req.params.id);
        res.send(data)
    });

    static deleteUser = writeController(async(req, res) => {
        const data = await User.delete(req.params.id);
        res.send(data)
    });

    static getUsers = writeController(async(req, res) => {
        const data = await User.findAll();
        res.send(data)
    });
}