import express from 'express';
import path from 'path';
import __dirname from './utils/pathUtils.js';
import dotenv from 'dotenv';
import {
    staticMiddleware,
    urlencodedMiddleware,
    jsonMiddleware,
    securityMiddleware,
    compressionMiddlewware,
    corsMiddleware,
    rateLimitMiddleware,
    morganMiddleware,
    errorHandler
} from './middlewares/middlewares.js';
import router from './routes/routes.js';
import connectDB from './config/db.js';

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Conecta ao banco de dados MongoDB
connectDB();

// Motor de template (caso precise renderizar views HTML)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Registrando Middlewares
app.use(corsMiddleware); // CORS deve vir antes das rotas
app.use(staticMiddleware);
app.use(urlencodedMiddleware);
app.use(jsonMiddleware);
app.use(securityMiddleware);
app.use(compressionMiddlewware);
// app.use(rateLimitMiddleware); // Descomente para ativar rate limiting
app.use(morganMiddleware);

// Registrando rotas (endpoints)
app.use(router);

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor Vakinha Online rodando na porta ${port}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log(`API disponível em: http://localhost:${port}`);
});
