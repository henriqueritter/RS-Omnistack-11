import React, { useState } from 'react';  //useState importado para recuperarmos os valores dos inputs
import { Link, useHistory } from 'react-router-dom'; //useHistory usado para voltar para a pagina inicial
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';


export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    
    const history = useHistory();  //para fazer navegação atraves de uma função JS, quando nao podemos colocar o link do react-router-dom diretamente
    
    async function handleRegister(e){ //funcao responsavel por fazer o cadastro do usuario, ela sera disparada no SUBMIT
        e.preventDefault();     //previne o comportamento padrao do form, que é de recarregar a pagina(tornando assim a pagina uma SPA )

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };
        try{
            const response = await api.post('ongs', data);  //o Axio por padrao envia no formato JSON
            alert(`Seu ID de acesso: ${response.data.id}`);  //aqui utilizamos a crase para poder passar uma variavel como parametro

            history.push('/'); //envia a navegacao de volta para a rota raiz
        } catch (err){
            alert('Erro no cadastro, tente novamente');
        }

    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG" 
                        value={name}  //variavel do estado
                        onChange={e => setName(e.target.value)} //ouvindo as mudanças do input, vamos pegar o evento de mudança(e) e vamos setar o valor do input dentro da variavel name que armazenamos no estado
                            /** e.target.value representa o valor do input
                             *  setName(e.target.value) estamos colocando ele dentro da variavel name
                             *  o  (e) é o parametro que a arrowFunction recebe
                            */
                    />

                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                        placeholder="Whatsapp" 
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input
                            placeholder="Cidade" 
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                        <input 
                            placeholder="UF" 
                            style={{ width: 80 }} 
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}