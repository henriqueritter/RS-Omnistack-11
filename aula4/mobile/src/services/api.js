import 'intl';          //importação para resolver o formato de moeda em androids
import 'intl/locale-data/jsonp/pt-BR'; //importando idioma Portugues -BR

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.11.100:3333'
});

export default api;

