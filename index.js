import * as yup from 'yup';
import express from 'express';
import YupRequest from './src/libs/YupRequest/YupRequest';
import createUserRequest from './src/http/requests/createUserRequest';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/', createUserRequest, async (req, res) => {
    res.send(req.body);
});


app.listen(port, () => console.log(`port: ${port}`));

