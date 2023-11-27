const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',     
  port: 5432,          
  user: 'postgres',     
  password: '123456', 
  database: 'aplicacao_final' 
});

const key = `fazerUmaHashDepois`;


module.exports = {
  pool,
  key
}
