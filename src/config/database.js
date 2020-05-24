import mongoose from 'mongoose';
import ENVIRONMENT from '../../environment';

mongoose.connect(ENVIRONMENT.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
