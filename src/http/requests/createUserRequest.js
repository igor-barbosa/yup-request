import * as yup from 'yup';
import YupRequest from "../../libs/YupRequest/YupRequest";
import nested from 'nested-property';

function makeValidationRequest(schema, customValidation = null) {
    return async function (req, res, next) {

        const util = {
            label: (path) => {
                if(!!req.body.__labels__ && !!req.body.__labels__[path]){
                    return req.body.__labels__[path];
                } else {
                    return path;
                }
            },
            errors: (data) => ({
                error: true,
                type: 'fields',
                data: data.map(fieldError => ({
                    path: fieldError.path,
                    value: nested.get(req.body,fieldError.path),
                    message: fieldError.message,
                    type: 'custom'
                })) 
            }),
            errorText: (message) => {
                return {
                    error: true,
                    type: 'text',
                    data: message
                }
            }
        }

        const validate = new YupRequest(req.body, schema);    
        const {error, data} = await validate.run();    
        if(error){
            res.send({ error, data });
        } else {
            const resp = (!!customValidation) ? customValidation(data, util) : { error : false };
            if(resp.error){
                res.send(resp);
            } else {
                req.body = data;
                next();
            }
        }
    }
}

const createUserRequest = makeValidationRequest({
    name: yup.string().cpf().required()
});

export default createUserRequest;