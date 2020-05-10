import * as yup from 'yup';
import YupRequest from "../../libs/YupRequest/YupRequest";
import Usuarios from '../models/Usuarios';
import sha1 from 'sha1';

const cadastrarUsuarioRequest = YupRequest.createMiddleware({
    nome: yup.string().required(),
    email: yup.string().email(),
    senha: yup.string().required()
}, async (data, uitl) => {

    const user = await Usuarios.obterPeloEmail(data.email);
    if(user) return uitl.errors([{
        path: 'nome', message: 'Já existe um usuário cadastrado com o e-mail informado.'
    }]);

    data.senha = sha1(data.senha);
    
});

export default cadastrarUsuarioRequest;