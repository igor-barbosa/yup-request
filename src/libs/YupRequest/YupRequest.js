import * as yup from 'yup';
import './locale';

export default class YupRequest {
    
    constructor(body, schema) {
        this.body = body;
        this.schema = yup.object().shape(schema);
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