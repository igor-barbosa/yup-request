import * as yup from 'yup';
import './locale';
import nested from 'nested-property';

export default class YupRequest {
    
    constructor(body, schema) {
        this.body = body;
        this.schema = yup.object().shape(schema);
    }

    static createMiddleware(schema, customValidation = null) {
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

    async run() {
        try {
            const data = await this.schema.validate(this.body, {
                abortEarly: false,
                stripUnknown: true
            });
            return {
                error: false,
                data
            }
        }catch(err){

            const errors = err.inner.map((error) => {
                
                let label = null;
                if(!!this.body.__labels__ && typeof this.body.__labels__ == 'object') {
                    const dynamicLabel = this.body.__labels__[error.path];
                    if(!!dynamicLabel) {
                        label = dynamicLabel;
                    } else {
                        label = error.path;
                    }
                } else {
                    label = error.path;
                }

                const message = error.message.replace(`{{${error.path}}}`, label);
                return {
                    path: error.path,
                    value: error.value || null,
                    message,
                    type: error.type
                }
            });

            return {
                error: true,
                data : errors
            }
        }
    }
}