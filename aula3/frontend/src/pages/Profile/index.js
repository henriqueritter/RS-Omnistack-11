import React, { useState, useEffect }from 'react'; //utilizando useEffect para disparar alguma função em algum determinado momento do componente assim que é mostrado em tela
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);  //como esperamos um conjunto de informacoes do backend entao vamos iniciar ele como um array VAZIO.
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');        //recupera o login do storage para manter o usuario logado na pagina
    const ongName = localStorage.getItem('ongName');        //recupera o login do storage para manter o usuario logado na pagina
    console.log(ongId);
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);   //colocamos o ongId como dependencia pois toda variavel dentro do useEffect é legal colocar como dependencia para CASO a ongID mudasse ele teria que recalcular. 
    //a estrura é a função que será executada  E quando sera executada (entre [])
    //exemplo  useEffect(() => {}, [ongName]);  //toda vez que o ongName mudasse ele executaria a funcao de dentro do useEffect, se o array estiver vazio ele vai executar apenas uma unica vez no fluxo do componente

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                } 
            });
            //fonte FiraCode - font ligatures
            setIncidents(incidents.filter(incident => incident.id !== id)); //isso remove o item excluido do grid
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color='#E02041' />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>               
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRICAO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );                          //<li key={incident.key}  é colocado para dizer para o react qual é o registro que estamos trabalhando no banco de dados, é a PK
}