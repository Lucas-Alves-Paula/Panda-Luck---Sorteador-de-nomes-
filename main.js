
// declarando os elementos 
const nomeInput = document.querySelector("#nome-input");
const btnAdicionar = document.querySelector("#btn-adicionar");
const listaNomes = document.querySelector("#lista-nomes");
const btnSortear = document.querySelector("#btn-sortear");
const nomeSorteadoDisplay = document.querySelector("#nome-sorteado");
const repetirNomeCheckbox = document.querySelector("#repetir-nome");
const btnRetornar = document.querySelector("#btn-retornar");
const resultadoContainer = document.querySelector("#resultado-container");
const videoContainer = document.querySelector("#video-container");
const countdownVideo = document.querySelector("#countdown-video");
const rodape = document.querySelector("#rodape"); 


// Array para armazenar os nomes adicionados

let nomes = [];


//Evento adicionado para inserir nomes por meio do enter

nomeInput.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {

        event.preventDefault();
        adicionarNome();
    }
});

// Adicionando os botoes a açao click

btnAdicionar.addEventListener("click", adicionarNome);
btnSortear.addEventListener("click", sortearNome);
btnRetornar.addEventListener("click", retornar);

// Função para adicionar nome à lista, verificando a repetição de nomes e input vazio

function adicionarNome() {
    const nome = nomeInput.value.trim();

    if (nome) {
        if (!repetirNomeCheckbox.checked && nomes.includes(nome)) {
            alert("Nome já adicionado!");
            return;
        }

        nomes.push(nome);
        atualizarLista();
        nomeInput.value = '';
    } else {
        alert("Por favor, digite um nome!");
    }
}




// Função para atualizar a lista de nomes exibida, adicionando exclusão

 function atualizarLista() {
    listaNomes.innerHTML = "";

    nomes.forEach((nome, index) => {
        const li = document.createElement("li");
        li.textContent = nome;

        const iconeExcluir = document.createElement("span");
        iconeExcluir.textContent = " ❌";
        iconeExcluir.style.cursor = "pointer";
        iconeExcluir.onclick = () => removerNome(index);

        li.appendChild(iconeExcluir);
        listaNomes.appendChild(li);
    });
 }



 // Função para sortear um nome, adicionar video da contagem regressiva e exibir o nome sorteado

 function sortearNome() {
    if (nomes.length === 0) {
        alert("Adicione nomes antes de sortear!");
        return;
    }

    rodape.style.display = 'none';
    videoContainer.classList.add("mostrar"); // Isso faz com que o vídeo apareça na tela.
    


    countdownVideo.currentTime = 0; // Reinicia o vídeo do zero
    countdownVideo.play(); // E agora damos o play no vídeo

    countdownVideo.onended = function () {

        const indiceSorteado = Math.floor(Math.random() * nomes.length);  // Aqui geramos um número aleatório entre 0 e o tamanho da lista de nomes.
        const nomeSorteado = nomes[indiceSorteado];  // Esse número representa o índice do nome que será sorteado.

        nomeSorteadoDisplay.textContent = nomeSorteado;  // Agora, exibimos o nome sorteado na tela.
        nomes.splice(indiceSorteado, 1);   // Como o nome já foi sorteado, vamos removê-lo da lista para não ser repetido.
        atualizarLista();  // Atualizamos a lista exibida na tela.

        videoContainer.classList.remove("mostrar");  // Agora que o vídeo acabou, podemos escondê-lo novamente.
        resultadoContainer.classList.add("mostrar"); // Em seguida, mostramos o resultado final (o nome sorteado).
        btnRetornar.classList.add("mostrar"); // Também mostramos o botão de retorno para que o usuário possa voltar e fazer outro sorteio.
    };
 }

 // Função para remover nome que foi sorteado da lista
 function removerNome(index) {
    nomes.splice(index, 1);
    atualizarLista();
 }

// Função para retornar à tela principal
function retornar() {

    resultadoContainer.classList.remove("mostrar"); 
    rodape.style.display = 'block';

 }