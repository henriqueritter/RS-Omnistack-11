import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';     //FlatList é o que fará a rolagem    //TouchableOpacity estamos usando para ser como um botão no ver mais detalhes

import api from '../../services/api';
import logoImg from '../../assets/logo.png';    //nao precisa passar o @2x pois ele ja vai improtar a logo do melhor tamanhao automaticamente


import styles from './styles';

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);        //verifica qual pagina estamos para exibir na rolagem 'infinita'
    const [loading, setLoading] = useState(false);  //quando estamos buscando dados novos evitar que os dados antigos sejam buscados novamente, carregando uma pagina por vez

    const navigation = useNavigation();

    function navigateToDetail(incident){
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {
        if (loading) {
            return;     //usado para evitar que mais de uma requisição seja feita no momento
        }

        if (total > 0 && incidents.length === total){  //se true nao busque mais informações
            return;
        }
        setLoading(true);
        const response = await api.get('incidents', {
            params: { page }
        });

        setIncidents([ ... incidents, ... response.data]);  // os ... servem para ANEXAR DOIS VETORES, para que a cada nova pagina ele não perca os dados ja cadastrados na rolagem
        setTotal(response.headers['x-total-count']);

        setPage(page + 1);
        setLoading(false);
    }
    useEffect(() => {
        loadIncidents();
    }, []);
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.header.Text} >
                    Total de <Text style={styles.header.TextBold}>{total} casos</Text>.
                </Text>
            </View>
            
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o</Text>

            <FlatList 
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.iProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', { 
                                style: 'currency', 
                                currency: 'BRL'
                            }).format(incident.value)}</Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>

    );
}