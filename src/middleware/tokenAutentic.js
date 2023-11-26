const { key,pool } = require("../database/dbConfig");
const jwt = require("jsonwebtoken")

const tokenAutentic = async (req, res, next) => {
  const { authorization } = req.headers;
  const bearerToken = authorization.split(` `)[1];

  if(!authorization){
    return res.status(401).json({menssagem: 'Não autorizado'})
  }

  try {
    const {id} = jwt.verify(bearerToken, key);

    const {rows, rowCount} = await pool.query(`select * from usuarios where id = $1`, [id]);

    if(rowCount == 0){
            return res.status(401).json({menssagem: 'Não autorizado'})
        }

        const {senha, ...usuario} = rows[0];

        req.usuario = id;


        next();

  } catch (error) { console.log(error);res.status(401).json({ mensagem: `Necessario fazer login.` })};
  
}

module.exports = {tokenAutentic};