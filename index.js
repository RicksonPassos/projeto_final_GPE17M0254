const express = require('express');
const { rotas } = require('./src/routers/rotas');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(rotas);

app.listen(PORT, () => {
    console.log(`Servidor express rodando em http://localhost:${PORT}`);
});