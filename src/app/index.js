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


export default function Home() {
    // começa com 5 opções de comida como estado inicial
    const [opcoes, setOpcoes] = useState(['pizza', 'hamburguer', 'sushi', 'churrasco', 'salada']);

    //  A opcao selecionada é armazenada no estado "resultado"
    const [resultado, setResultado] = useState(''); // resultado do sorteio

    const [textoDigitado, setTextoDigitado] = useState(''); // texto digitado no campo de entrada

    // Função sortear

    function sortear() {
        if(opcoes.length < 2) {
            // Não é possível sortear com menos de 2 opções
            setResultado('Adicione mais opções para sortear!');
            return;
        }
        // Lógica para sortear uma opção aleatória
        //1) math.random() - gera um número aleatório entre 0 e 1
        //2) x opcoes.length - multiplica o número aleatório pelo tamanho do array de opções
        //3) math.floor() - arredonda para baixo
        const posicao = Math.floor(Math.random() * opcoes.length);

        //opcoes[posicao] - pega a opção sorteada do array de opções
        const opcaoSorteada = opcoes[posicao];

        setResultado(opcaoSorteada); //aqui ele guarda o resultado do sorteio no estado "resultado"

        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); // vibração de sucesso
    }

    //função de adicionar opção
    function adicionar() {

        //.trim() - retira espaços em branco do início e do fim da string
        const nome = textoDigitado.trim();
        if (nome === '') {
            // não adiciona se o campo estiver vazio
            return;
        }
        const listaNova = [...opcoes, nome]; // cria uma nova lista com a opção adicionada
        setOpcoes(listaNova);
        setTextoDigitado(''); // limpa o campo de entrada
        }

        //função de remover opção
        function remover(nomeParaRemover) {
            const listaNova = opcoes.filter((opcao) => opcao !== nomeParaRemover);
            setOpcoes(listaNova);
        
        }
    }

        // SORTEAR AO CHOACALHAR
        // nos vamos usar o useEffect e o sensor
        //useEffect: 'faça isto e DEPOIS que a tela for renderizada'
        // usamos para ligar o sensor, e desligar se o app for fechado

    useEffect( () => {
        //aqui pede ao sensor para medir a cada 100ms (10x por segundo)
        accelerometer.setUpdateInterval(100);

        //guarda a hora do último sorteio para evitar sorteios muito próximos
        // começa com 0
        // let (não const) porque vamos mudar o valor depois
        let ultimaHoraDoSorteio = 0;

        const sensor = Accelerometer.addListener((dados) => {

            //add.Listener = 'Me avise quando houver uma nova medição do sensor'
            //dados: {x, y, z} - valores de aceleração em cada eixo
            const forca =  Math.hypot *(dados.x, dados.y, dados.z); // calcula a força G total

            const agora = Date.now(); // pega a hora atual em milissegundos
            const tempoPassado = agora - ultimaHoraDoSorteio; // calcula o tempo passado desde o último sorteio
            if ( forca > LIMITE_DE_FORCA && tempoPassado > TEMPO_ENTRE_SORTEIOS) {     
               ultimaHoraDoSorteio = agora;
                sortear()
            }
        });

        return () => sensor.remove();//aqui desligamos o sensor quando a tela for fechada
        }, [opcoes]);