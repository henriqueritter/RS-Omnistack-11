const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { id } = request.body;

        const ong = await connection('ongs')        //seleciona o nome da Ong
                        .where('id', id)            //onde o ID dela seja igual ao passado pelo body
                        .select('name')             //apenas o campo nome
                        .first();                   //first para nao retornar uma array e sim apenas o valor do campo nome
        if (!ong){      //se ong não existir 
            return response.status(400).json({ error: 'No ONG found with this ID'}); //retorna um bad request
        }

        return response.json(ong);  //retorna o Nome da ONG
    }
}