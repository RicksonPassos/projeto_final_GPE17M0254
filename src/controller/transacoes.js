const { pool } = require("../database/dbConfig");

const listarTransacoes = async (req, res) => {

  try {
    const params = [req.usuario];
    const query = `select
    t.id as id,
    t.tipo,
    t.descricao,
    t.valor,
    t.data as data,
    t.id_usuario,
    t.id_produto,
    p.nome as produto_nome
    from
    transacoes as t
    join produtos as p on t.id_produto = p.id
    join usuarios as u on u.id = t.id_usuario
    where u.id = $1 order by data;`;

    const resposta = await pool.query(query, params);

    return res.status(200).json(resposta.rows);
    
  } catch (error) { res.status(500).json({ Mensagem: `Erro inesperdo do sistema.` }) };
};

const listarTransacaoId = async (req, res) => {
  const transacaoId = req.params.id;

  try {
    const params = [req.usuario, transacaoId];
    const query = `select
    t.id as id,
    t.tipo,
    t.descricao,
    t.valor,
    t.data as data,
    t.id_usuario,
    t.id_produto,
    p.nome as produto_nome
    from
    transacoes as t
    join produtos as p on t.id_produto = p.id
    join usuarios as u on u.id
     = t.id_usuario
    where u.id = $1 and t.id = $2;`;

    const resposta = await pool.query(query, params);

    if (resposta.rowCount < 1) {
      return res.status(404).json({ mensagem: `Transação não encontrada.` })
    }

    return res.status(200).json(resposta.rows[0]);
    
  } catch (error) { res.status(500).json({ Mensagem: `Erro inesperdo do sistema.` }) };
}

const cadastrarTransacao = async (req, res) => {
  const {descricao, valor, data, tipo } = req.body;

  const query = `insert into transacoes (tipo, descricao, valor, data, id_usuario) 
  values ($1,$2,$3,$4,$5)
  returning * `;

  try{

    const retornoValores = await pool.query(query,[tipo, descricao, valor, data, req.usuario])

    return res.status(200).json(retornoValores.rows);

  }catch (error){
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do Servidor"})
  }

}


const atualizarTransacao = async (req, res) => {
  const { descricao, valor, data, tipo } = req.body;
  const { id } = req.params;

  try {
    
    const { rowCount } = await pool.query(
      "select * from transacoes where id = $1 and usuario_id = $2",
      [id, req.usuario]
    );

    if (rowCount === 0) {
      return res.status(404).json({ mensagem: "Transação não encontrada." });
    }

    const queryAtualizar =
      "update transacoes set (descricao, valor, data, tipo) = ($1,$2,$3,$4) where id = $5";

    const params = [descricao, valor, data, tipo, id];

    await pool.query(queryAtualizar, params);

    return res.status(204).send();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do Servidor" });
  }
}


const excluirTransacao = async (req, res) => {
  const {id} = req.params;
  
  try{
    const localizarTransacao = await pool.query(`select id from transacoes where id = $1 and usuario_id = $2`,[id, req.usuario])

    if(!localizarTransacao){
      res.status(400).json({mensagem: `Transação não encontrada.`})
    }

    const query = `delete from transacoes where id = $1 and usuario_id = $2`;

    await pool.query(query, [id, req.usuario]);
    
    return res.status(200).send();

  }
  catch (error){
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do Servidor"});
  }

}


module.exports = {
  listarTransacoes,
  listarTransacaoId,
  cadastrarTransacao,
  atualizarTransacao,
  excluirTransacao,

 
}