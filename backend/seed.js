import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import UsuarioModel from './models/UsuarioSchema.js';
import VakinhaModel from './models/VakinhaSchema.js';
import ContribuicaoModel from './models/ContribuicaoSchema.js';

dotenv.config();

const seedDatabase = async () => {
    try {
        // Conectar ao banco
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado ao MongoDB!');

        // Limpar dados existentes
        await UsuarioModel.deleteMany({});
        await VakinhaModel.deleteMany({});
        await ContribuicaoModel.deleteMany({});
        console.log('Banco de dados limpo!');

        // Criar usuários de exemplo
        const senhaHash = await bcrypt.hash('senha123', 10);
        
        const usuarios = await UsuarioModel.insertMany([
            {
                nome: 'João Silva',
                email: 'joao@email.com',
                telefone: '(11) 98765-4321',
                cpf: '123.456.789-00',
                senha: senhaHash,
                ativo: true
            },
            {
                nome: 'Maria Santos',
                email: 'maria@email.com',
                telefone: '(11) 98765-4322',
                cpf: '987.654.321-00',
                senha: senhaHash,
                ativo: true
            },
            {
                nome: 'Pedro Costa',
                email: 'pedro@email.com',
                telefone: '(11) 98765-4323',
                cpf: '456.789.123-00',
                senha: senhaHash,
                ativo: true
            }
        ]);
        console.log(`${usuarios.length} usuários criados!`);

        // Criar vakinhas de exemplo
        const vakinhas = await VakinhaModel.insertMany([
            {
                titulo: 'Ajude o João a comprar uma cadeira de rodas',
                descricao: 'João é um jovem de 25 anos que sofreu um acidente e precisa de uma cadeira de rodas motorizada para ter mais autonomia. Qualquer contribuição é bem-vinda!',
                metaFinanceira: 5000,
                arrecadado: 1500,
                dataLimite: new Date('2025-12-31'),
                categoria: 'saude',
                imagem: 'https://via.placeholder.com/400x300?text=Cadeira+de+Rodas',
                nomeResponsavel: 'João Silva',
                emailContato: 'joao@email.com',
                ativo: true
            },
            {
                titulo: 'Material escolar para crianças carentes',
                descricao: 'Estamos arrecadando fundos para comprar material escolar para 50 crianças de uma comunidade carente. Ajude essas crianças a terem um futuro melhor!',
                metaFinanceira: 3000,
                arrecadado: 800,
                dataLimite: new Date('2025-11-30'),
                categoria: 'educacao',
                imagem: 'https://via.placeholder.com/400x300?text=Material+Escolar',
                nomeResponsavel: 'Maria Santos',
                emailContato: 'maria@email.com',
                ativo: true
            },
            {
                titulo: 'Tratamento veterinário para Rex',
                descricao: 'Rex é um cachorro de rua que foi atropelado e precisa de cirurgia urgente. Vamos ajudá-lo a ter uma segunda chance!',
                metaFinanceira: 2000,
                arrecadado: 500,
                dataLimite: new Date('2025-11-20'),
                categoria: 'animais',
                imagem: 'https://via.placeholder.com/400x300?text=Cachorro+Rex',
                nomeResponsavel: 'Pedro Costa',
                emailContato: 'pedro@email.com',
                ativo: true
            },
            {
                titulo: 'Reforma do projeto social Esperança',
                descricao: 'Nosso projeto social precisa de reformas urgentes no telhado e nas salas. Ajude-nos a continuar atendendo 100 crianças diariamente!',
                metaFinanceira: 10000,
                arrecadado: 3500,
                dataLimite: new Date('2026-01-31'),
                categoria: 'caridade',
                imagem: 'https://via.placeholder.com/400x300?text=Projeto+Social',
                nomeResponsavel: 'João Silva',
                emailContato: 'joao@email.com',
                ativo: true
            },
            {
                titulo: 'Equipamentos para time de futebol juvenil',
                descricao: 'Nosso time juvenil precisa de novos uniformes e equipamentos para participar do campeonato regional. Ajude nossos jovens atletas!',
                metaFinanceira: 4000,
                arrecadado: 1200,
                dataLimite: new Date('2025-12-15'),
                categoria: 'esportes',
                imagem: 'https://via.placeholder.com/400x300?text=Futebol+Juvenil',
                nomeResponsavel: 'Maria Santos',
                emailContato: 'maria@email.com',
                ativo: true
            }
        ]);
        console.log(`${vakinhas.length} vakinhas criadas!`);

        // Criar contribuições de exemplo
        const contribuicoes = await ContribuicaoModel.insertMany([
            {
                vakinhaId: vakinhas[0]._id,
                nomeContribuidor: 'Ana Paula',
                emailContribuidor: 'ana@email.com',
                valor: 500,
                mensagem: 'Força João! Você vai conseguir!',
                anonimo: false
            },
            {
                vakinhaId: vakinhas[0]._id,
                nomeContribuidor: 'Carlos Eduardo',
                emailContribuidor: 'carlos@email.com',
                valor: 1000,
                mensagem: 'Conte comigo!',
                anonimo: false
            },
            {
                vakinhaId: vakinhas[1]._id,
                nomeContribuidor: 'Anônimo',
                emailContribuidor: 'anonimo@email.com',
                valor: 300,
                mensagem: 'Pela educação das nossas crianças!',
                anonimo: true
            },
            {
                vakinhaId: vakinhas[2]._id,
                nomeContribuidor: 'Lucia Ferreira',
                emailContribuidor: 'lucia@email.com',
                valor: 500,
                mensagem: 'Salve o Rex!',
                anonimo: false
            }
        ]);
        console.log(`${contribuicoes.length} contribuições criadas!`);

        // Atualizar referências de contribuições nas vakinhas
        await VakinhaModel.findByIdAndUpdate(vakinhas[0]._id, {
            $push: { contribuicoes: { $each: [contribuicoes[0]._id, contribuicoes[1]._id] } }
        });
        await VakinhaModel.findByIdAndUpdate(vakinhas[1]._id, {
            $push: { contribuicoes: contribuicoes[2]._id }
        });
        await VakinhaModel.findByIdAndUpdate(vakinhas[2]._id, {
            $push: { contribuicoes: contribuicoes[3]._id }
        });

        console.log('\n✅ Banco de dados populado com sucesso!');
        console.log('\n📊 Dados criados:');
        console.log(`   - ${usuarios.length} usuários`);
        console.log(`   - ${vakinhas.length} vakinhas`);
        console.log(`   - ${contribuicoes.length} contribuições`);
        console.log('\n🔑 Credenciais de teste:');
        console.log('   Email: joao@email.com');
        console.log('   Senha: senha123\n');

        process.exit(0);
    } catch (error) {
        console.error('Erro ao popular banco de dados:', error);
        process.exit(1);
    }
};

seedDatabase();
