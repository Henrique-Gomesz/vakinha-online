import UsuarioModel from './UsuarioSchema.js';

class Usuario {
    constructor(nome, email, telefone, cpf, senha) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.cpf = cpf;
        this.senha = senha;
    }

    // Salvar novo usuário
    async save() {
        const novoUsuario = new UsuarioModel(this);
        return await novoUsuario.save();
    }

    // Buscar todos os usuários
    static async findAll() {
        return await UsuarioModel.find({ ativo: true });
    }

    // Buscar usuário por ID
    static async findById(id) {
        return await UsuarioModel.findById(id);
    }

    // Buscar usuário por email
    static async findByEmail(email) {
        return await UsuarioModel.findOne({ email });
    }

    // Buscar usuário por CPF
    static async findByCPF(cpf) {
        return await UsuarioModel.findOne({ cpf });
    }

    // Atualizar usuário
    static async update(id, dadosAtualizados) {
        return await UsuarioModel.findByIdAndUpdate(
            id,
            dadosAtualizados,
            { new: true, runValidators: true }
        );
    }

    // Deletar usuário (soft delete)
    static async delete(id) {
        return await UsuarioModel.findByIdAndUpdate(
            id,
            { ativo: false },
            { new: true }
        );
    }

    // Deletar permanentemente
    static async deletePermanent(id) {
        return await UsuarioModel.findByIdAndDelete(id);
    }
}

export default Usuario;
