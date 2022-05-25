//PAGINA-HOME
const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logado");


//ELEMENTOS DO FORMULÁRIO
let formulario = document.querySelector("#form-cadastro");
let inputRegistro = document.querySelector("#input-registro");
let inputTitulo = document.querySelector("#input-titulo");
let inputDescricao = document.querySelector("#input-descricao");

let tabelaRecados = document.querySelector("#tabela-registros");

//EVENTOS
formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  salvar();
});

function salvar() {
  // VERIFICAR SE EXISTE DADO
  let listaLivros = JSON.parse(localStorage.getItem("meus_recados")) || [];

  //PEGAR VALORES
  let registroId = inputRegistro.value;
  let tituloRecado = inputTitulo.value;
  let descricaoRecado = inputDescricao.value;

  //COLOCAR DENTRO DO OBJETO
  let recado = {
    registroId,
    tituloRecado,
    descricaoRecado,
  };

  //PEGANDO O OBJETO E SALVANDO DENTRO DO VETOR, QUE ESTÁ DENTRO DA CHAVE "meus_recados"
  listaLivros.push(recado);

  salvarNaTabela(recado);
  salvarNoLocalStorage(listaRecados);
  limparCampos();
}

function salvarNoLocalStorage(listaRecados) {
  localStorage.setItem("meus_recados", JSON.stringify(listaRecados));
}

function salvarNaTabela(dadosRecados) {
  let novaLinha = document.createElement("tr");
  let colunaRegistro = document.createElement("td");
  let colunaTitulo = document.createElement("td");
  let colunaDescricao = document.createElement("td");
  let colunaAcoes = document.createElement("td");

  //Manipular a insercao
  novaLinha.setAttribute("class", "registros");
  novaLinha.setAttribute("id", "registroId");

  //pegando os elementos do Localstorage e apresentar na tabela
  colunaRegistro.innerHTML = dadosRecados.registroId;
  colunaTitulo.innerHTML = dadosRecados.tituloRecado;
  colunaDescricao.innerHTML = dadosRecados.descricaoRecado;
  colunaAcoes.innerHTML = `<button class="btn-editar-recados">Editar</button>
  <button class="btn-apagar-recados">Apagar</button>`;

  novaLinha.appendChild(colunaRegistro);
  novaLinha.appendChild(colunaTitulo);
  novaLinha.appendChild(colunaDescricao);
  novaLinha.appendChild(colunaAcoes);
  tabelaRecados.appendChild(novaLinha);
}

function limparCampos() {
  inputRegistro.value = "";
  inputTitulo.value = "";
  inputDescricao.value = "";
}

document.querySelector('#sair').addEventListener('click', (e)=>{
  e.preventDefault();
  sair()
});

function sair(){
  sessionStorage.removeItem("logado");
  localStorage.removeItem("session");

  window.location.href = "index.html";
}

checkLogged();

function checkLogged (){
    if(session) {
        sessionStorage.setItem("logado", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html"
        return;
    }

}