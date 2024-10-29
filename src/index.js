import express from "express";
import cors from "cors";

import usuariosRutas from './routes/usuario.routes.js';
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//Hacemos uso de todas los endpoints definidos
app.use('/api', usuariosRutas)

//En acaso que escribamos mal la url nos mandara a este
app.get('*', (req, res) => {
    return res.status(500).json({message: 'Endpoint Not Found'});
})

app.listen(port, () => {
    //probarConexcion(); //CONEXION EXITOSA
    console.log('Server on PORT: ', port);
})
