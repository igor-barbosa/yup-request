import './src/config';

import express from 'express';

import UsuariosController from './src/http/controllers/UsuariosController';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/usuarios/:id', UsuariosController.obterUsuario);
app.put('/usuarios/:id', UsuariosController.editarUsuario);
app.delete('/usuarios/:id', UsuariosController.excluirUsuario);
app.post('/usuarios', UsuariosController.cadastrarUsuario);
app.get('/usuarios', UsuariosController.obterUsuarios);


app.post('/', async (req, res) => {
    res.send(req.body);
});

app.listen(port, () => console.log(`port: ${port}`));

