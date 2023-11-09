 import jwt from 'jsonwebtoken';
 import {errorHandler} from '../utils/error.js'

 export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;
    if (!token) return next(errorHandler(401, "Vous n'etes pas authentifier!"));
     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Jeton non valide!'));
        req.user = user;
        next();
     });
}