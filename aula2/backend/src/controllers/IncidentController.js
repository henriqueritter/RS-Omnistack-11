const connection = require('../database/connection');

module.exports = {
    /** Rota de consulta */
    async index(request, response){
        const incidents = await connection('incidents').select('*');
        return response.json(incidents);
    },
    /** Rota de criar incidents(casos) */
    async create(request, response) {
        const { title, description, value } = request.body; //campos da tabela incidents, id gerado automaticamente.
        const ong_id = request.headers.authorization; //acessando o cabeçalho da requisicao, nós quem colocamos o nome authorization

        const [id] = await connection('incidents').insert({     //a constante ID receberá a coluna ID do registro
            title,                                              // que será criado neste INSERT na tabela incidents
            description,                                        // ja que o numero será gerado pelo proprio sqlite pois ele é incremental.
            value,
            ong_id
        });
        return response.json({ id });           //retorna a ID do incident criado
    },

    /** Rota de Delete de incidentes */
    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;  //recebemos o ONG_ID do headers de quem esta tentando deletar no momento
                                                        // fazemos isso para posterior consulta em verificar se a ONG esta autorizada
                                                        //a excluir essa requisição em questão.

        const incident = await connection('incidents')  //realiza a consulta na tabela incidents 
            .where('id', id)                            //onde o id for igual ao passado no request.params
            .select('ong_id')                   //e retorna a coluna ong_id apenas
            .first();                   //first() retorna o primeiro resultado(no nosso caso só existira uma unica ocorrencia com a ID do incident
                                        // ja que ela é feita de forma incremental) fazendo isso NAO RETORNA UMA ARRAY.
        console.log('asdte');
        if (incident.ong_id != ong_id) {   //se o id da ong(do header.authorization) for diferente da cadastrada  ele retorna uma mensagem 401
            return response.status(401).json({ error: 'Operation Not Permitted. '}); // modifica o status do HTTP para NAO Autorizado
        }

        await connection('incidents').where('id', id).delete();  //sintaxe do Delete.

        return response.status(204).send();     //status quando a resposta nao tem conteudo
    }
};