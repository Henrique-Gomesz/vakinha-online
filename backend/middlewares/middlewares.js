import express from 'express';
import path from 'path';
import __dirname from '../utils/pathUtils.js';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import cors from 'cors';

// Middleware para servir arquivos estáticos
export const staticMiddleware = express.static(path.join(__dirname, 'assets'));

// Middleware para parsear dados de formulário
export const urlencodedMiddleware = express.urlencoded({ extended: true });

// Middleware para parsear JSON
export const jsonMiddleware = express.json();

// Middleware de segurança
export const securityMiddleware = helmet();

// Middleware de compressão
export const compressionMiddlewware = compression();

// Middleware de CORS
export const corsMiddleware = cors({
    origin: process.env.NODE_ENV === 'production' 
        ? 'https://seudominio.com' 
        : ['http://localhost:5173', 'http://localhost:3000'], // Permite frontend Vite e requisições locais
    credentials: true
});

// Middleware de rate limiting
export const rateLimitMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 requisições por IP
    message: 'Muitas requisições deste IP, tente novamente mais tarde.'
});

// Middleware de logging
export const morganMiddleware = morgan(
    process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
);

// Middleware de tratamento de erros
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
};
