import mongoose from 'mongoose';

export default class Model {
    
    static db = null;

    static table = null;

    static export ({ model, schema }){    
        model.table = model.name;    
        model.db = mongoose.model(model.table, schema);    
        Object.defineProperties(model,{
            table: {
                value: model.table,
                writable: false
            },
            db: {
                value: model.db,
                writable: false
            }
        })
    
        return model;
    }

    static async create(data) {
        return this.db.create(data);        
    }

    static async update(_id, data){
        await this.db.updateOne({_id}, data);
        return this.findById(_id);
    }

    static async delete(_id){
        await this.db.deleteOne({_id});
        return await this.db.findOne({_id});
    }

    static async findById(_id){
        return this.db.findOne({_id});
    }

    static async findAll(){
        return this.db.find();
    }
}