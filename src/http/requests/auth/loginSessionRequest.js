
import jwt from 'jsonwebtoken';
import YupRequest from '../../../libs/YupRequest/YupRequest';
import ENVIRONMENT from '../../../../environment';

const loginSessionRequest = YupRequest.createMiddleware({}, async (data,util,req) => {
    
    const { authorizationToken } = req.cookies;
    
    
    if(!authorizationToken || authorizationToken == ''){
        return util.errorText('Não foi possível continuar esta ação. Por favor, faça seu login novamente.', 401);
    } else {
        
        try {
            const token = await new Promise((resolve, reject) => {
                jwt.verify(authorizationToken, ENVIRONMENT.AUTH.JWT_KEY, (err, tokenDecodificado) => {
                    if(err) reject(err);
                    else {
                        resolve(tokenDecodificado);
                    }
                });
            });
            req.context.auth = token;

        } catch(e){
            return util.errorText('Sessão inválida. Por favor, faça seu login novamente.', 401)
        }
        
    }
})

export default loginSessionRequest;