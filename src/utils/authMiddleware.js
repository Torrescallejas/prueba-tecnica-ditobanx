import jwt from 'jsonwebtoken';

// Función para crear un token
export function createToken(user) {
    // Información que incluirás en el token (normalmente el ID o email del usuario)
    const payload = {
        id: user.id,  // o cualquier campo relevante del usuario
        email: user.email
    };

    // Crear el token firmando con la clave secreta y un tiempo de expiración
    const token = jwt.sign(payload, 'panesconpollo', { expiresIn: '1h' });

    return token;
}

// Middleware para verificar si el token de autorización es válido
export function verifyToken(req, res, next) {
    // Obtener el token de los headers de autorización
    const token = req.headers['authorization'];

    // Verificar si el token está presente
    if (!token) {
        return res.status(403).json({ message: 'No se proporcionó un token de autorización.' });
    }

    // Verificar el token
    jwt.verify(token, 'panesconpollo', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token no válido.' });
        }
        
        // Si el token es válido, podemos acceder al payload decodificado
        req.user = decoded; // Almacenar la información del usuario decodificado en la request
        next(); // Continuar al siguiente middleware o ruta
    });
}