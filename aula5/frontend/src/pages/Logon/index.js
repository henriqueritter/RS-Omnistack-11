import React, { useState } from 'react';
//Importando o react link, usado para a pagina se comportar como SPA
import { Link, useHistory } from 'react-router-dom';
//Importando o componente de Icone Login do react-icons(instalado via npm) 
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';  //para conectar ao backend

import './styles.css';

//Para importar uma imagem
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });  //objeto id enviado para a pagina sessions

            localStorage.setItem('ongId', id);                      //vamos salvar o nome o ID da ONG no localStorage(navegador do client)
            localStorage.setItem('ongName', response.data.name);    //pois vamos usar isso na aplicacao inteira.

            history.push('/profile');       //redireciona para a pagina Profile(passando os parametros de login atraves do api.post)
        } catch{
                alert('falha de login');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1> Faça seu logon </h1>
                    <input 
                        placeholder="Sua ID" 
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}