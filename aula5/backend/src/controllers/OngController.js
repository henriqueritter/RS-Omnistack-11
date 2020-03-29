const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
    //Rota de Consulta
    async index(request, response){
        const ongs = await connection('ongs').select('*'); // para aguardar o resultado da proxima query
        return response.json(ongs); //retorna o resultado da consulta acima
    },

    
    //Rota de insert
    async create(request, response){
        //const data = request.body;        //request body, busca um JSON ou outro no metodo POST
        //para filtrar os dados que vamos receber faça
        const { name, email, whatsapp, city, uf } = request.body;

        const id = generateUniqueId();

        await connection('ongs').insert({       //await faz com que ele espere o insert terminar para continuar
            id,             //linha de cima passamos como parametro o nome de tabela, e o insert como o tipo de operacao
            name,
            email,      //estes sao os campos que serão inseridos
            whatsapp,
            city,
            uf
        })

        return response.json({ id }); //retornaremos apenas o ID que é o que sera usado pela ONG para acessar nosso sistema
    }
}