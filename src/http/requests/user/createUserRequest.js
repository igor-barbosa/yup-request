import * as yup from 'yup';
import YupRequest from "../../../libs/YupRequest/YupRequest";
import User from '../../models/User';
import sha1 from 'sha1';

const userCreateRequest = YupRequest.createMiddleware({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
}, async (data, uitl) => {

    const userExist = await User.getByEmail(data.email);
    if(userExist) return uitl.errors([{
        path: 'nome', message: 'Já existe um usuário cadastrado com o e-mail informado.'
    }]);

    data.password = sha1(data.password);
    
});

export default userCreateRequest;