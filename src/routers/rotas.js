
const express = require('express');
const { cadastroUsuarios, login, detalharPerfil, atualizarUsuario, logout } = require('../controller/usuarios');
const {listarProdutos, cadastrarProduto, atualizarProduto, excluirProduto} = require('../controller/produtos')
const { emailCadastrado } = require('../middleware/emailCadastrado');
const { tokenAutentic } = require('../middleware/tokenAutentic');
const { validarCampos } = require('../middleware/validarCampos');
const { validarCamposTransacoes } = require('../middleware/validarCamposTransacoes');
const { listarTransacoes, listarTransacaoId, excluirTransacao, cadastrarTransacao,  atualizarTransacao} = require('../controller/transacoes');

const rotas = express();

rotas.post(`/usuario`, emailCadastrado, validarCampos, cadastroUsuarios);
rotas.post(`/login`,login);

rotas.use(tokenAutentic);


rotas.post(`/logout`,logout);
rotas.get(`/usuario`,  detalharPerfil);
rotas.put(`/usuario`,   validarCampos, emailCadastrado, atualizarUsuario);
rotas.post(`/produto`, cadastrarProduto);
rotas.put(`/produto/:id`,atualizarProduto);
rotas.delete(`/produto/:id`, excluirProduto);
rotas.get(`/produtos`, listarProdutos);
rotas.get(`/transacao`,  listarTransacoes);
rotas.get(`/transacao/:id`,  listarTransacaoId);
rotas.post(`/transacao`, validarCamposTransacoes, cadastrarTransacao);
rotas.put(`/transacao/:id`, validarCamposTransacoes, atualizarTransacao);
rotas.delete(`/transacao/:id`, excluirTransacao);




module.exports = {
    rotas
};