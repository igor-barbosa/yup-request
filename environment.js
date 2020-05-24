const NODE_ENV = process.env.NODE_ENV || 'DEVELOPMENT';

const ENVS =  {
    DEVELOPMENT: {
        MONGODB: 'mongodb://root:123456@localhost:27017/myapp?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false',
        AUTH:{
            JWT_KEY: '123456'
        }
    },
    PRODUCTION: {
        MONGODB: 'mongodb://root:123456@localhost:27017/myapp?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false',
        AUTH:{
            JWT_KEY: '123456'
        }
    }
}

const ENVIRONMENT = ENVS[NODE_ENV];

export default ENVIRONMENT;