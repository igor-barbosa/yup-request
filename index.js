import './src/config/database';

import express from 'express';
import cookieParser from 'cookie-parser';

import UserController from './src/http/controllers/UserController';
import AuthorizationController from './src/http/controllers/AuthorizationController';

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV;

const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.post('/users/auth', AuthorizationController.login);
app.get('/users/auth', AuthorizationController.checkSession);
app.get('/users/:id', UserController.getUser);
app.put('/users/:id', UserController.editUser);
app.delete('/users/:id', UserController.deleteUser);
app.post('/users', UserController.createUser);
app.get('/users', UserController.getUsers);

app.post('/', async (req, res) => res.send(req.body));

app.listen(PORT, () => console.log(`started in ${NODE_ENV} port: ${PORT}`));


