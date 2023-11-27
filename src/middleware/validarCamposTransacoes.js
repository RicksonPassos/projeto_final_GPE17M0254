const validarCamposTransacoes = async (req, res, next) => {
    const {descricao, tipo, data, valor} = req.body

    if(!tipo || !descricao || !valor || !data){
        return res.status(400).json({mensagem: 'Todos os campos obrigatórios devem ser informados.'})
    }

    next();
}

 module.exports = {
    validarCamposTransacoes
 }