// ==============
// A "MOLDURA" que envolve todas as telas do app
// ==============


// conceito:import
// import traz uma ferrramenta/biblioteca ja cirada

// Stack: Pilha de telas. quando app tem varias telas, uma abre por cima da outra
import { Stack } from "expo-router";

// StatusBar: a barra lá em cima do celular, onde fica a hora, bateria, etc
import { StatusBar } from "expo-status-bar";

// conceito: export default
// no react native, o export default é usado para definir o componente principal de uma tela

// Essa função è a principal função do arquivo, é assim que o expo encontra o layout
export default function Layout() {
  return (
    <>
    {/* StatusBar: style"Light" baixa o relogio e bateria brancos */}
      <Stack style="Light" />
    {/* Stack: Pilha de telas */}
    {/* screenOptions: opções de configuração da tela */}
    {/* headerShown: false - oculta o cabeçalho da tela que o expo exibe por padrão */}
    
      <StatusBar screenOptions={{ headerShown: false }} />
    </>
  );
}

// con