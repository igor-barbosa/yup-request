import Usuarios from "../models/Usuarios";
import cadastrarUsuarioRequest from "../requests/cadastrarUsuarioRequest";

const writeFunction = (...fns) => {
    return fns;
}

export default class UsuariosController {

    static cadastrarUsuario = writeFunction(cadastrarUsuarioRequest,async (req, res) => {
        const data = await Usuarios.create(req.body);
        res.send(data)
    });

    static editarUsuario = writeFunction(async(req, res) => {
        const data = await Usuarios.update(req.params.id, req.body);
        res.send(data)
    });

    static obterUsuario = writeFunction(async(req, res) => {
        const data = await Usuarios.findById(req.params.id);
        res.send(data)
    });

    static excluirUsuario = writeFunction(async(req, res) => {
        const data = await Usuarios.delete(req.params.id);
        res.send(data)
    });

    static obterUsuarios = writeFunction(async(req, res) => {
        const data = await Usuarios.findAll();
        res.send(data)
    });
}