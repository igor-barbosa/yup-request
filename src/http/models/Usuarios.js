import mongoose from 'mongoose';
import Model from '../../libs/MongooseModel/Model';

class Usuarios extends Model {

    static async obterPeloEmail(email){
        return this.db.findOne({ email });
    }

}

export default Model.export({
    model: Usuarios,
    schema: mongoose.Schema({
        nome: String,
        email: String,
        senha: String
    })    
})
