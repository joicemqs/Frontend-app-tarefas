# Registro de Desenvolvimento 

Para desenvolver o frontend do projeto estudei de várias formas o react native e encontrei dificuldades, porém pesquisando, vendo vários tutoriais no youtube, e utilizando inteligência artificial consegui executar a tarefa. 

Antes de receber a documentação do desafio de programação desenvolvi um simples aplicativo, usando o react native, o que facilitou minha familiarização com o framework.

A inteligência artificial nesse projeto foi de fundamental importância, pois combinada ao conhecimento adquirido do estudo agilizou muito a produção da aplicação. Utilizei os prompts em etapas, por exemplo ao solicitar ajuda com o projeto nunca pedi para que desenvolvesse grandes partes de código ou códigos de diferentes arquivos, perguntando por exemplo "como utilizar o axios paar conexão com a API", e não utilizando prompts como "Escreva um código em typescript para um aplicativo de tarefas". A tomada de decisões foi baseada tanto com base em pesquisas, como em inteligência artificial.

Utilizei para me auxiliar a copilot da microsoft, o passo a passo a seguir tem sua participação em todas as partes, não coloquei nesse documento todos os prompts ou respostas, por conta da quantidade de passos e etapas do desenvolvimento.

## Início do desenvolvimento

Comecei instalado no Node.js no meu sistema pelo site oficial https://nodejs.org/en/download

Depois instalei o Expo CLI para aocompanhar o aplicativo pelo meu celular:

````
npm install -g expo-cli
````

Pelo cmd, naveguei até o diretório onde desejava criar o projeto e executei o comando:

````
expo init Todo-app
````

Entrei na pasta do projeto e instalei as dependências necessárias:

````
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
npm install @react-navigation/native-stack
````

Instalei o Axios para consumir a API:

````
npm install axios
````

Instalei o Async Storage para gerenciar os tokens de autenticação:

````
npx expo install @react-native-async-storage/async-storage
````

Iniciei o aplicativo com o comando:

````
npm start
````

No meu celular, abri o aplicativo Expo Go e escaneei o QR code gerado no terminal para visualizar a aplicação durante o desenvolvimento.

## Estrutura do projeto

Adicionei as pastas components, navigation, screens, services e utils para organizar melhor o código, e conectei o projeto ao repositório online do Github.

Desenvolvi as telas de login, registro e tarefas com poucos componentes, e criei a pasta contexto para implementar o sistema de autenticação e controle de acesso às telas.

Na pasta de navegação, organizei as rotas necessárias para navegar entre as telas do aplicativo.

Atualizei o arquivo App.js para configurar a navegação principal, e testei a navegação básica entre as telas.

<img src="imagens/login-navegacao.jpg" height="500"> <img src="imagens/registro-navegacao.jpg" height="500"> <img src="imagens/tarefas-navegacao.jpg" height="500">

## Integração com a API

Com a navegação funcionando, comecei a integrar a API ao sistema de login usando Axios.

Criei o arquivo api.ts para configurar o Axios com as definições base, e desenvolvi o arquivo auth.ts com as funções de autenticação e login.

Atualizei a tela de Login para receber e validar email e senha.

Iniciei o servidor Django pelo terminal com o comando:

````
python manage.py runserver 0.0.0.0:8000
````

Adicionei o IP do meu computador no arquivo services/api.ts na baseURL:

Encontrei um erro de acesso do celular à API. Para resolver, adicionei o IP do meu computador ao ALLOWED_HOSTS no arquivo settings.py do projeto Django.

Reiniciei o servidor Django e consegui fazer login com minha conta pelo aplicativo. Testei a validação de credenciais - ao digitar a senha incorreta, a tela de tarefas não era acessada e a mensagem de erro era exibida corretamente.

<img src="imagens/erro-login.jpg" height="500">

## Sistema de Registro e Recuperação de Senha

Implementei a função de registro de usuário e atualizei a tela de registro para coletar todas as informações necessárias.

Atualizei o aplicativo e testei o registro de um novo usuário:

Implementei a função de registro de usuário e atualizei a tela de registro para coletar todas as informações necessárias.

Atualizei o aplicativo e testei o registro de um novo usuário:

#### Registro:

    Email: teste.registro@gmail.com

    Senha: 87654321

Inicialmente não foi possível registrar devido ao envio automático do token. Corrigi isso criando uma nova instância do Axios sem o interceptor, então o registro funcionou.

<img src="imagens/cadastro-sucesso.jpg" height="500">

Adicionei a tela de recuperação de senha que solicita o email do usuário para enviar um link com uid e token de redefinição.

<img src="imagens/recuperar-senha.jpg" height="500"> <img src="imagens/verifique-email.jpg" height="500"> 

Para testes, como não era possível enviar um link personalizado por email para abrir diretamente o aplicativo, adaptei um botão de navegação direta para a página de confirmação. Para testar, é necessário pegar os valores do uid e token , que aparecerão em um link no terminal do servidor Django, e adicionar manualmente no arquivo de LoginScreen.py, e escrever a nova senha na tela de redefinição, para redefinir a senha.

![Onde colocar uid e token](imagens/uid-token.png)

<img src="imagens/redefinir-senha.jpg" height="500"> <img src="imagens/senha-redefinida.jpg" height="500"> 

Com a senha redefinida com sucesso, testei o login com a nova senha e funcionou perfeitamente.

<img src="imagens/tarefa-redefinicao.jpg" height="500"> 

## Funcionalidades das Tarefas

Atualizei a tela de tarefas e implementei a função de leitura das tarefas.

Para melhor reutilização de código, adaptei as tarefas como componentes reutilizáveis e organizei em uma lista na tela principal.

<img src="imagens/tarefas-aparecendo.jpg" height="500"> 

Com as tarefas sendo exibidas, desenvolvi o botão para marcar tarefas como completas ou não completas.

<img src="imagens/tarefa-completa.jpg" height="500"> 

Implementei a funcionalidade de adicionar novas tarefas, e editar tarefas existentes, modificando a visualização do item de tarefa para entrar em "modo de edição" quando o usuário deseja fazer alterações.

<img src="imagens/adicionar-tarefa.jpg" height="500"> <img src="imagens/alterar-tarefa.jpg" height="500"> <img src="imagens/aterando-descricao.jpg" height="500">

Atualizei o TaskItem para incluir o botão de excluir e a função de delete, e modifiquei a tela de tarefas para executar a função.

<img src="imagens/botao-excluir.jpg" height="500"> <img src="imagens/confirmacao-excluir.jpg" height="500">

## Filtros e Melhorias

Adicionei o filtro para exibir apenas tarefas pendentes.

Implementei o filtro por data, para isso instalei o DateTimePicker:

````
npm install @react-native-community/datetimepicker
````

<img src="imagens/filtro-pendente.jpg" height="500"> <img src="imagens/filtro-data.jpg" height="500">

## Estilização e Design

Comecei o processo de estilização pela tela de login, usando formas mais arredondadas e uma paleta de cores do meu agrado.

<img src="imagens/tela-login.jpg" height="500">

Apliquei o mesmo estilo nas telas de registro e nas duas telas de recuperação de senha.

<img src="imagens/tela-registro.jpg" height="500"> <img src="imagens/tela-redefinicao.jpg" height="500"> <img src="imagens/tela-recuperacao.jpg" height="500">

Na tela de tarefas, modifiquei as cores e a forma de exibição, adicionando um modal para melhor experiência do usuário.

<img src="imagens/tela-modal.jpg" height="500"> 

Estilizei os botões de filtro por data, por pendência, os itens de tarefa e seus ícones.

<img src="imagens/tela-tarefas.jpg" height="500">

E por fim a estilizei o "Modo de edição" das tarefas

<img src="imagens/edicao-tarefas.jpg" height="500">