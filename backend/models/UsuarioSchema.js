import mongoose from 'mongoose';

//Schema do Usuário no MongoDB
const UsuarioSchema = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        telefone: { type: String, required: true },
        cpf: { type: String, required: true, unique: true },
        senha: { type: String, required: true },
        ativo: { type: Boolean, default: true }
    },
    {
        timestamps: true, // Cria campos de createdAt e updatedAt automaticamente
    }
);

const UsuarioModel = mongoose.model('Usuario', UsuarioSchema);

export default UsuarioModel;
