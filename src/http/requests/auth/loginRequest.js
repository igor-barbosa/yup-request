import * as yup from 'yup';

import User from './../../models/User';
import sha1 from 'sha1';
import YupRequest from '../../../libs/YupRequest/YupRequest';

const loginRequest = YupRequest.createMiddleware({
    login: yup.string().email(),
    password: yup.string().required()
}, async (data, util, req) => {

    data.password = sha1(data.password);

    const user = await User.getByEmail(data.email);

    if(!user) return util.errorText('Login ou senha incorreta.');
    if(user.password != data.password) return util.errorText('Login ou senha incorreta.');    

    req.context.user = user;
    
});

export default loginRequest;