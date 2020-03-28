import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';     //FlatList é o que fará a rolagem    //TouchableOpacity estamos usando para ser como um botão no ver mais detalhes

import api from '../../services/api';
import logoImg from '../../assets/logo.png';    //nao precisa passar o @2x pois ele ja vai improtar a logo do melhor tamanhao automaticamente


import styles from './styles';

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);

    const navigation = useNavigation();

    function navigateToDetail(){
        navigation.navigate('Detail');
    }

    async function loadIncidents() {
        const response = await api.get('incidents');

        setIncidents(response.data);
    }
    useEffect(() => {
        loadIncidents();
    }, []);
    return(
        <View style={styles.container}>
            <View style={styles.headr}>
                <Image source={logoImg} />
                <Text style={styles.header.Text} >
                    Total de <Text style={styles.header.TextBold}>0 casos</Text>.
                </Text>
            </View>
            
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o</Text>

            <FlatList 
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.iProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{incident.value}</Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} onPress={navigateToDetail}
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