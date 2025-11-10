import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        await mongoose.connect(uri);
        console.log('MongoDB conectado com sucesso!');

    } catch (error) {
        console.error('Erro ao conectar no MongoDB: ', error.message);
        process.exit(1);
    }
};

export default connectDB;
