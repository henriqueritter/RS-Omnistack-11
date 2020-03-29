const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach( async () => {          //isso executara nossas migrates ANTES de cada test
        await connection.migrate.rollback(); //é interessante que antes de cada migration dar um rollback para desfazer as alterações anteriores  para evitar que o BD fique gigante ou  que o test de agora influencie outro test
        await connection.migrate.latest();
    })

    afterAll(() => {            //desfaz a conexao do test com o banco de dados após cada test
        connection.destroy();
    });


    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            //.set('Authorization', 'idOng')  //se fossemos usar o HEADER NO TEST fariamos assim
            .send({
                name: "APAD",
                email: "contato@test.com",
                whatsapp: "12345678911",
                city: "SAMPA",
                uf: "SP"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});