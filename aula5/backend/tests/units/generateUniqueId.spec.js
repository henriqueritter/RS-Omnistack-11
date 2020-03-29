const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {      //nome da categoria do test 
    it('should generate an unique ID', () => {      //funcao IT testes escritos em formato de frase significa ISTO do Ingles, é a mensagem a ser exibida pela sessão do test
        const id =generateUniqueId();
        expect(id).toHaveLength(8);
    })  

});