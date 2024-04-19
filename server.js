const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configuração do MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '',
    database: 'projetogov'
});

// Conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados MySQL estabelecida.');
});

// Middleware para permitir CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Middleware para processar requisições JSON
app.use(bodyParser.json());

// Rota para cadastrar usuário
app.post('/cadastrar', (req, res) => {
    const status =2;
    const { nome, cpf, email, senha} = req.body;

    const sql = 'INSERT INTO caduser (nome, cpf, email, senha, status) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [nome, cpf, email, senha, status], (err, result) => {
        if (err) {
            console.error('Erro ao inserir usuário:', err);
            res.status(500).send('Erro ao cadastrar usuário.');
            return;
        }
        console.log('Usuário cadastrado:', result);
        res.sendStatus(200);
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
