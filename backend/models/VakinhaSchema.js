import mongoose from 'mongoose';

//Schema da Vakinha no MongoDB
const VakinhaSchema = new mongoose.Schema(
    {
        titulo: { type: String, required: true },
        descricao: { type: String, required: true },
        metaFinanceira: { type: Number, required: true },
        arrecadado: { type: Number, default: 0 },
        dataLimite: { type: Date },
        categoria: { 
            type: String, 
            required: true,
            enum: ['saude', 'educacao', 'emergencia', 'projetos', 'caridade', 'animais', 'esportes', 'tecnologia', 'outros']
        },
        imagem: { type: String },
        nomeResponsavel: { type: String, required: true },
        emailContato: { type: String, required: true },
        ativo: { type: Boolean, default: true },
        contribuicoes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Contribuicao'
            }
        ]
    },
    {
        timestamps: true, // Cria campos de createdAt e updatedAt automaticamente
    }
);

const VakinhaModel = mongoose.model('Vakinha', VakinhaSchema);

export default VakinhaModel;
