import express from 'express';
import UsuarioController from '../controllers/UsuarioController.js';
import VakinhaController from '../controllers/VakinhaController.js';
import ContribuicaoController from '../controllers/ContribuicaoController.js';

const router = express.Router();

// ====== ROTAS DE USUÁRIOS ======

// GET - Buscar todos os usuários
router.get('/api/usuarios', UsuarioController.getAllUsuarios);

// GET - Buscar usuário por ID
router.get('/api/usuarios/:id', UsuarioController.getUsuarioById);

// POST - Criar novo usuário
router.post('/api/usuarios', UsuarioController.createUsuario);

// POST - Login de usuário
router.post('/api/usuarios/login', UsuarioController.loginUsuario);

// PUT - Atualizar usuário
router.put('/api/usuarios/:id', UsuarioController.updateUsuario);

// DELETE - Deletar usuário
router.delete('/api/usuarios/:id', UsuarioController.deleteUsuario);


// ====== ROTAS DE VAKINHAS ======

// GET - Buscar todas as vakinhas (com filtro opcional por categoria via query)
router.get('/api/vakinhas', VakinhaController.getAllVakinhas);

// GET - Buscar vakinha por ID
router.get('/api/vakinhas/:id', VakinhaController.getVakinhaById);

// GET - Buscar vakinhas por categoria
router.get('/api/vakinhas/categoria/:categoria', VakinhaController.getVakinhasByCategoria);

// POST - Criar nova vakinha
router.post('/api/vakinhas', VakinhaController.createVakinha);

// PUT - Atualizar vakinha
router.put('/api/vakinhas/:id', VakinhaController.updateVakinha);

// DELETE - Deletar vakinha
router.delete('/api/vakinhas/:id', VakinhaController.deleteVakinha);


// ====== ROTAS DE CONTRIBUIÇÕES ======

// GET - Buscar todas as contribuições
router.get('/api/contribuicoes', ContribuicaoController.getAllContribuicoes);

// GET - Buscar contribuição por ID
router.get('/api/contribuicoes/:id', ContribuicaoController.getContribuicaoById);

// GET - Buscar contribuições por vakinha
router.get('/api/vakinhas/:vakinhaId/contribuicoes', ContribuicaoController.getContribuicoesByVakinha);

// POST - Criar nova contribuição
router.post('/api/contribuicoes', ContribuicaoController.createContribuicao);

// DELETE - Deletar contribuição
router.delete('/api/contribuicoes/:id', ContribuicaoController.deleteContribuicao);


// ====== ROTA PADRÃO ======
router.get('/', (req, res) => {
    res.json({ 
        message: 'API Vakinha Online - v1.0.0',
        endpoints: {
            usuarios: '/api/usuarios',
            vakinhas: '/api/vakinhas',
            contribuicoes: '/api/contribuicoes'
        }
    });
});

export default router;
