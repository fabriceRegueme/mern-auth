import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config()

const PORT = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
});

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});




app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erreur interne du serveur!';
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  });