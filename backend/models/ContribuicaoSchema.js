import mongoose from 'mongoose';

//Schema da Contribuição no MongoDB
const ContribuicaoSchema = new mongoose.Schema(
    {
        vakinhaId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Vakinha',
            required: true 
        },
        nomeContribuidor: { type: String, required: true },
        emailContribuidor: { type: String, required: true },
        valor: { type: Number, required: true },
        mensagem: { type: String },
        anonimo: { type: Boolean, default: false }
    },
    {
        timestamps: true, // Cria campos de createdAt e updatedAt automaticamente
    }
);

const ContribuicaoModel = mongoose.model('Contribuicao', ContribuicaoSchema);

export default ContribuicaoModel;
