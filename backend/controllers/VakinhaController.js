import Vakinha from '../models/Vakinha.js';

class VakinhaController {

    // GET - Buscar todas as vakinhas
    static async getAllVakinhas(req, res) {
        try {
            const { categoria } = req.query;
            
            let vakinhas;
            if (categoria && categoria !== 'todas') {
                vakinhas = await Vakinha.findByCategoria(categoria);
            } else {
                vakinhas = await Vakinha.findAll();
            }

            res.json(vakinhas);
        } catch (error) {
            console.error('Erro ao buscar vakinhas:', error);
            res.status(500).json({ message: 'Erro interno ao buscar vakinhas' });
        }
    }

    // GET - Buscar vakinha por ID
    static async getVakinhaById(req, res) {
        try {
            const { id } = req.params;
            const vakinha = await Vakinha.findById(id);

            if (!vakinha) {
                return res.status(404).json({ message: 'Vakinha não encontrada' });
            }

            res.json(vakinha);
        } catch (error) {
            console.error('Erro ao buscar vakinha:', error);
            res.status(500).json({ message: 'Erro interno ao buscar vakinha' });
        }
    }

    // POST - Criar nova vakinha
    static async createVakinha(req, res) {
        try {
            const { 
                titulo, 
                descricao, 
                metaFinanceira, 
                dataLimite, 
                categoria, 
                imagem, 
                nomeResponsavel, 
                emailContato 
            } = req.body;

            // Validações básicas
            if (!titulo || !descricao || !metaFinanceira || !categoria || !nomeResponsavel || !emailContato) {
                return res.status(400).json({ 
                    message: 'Título, descrição, meta financeira, categoria, nome do responsável e email são obrigatórios' 
                });
            }

            // Validar meta financeira
            if (metaFinanceira <= 0) {
                return res.status(400).json({ 
                    message: 'Meta financeira deve ser maior que zero' 
                });
            }

            // Criar nova vakinha
            const novaVakinha = new Vakinha(
                titulo, 
                descricao, 
                metaFinanceira, 
                dataLimite, 
                categoria, 
                imagem, 
                nomeResponsavel, 
                emailContato
            );
            const vakinhaSalva = await novaVakinha.save();

            res.status(201).json(vakinhaSalva);
        } catch (error) {
            console.error('Erro ao criar vakinha:', error);
            res.status(500).json({ message: 'Erro interno ao criar vakinha' });
        }
    }

    // PUT - Atualizar vakinha
    static async updateVakinha(req, res) {
        try {
            const { id } = req.params;
            const dadosAtualizados = req.body;

            const vakinhaExistente = await Vakinha.findById(id);
            if (!vakinhaExistente) {
                return res.status(404).json({ message: 'Vakinha não encontrada' });
            }

            // Não permitir atualização do valor arrecadado diretamente
            delete dadosAtualizados.arrecadado;

            const vakinhaAtualizada = await Vakinha.update(id, dadosAtualizados);
            res.json(vakinhaAtualizada);
        } catch (error) {
            console.error('Erro ao atualizar vakinha:', error);
            res.status(500).json({ message: 'Erro interno ao atualizar vakinha' });
        }
    }

    // DELETE - Deletar vakinha (soft delete)
    static async deleteVakinha(req, res) {
        try {
            const { id } = req.params;

            const vakinhaExistente = await Vakinha.findById(id);
            if (!vakinhaExistente) {
                return res.status(404).json({ message: 'Vakinha não encontrada' });
            }

            await Vakinha.delete(id);
            res.json({ message: 'Vakinha deletada com sucesso' });
        } catch (error) {
            console.error('Erro ao deletar vakinha:', error);
            res.status(500).json({ message: 'Erro interno ao deletar vakinha' });
        }
    }

    // GET - Buscar vakinhas por categoria
    static async getVakinhasByCategoria(req, res) {
        try {
            const { categoria } = req.params;
            const vakinhas = await Vakinha.findByCategoria(categoria);
            res.json(vakinhas);
        } catch (error) {
            console.error('Erro ao buscar vakinhas por categoria:', error);
            res.status(500).json({ message: 'Erro interno ao buscar vakinhas' });
        }
    }
}

export default VakinhaController;
