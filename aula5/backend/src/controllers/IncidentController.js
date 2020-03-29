const connection = require('../database/connection');

module.exports = {
    /** Rota de consulta */
    async index(request, response){
        
        /** Retorna quantidade total de registros, para auxilar no calculo de paginas necessárias */
        const { page = 1 } = request.query;   //inicia o query parm das paginas se não houver nada, sera como 1
                const [count] = await connection('incidents')   //Retorna a quantidade de registros 
            .count();                                           //de incidents cadastrados
                               //A Constante foi definida entre colchetes para exiber apenas um registro(o que no caso ela só traria um mesmo)
        //linha abaixo: retorna a quantidade total de registros dentro do HEADERS em uma propriedade chmada X-Total-Count(escolhemos o nome)        
        response.header('X-Total-Count', count['count(*)']); //acessamos somente o valor da variavel/objeto count no valor da propriedade 'count(*)'

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //realiza o join da tabela ONGS onde o campo ID da table ONG seja igual ao campo ONG_ID da table INCIDENTS
            .limit(5)       //retorna apenas 5 incidents
            .offset((page -1) * 5)  //isso fara com que os registros sejam retornados de 5 em cinco de acordo com a pagina
            .select([               //cada pagina fica http://localhost:3333/incidents?page=2 e etc.. (A PRIMEIRA NAO PRECISA E PARAMETRO)
                'incidents.*', 
                'ongs.name',        //aqui declaramos como uma array os campos a serem pesquisados
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);           
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
        if (incident.ong_id != ong_id) {   //se o id da ong(do header.authorization) for diferente da cadastrada  ele retorna uma mensagem 401
            return response.status(401).json({ error: 'Operation Not Permitted. '}); // modifica o status do HTTP para NAO Autorizado
        }

        await connection('incidents').where('id', id).delete();  //sintaxe do Delete.

        return response.status(204).send();     //status quando a resposta nao tem conteudo
    }
};