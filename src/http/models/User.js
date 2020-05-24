import mongoose from 'mongoose';
import Model from '../../libs/MongooseModel/Model';

class User extends Model {

    static async getByEmail(email){
        return this.db.findOne({ email }).lean();
    }

}

export default Model.export({
    model: User,
    schema: mongoose.Schema({
        name: String,
        email: String,
        password: String
    })    
})
