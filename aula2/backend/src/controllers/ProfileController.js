const connection = require('../database/connection');

module.exports = {
    /** Rota de Consulta de Incidents de uma ONG especifica */
    async index(request, response){
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')         //seleciona todos os registros da tabela incidents
                                    .where('ong_id', ong_id)    //onde ong_id da tabela seja igual ao ong_id coletado do
                                    .select('*');               // headers.authorization pego acima.

        return response.json(incidents);    //retorna os incidents cadastrados
    }
}