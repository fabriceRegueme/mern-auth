import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
dotenv.config()

const PORT = process.env.PORT

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

const app = express();

app.listen(PORT, () => {
    console.log('Server is running on port: $PORT');
});

app.use('/api/user', userRoutes);
