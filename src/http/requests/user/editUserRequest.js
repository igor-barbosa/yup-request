import * as yup from 'yup';
import YupRequest from "../../../libs/YupRequest/YupRequest";
import User from '../../models/User';

const editUserRequest = YupRequest.createMiddleware({
    name: yup.string().required(),
    email: yup.string().email()
}, async (data, util, req) => {

    const userExist = await User.findById(req.params.id);
    if(!userExist) return util.errorText('Não foi possível editar o usuário desejado.');

});

export default editUserRequest;