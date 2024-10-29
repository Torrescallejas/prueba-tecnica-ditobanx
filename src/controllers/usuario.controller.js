
import { Usuario } from '../models/usuarioModel.js'; // Asegúrate de que la ruta sea correcta
import { createToken } from '../utils/authMiddleware.js';

//Funcion para obtener todos los usuarios
export async function getUsers(req, res) {
    try {
        const users = await Usuario.findAll();
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return res.status(500).json({
            message: 'Hubo un error al obtener la lista de usuarios.',
            error: error.message || error // Para proporcionar más detalles del error
        });
    }
}

//Funcion para obtener un Usuario mediante el id 
export async function getUserById(req, res) {
    const {id} = req.params //Obtenes el id mediante el parametro de la url
    try {
        const user = await Usuario.findByPk(id)
        if(user === null) {
            return res.status(500).json({message: 'El usuario con el ID no existe'})
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return res.status(500).json({
            message: 'Hubo un error al obtener la lista de usuarios.',
            error: error.message || error // Para proporcionar más detalles del error
        });
    }
}


//Funcion encargada de crear el usuario
export async function createUser(req, res) {
    const {id} = req.params; //Obtenes el id mediante el parametro de la url
    const nuevoUsuario = req.body; //Obtenemos la informacion del usuario mediante el body

    try {
        const usuario = await Usuario.create(nuevoUsuario); //Creamos el nuevo usuario
        const token = createToken(usuario) //le pasamos el usario creado la funcion para crear el token
        return res.status(200).json({usuario, token});
    } catch (error) {
        console.error('Al crear el usuario:', error);
        return res.status(500).json({
            message: 'Hubo un error al obtener la lista de usuarios.',
            error: error.message || error // Para proporcionar más detalles del error
        });
    }
}


//Funcion para actualizar un Usuario
export async function updateUser(req, res) {
    const {id} = req.params; //Obtenes el id mediante el parametro de la url
    const newDataUser = req.body; //Obtenemos la informacion del usuario mediante el body

    try {
        const usuario = await Usuario.findByPk(id);
        usuario.update(newDataUser);
        return res.status(200).json(usuario);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return res.status(500).json({
            message: 'Hubo un error al obtener la lista de usuarios.',
            error: error.message || error // Para proporcionar más detalles del error
        });
    }
}

//Funcion para eliminar un usuario
export async function deleteUser(req, res) {
    const {id} = req.params; //Obtenes el id mediante el parametro de la url

    try {
        const usuario = await Usuario.findByPk(id) //Buscamos el usuario por id
        usuario.destroy(); //Se destruye el usuario encontrado
        return res.status(200).json({message: 'El usuario ha sido eliminado correctamente'});
    } catch (error) {
        console.error('Error al eliminar usuarios:', error);
        return res.status(500).json({
            message: 'Hubo un error al obtener la lista de usuarios.',
            error: error.message || error // Para proporcionar más detalles del error
        });
    }
}