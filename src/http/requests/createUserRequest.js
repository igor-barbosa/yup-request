import * as yup from 'yup';
import YupRequest from "../../libs/YupRequest/YupRequest";

const createUserRequest = YupRequest.createMiddleware({
    name: yup.string().cpf().required()
});

export default createUserRequest;