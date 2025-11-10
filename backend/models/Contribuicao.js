import ContribuicaoModel from './ContribuicaoSchema.js';

class Contribuicao {
    constructor(vakinhaId, nomeContribuidor, emailContribuidor, valor, mensagem, anonimo) {
        this.vakinhaId = vakinhaId;
        this.nomeContribuidor = nomeContribuidor;
        this.emailContribuidor = emailContribuidor;
        this.valor = valor;
        this.mensagem = mensagem;
        this.anonimo = anonimo || false;
    }

    // Salvar nova contribuição
    async save() {
        const novaContribuicao = new ContribuicaoModel(this);
        return await novaContribuicao.save();
    }

    // Buscar todas as contribuições
    static async findAll() {
        return await ContribuicaoModel.find().populate('vakinhaId').sort({ createdAt: -1 });
    }

    // Buscar contribuições por vakinha
    static async findByVakinha(vakinhaId) {
        return await ContribuicaoModel.find({ vakinhaId }).sort({ createdAt: -1 });
    }

    // Buscar contribuição por ID
    static async findById(id) {
        return await ContribuicaoModel.findById(id).populate('vakinhaId');
    }

    // Deletar contribuição
    static async delete(id) {
        return await ContribuicaoModel.findByIdAndDelete(id);
    }
}

export default Contribuicao;
