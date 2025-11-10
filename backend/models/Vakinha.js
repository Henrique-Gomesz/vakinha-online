import VakinhaModel from './VakinhaSchema.js';

class Vakinha {
    constructor(titulo, descricao, metaFinanceira, dataLimite, categoria, imagem, nomeResponsavel, emailContato) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.metaFinanceira = metaFinanceira;
        this.dataLimite = dataLimite;
        this.categoria = categoria;
        this.imagem = imagem;
        this.nomeResponsavel = nomeResponsavel;
        this.emailContato = emailContato;
        this.arrecadado = 0;
    }

    // Salvar nova vakinha
    async save() {
        const novaVakinha = new VakinhaModel(this);
        return await novaVakinha.save();
    }

    // Buscar todas as vakinhas ativas
    static async findAll() {
        return await VakinhaModel.find({ ativo: true })
            .populate('contribuicoes')
            .sort({ createdAt: -1 });
    }

    // Buscar vakinhas por categoria
    static async findByCategoria(categoria) {
        return await VakinhaModel.find({ categoria, ativo: true })
            .populate('contribuicoes')
            .sort({ createdAt: -1 });
    }

    // Buscar vakinha por ID
    static async findById(id) {
        return await VakinhaModel.findById(id).populate('contribuicoes');
    }

    // Atualizar vakinha
    static async update(id, dadosAtualizados) {
        return await VakinhaModel.findByIdAndUpdate(
            id,
            dadosAtualizados,
            { new: true, runValidators: true }
        );
    }

    // Adicionar contribuição (atualizar valor arrecadado)
    static async adicionarContribuicao(id, valorContribuicao, contribuicaoId) {
        return await VakinhaModel.findByIdAndUpdate(
            id,
            { 
                $inc: { arrecadado: valorContribuicao },
                $push: { contribuicoes: contribuicaoId }
            },
            { new: true }
        );
    }

    // Deletar vakinha (soft delete)
    static async delete(id) {
        return await VakinhaModel.findByIdAndUpdate(
            id,
            { ativo: false },
            { new: true }
        );
    }

    // Deletar permanentemente
    static async deletePermanent(id) {
        return await VakinhaModel.findByIdAndDelete(id);
    }
}

export default Vakinha;
