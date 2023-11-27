const { pool } = require("../database/dbConfig");

const listarProdutos = async (req, res) => {

    const query = `select * from produtos where id_usuario = $1`;
    const params = [req.usuario];


  try {
 
    const resposta = await pool.query(query, params);

    return res.status(200).json(resposta.rows);
    
  } catch (error) { res.status(500).json({ Mensagem: `Erro inesperdo do sistema.` }) };
};


const cadastrarProduto = async (req, res) => {
  const {descricao, nome } = req.body;

  const query = `insert into produtos (nome, descricao, id_usuario) 
  values ($1,$2,$3)
  returning * `;

  try{
    
    const retornoValores = await pool.query(query,[nome, descricao, req.usuario])

    return res.status(200).json(retornoValores.rows);

  }catch (error){
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do Servidor"})
  }

}


const atualizarProduto = async (req, res) => {
  const { descricao, nome} = req.body;
  const { id } = req.params;

  try {
    
    const { rowCount } = await pool.query(
      "select * from produtos where id = $1 and id_usuario = $2",
      [id, req.usuario]
    );

    if (rowCount === 0) {
      return res.status(404).json({ mensagem: "Produto não encontrada." });
    }

    const queryAtualizar =
      "update produtos set (descricao, nome) = ($1,$2) where id = $3";

    const params = [descricao, nome, id];

    await pool.query(queryAtualizar, params);

    return res.status(204).send();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do Servidor" });
  }
}


const excluirProduto = async (req, res) => {
  const {id} = req.params;
  
  try{
    const localizarProduto = await pool.query(`select id from produtos where id = $1 and id_usuario = $2`,[id, req.usuario])

    if(!localizarProduto){
      res.status(400).json({mensagem: `Transação não encontrada.`})
    }

    const query = `delete from produtos where id = $1 and id_usuario = $2`;

    await pool.query(query, [id, req.usuario]);
    
    return res.status(200).send();

  }
  catch (error){
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do Servidor"});
  }

}


module.exports = {
  listarProdutos,
  cadastrarProduto,
  atualizarProduto,
  excluirProduto

 
}