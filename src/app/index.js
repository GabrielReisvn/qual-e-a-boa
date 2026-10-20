// ================================
//  Index.js- qual é a boa
// ================================

// Etapa 1: trazer ferramentas {import}

import { Stack, useEffect } from "react";

// view: agrupa e organiza elementos na tela
// text: exibe texto na tela
// textInput: campo de digitação
// pressable: botão que reage ao toque
// scrollView: permite rolar a tela para cima e para baixo
// styleSheet: permite criar estilos para os elementos da tela

import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from "react-native";

import { cores } from "../data/tema";
import { accelerometer } from "expo-sensors";
import * as Haptics from "expo-haptics";

const LIMITE_DE_FORCA = 1.8; // limite de força G para detectar um "shake"
const TEMPO_ENTRE_SORTEIOS = 1000; // tempo mínimo entre sorteios em milissegundos


export default function Nome() {
    // começa com 5 opções de comida como estado inicial
    const [opcoes, setOpcoes] = useState(['pizza', 'hamburguer', 'sushi', 'churrasco', 'salada']);

    //  A opcao selecionada é armazenada no estado "resultado"
    const [resultado, setResultado] = useState(''); // resultado do sorteio

    const [textoDigitado, setTextoDigitado] = useState(''); // texto digitado no campo de entrada

    // Função sortear

    function sortear() {
        
    }
}