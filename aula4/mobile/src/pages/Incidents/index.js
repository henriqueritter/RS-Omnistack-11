import React from 'react';
import { View, Image, Text } from 'react-native';
import logoImg from '../../assets/logo.png';    //nao precisa passar o @2x pois ele ja vai improtar a logo do melhor tamanhao automaticamente

import styles from './styles';

export default function Incidents(){
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
        </View>

    );
}