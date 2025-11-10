import Contribuicao from '../models/Contribuicao.js';
import Vakinha from '../models/Vakinha.js';

class ContribuicaoController {

    static async getAllContribuicoes(req, res) {
        try {
            const contribuicoes = await Contribuicao.findAll();
            res.json(contribuicoes);
        } catch (error) {
            console.error('Erro ao buscar contribuições:', error);
            res.status(500).json({ message: 'Erro interno ao buscar contribuições' });
        }
    }

    static async getContribuicoesByVakinha(req, res) {
        try {
            const { vakinhaId } = req.params;
            const contribuicoes = await Contribuicao.findByVakinha(vakinhaId);
            res.json(contribuicoes);
        } catch (error) {
            console.error('Erro ao buscar contribuições:', error);
            res.status(500).json({ message: 'Erro interno ao buscar contribuições' });
        }
    }

    static async getContribuicaoById(req, res) {
        try {
            const { id } = req.params;
            const contribuicao = await Contribuicao.findById(id);

            if (!contribuicao) {
                return res.status(404).json({ message: 'Contribuição não encontrada' });
            }

            res.json(contribuicao);
        } catch (error) {
            console.error('Erro ao buscar contribuição:', error);
            res.status(500).json({ message: 'Erro interno ao buscar contribuição' });
        }
    }

    static async createContribuicao(req, res) {
        try {
            const { 
                vakinhaId, 
                nomeContribuidor, 
                emailContribuidor, 
                valor, 
                mensagem, 
                anonimo 
            } = req.body;

            // Validações básicas
            if (!vakinhaId || !nomeContribuidor || !emailContribuidor || !valor) {
                return res.status(400).json({ 
                    message: 'Vakinha, nome, email e valor são obrigatórios' 
                });
            }

            // Validar valor
            if (valor <= 0) {
                return res.status(400).json({ 
                    message: 'Valor da contribuição deve ser maior que zero' 
                });
            }

            // Verificar se a vakinha existe
            const vakinha = await Vakinha.findById(vakinhaId);
            if (!vakinha) {
                return res.status(404).json({ message: 'Vakinha não encontrada' });
            }

            const novaContribuicao = new Contribuicao(
                vakinhaId,
                nomeContribuidor,
                emailContribuidor,
                valor,
                mensagem,
                anonimo
            );
            const contribuicaoSalva = await novaContribuicao.save();

            await Vakinha.adicionarContribuicao(vakinhaId, valor, contribuicaoSalva._id);

            res.status(201).json(contribuicaoSalva);
        } catch (error) {
            console.error('Erro ao criar contribuição:', error);
            res.status(500).json({ message: 'Erro interno ao criar contribuição' });
        }
    }

    static async deleteContribuicao(req, res) {
        try {
            const { id } = req.params;

            const contribuicaoExistente = await Contribuicao.findById(id);
            if (!contribuicaoExistente) {
                return res.status(404).json({ message: 'Contribuição não encontrada' });
            }

            await Contribuicao.delete(id);
            res.json({ message: 'Contribuição deletada com sucesso' });
        } catch (error) {
            console.error('Erro ao deletar contribuição:', error);
            res.status(500).json({ message: 'Erro interno ao deletar contribuição' });
        }
    }
}

export default ContribuicaoController;
