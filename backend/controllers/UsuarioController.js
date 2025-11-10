import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';

class UsuarioController {

    // GET - Buscar todos os usuários
    static async getAllUsuarios(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            res.json(usuarios);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            res.status(500).json({ message: 'Erro interno ao buscar usuários' });
        }
    }

    // GET - Buscar usuário por ID
    static async getUsuarioById(req, res) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findById(id);

            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            // Remove a senha da resposta
            const { senha, ...usuarioSemSenha } = usuario.toObject();
            res.json(usuarioSemSenha);
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            res.status(500).json({ message: 'Erro interno ao buscar usuário' });
        }
    }

    // POST - Criar novo usuário
    static async createUsuario(req, res) {
        try {
            const { nome, email, telefone, cpf, senha } = req.body;

            // Validações básicas
            if (!nome || !email || !telefone || !cpf || !senha) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
            }

            // Verificar se email já existe
            const emailExistente = await Usuario.findByEmail(email);
            if (emailExistente) {
                return res.status(400).json({ message: 'Email já cadastrado' });
            }

            // Verificar se CPF já existe
            const cpfExistente = await Usuario.findByCPF(cpf);
            if (cpfExistente) {
                return res.status(400).json({ message: 'CPF já cadastrado' });
            }

            // Criptografar senha
            const senhaHash = await bcrypt.hash(senha, 10);

            // Criar novo usuário
            const novoUsuario = new Usuario(nome, email, telefone, cpf, senhaHash);
            const usuarioSalvo = await novoUsuario.save();

            // Remove a senha da resposta
            const { senha: _, ...usuarioSemSenha } = usuarioSalvo.toObject();
            res.status(201).json(usuarioSemSenha);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({ message: 'Erro interno ao criar usuário' });
        }
    }

    // PUT - Atualizar usuário
    static async updateUsuario(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, telefone, senha } = req.body;

            const usuarioExistente = await Usuario.findById(id);
            if (!usuarioExistente) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            const dadosAtualizados = {};
            if (nome) dadosAtualizados.nome = nome;
            if (email) dadosAtualizados.email = email;
            if (telefone) dadosAtualizados.telefone = telefone;
            if (senha) dadosAtualizados.senha = await bcrypt.hash(senha, 10);

            const usuarioAtualizado = await Usuario.update(id, dadosAtualizados);

            const { senha: _, ...usuarioSemSenha } = usuarioAtualizado.toObject();
            res.json(usuarioSemSenha);
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            res.status(500).json({ message: 'Erro interno ao atualizar usuário' });
        }
    }

    // DELETE - Deletar usuário (soft delete)
    static async deleteUsuario(req, res) {
        try {
            const { id } = req.params;

            const usuarioExistente = await Usuario.findById(id);
            if (!usuarioExistente) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            await Usuario.delete(id);
            res.json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            res.status(500).json({ message: 'Erro interno ao deletar usuário' });
        }
    }

    // POST - Login de usuário
    static async loginUsuario(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ message: 'Email e senha são obrigatórios' });
            }

            const usuario = await Usuario.findByEmail(email);
            if (!usuario) {
                return res.status(401).json({ message: 'Email ou senha inválidos' });
            }

            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if (!senhaValida) {
                return res.status(401).json({ message: 'Email ou senha inválidos' });
            }

            const { senha: _, ...usuarioSemSenha } = usuario.toObject();
            res.json({ 
                message: 'Login realizado com sucesso',
                usuario: usuarioSemSenha 
            });
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            res.status(500).json({ message: 'Erro interno ao fazer login' });
        }
    }
}

export default UsuarioController;
