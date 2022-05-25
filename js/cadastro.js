let campoEmail = document.querySelector("#input_email");
let labelEmail = document.querySelector("#label_input_email");
let validEmail = false;

let campoSenha = document.querySelector("#input_senha");
let labelSenha = document.querySelector("#label_input_senha");
let validSenha = false;

let campoConfirmaSenha = document.querySelector("#input_confirma_senha");
let labelConfirmaSenha = document.querySelector("#label_input_confirma_senha");
let validConfirmaSenha = false;

let formularioCadastro = document.querySelector("#formulario_cadastro");
let botaoCriarConta = document.querySelector("#botao_criar_conta");

let regSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

campoEmail.addEventListener("keyup", verificaEmail);

function verificaEmail() {
  if (campoEmail.value.length < 5) {
    labelEmail.setAttribute("style", "color: red");
    labelEmail.innerHTML = "E-mail: *Insira um e-mail válido!";
    campoEmail.setAttribute(
      "style",
      "display: block; margin-botton: 15px; width: 415px; border-color: red"
    );
    validEmail = false;
  } else {
    labelEmail.setAttribute("style", "color: green");
    labelEmail.innerHTML = "E-mail:";
    campoEmail.setAttribute(
      "style",
      "display: block; margin-botton: 15px; width: 415px; border-color: green"
    );
    validEmail = true;
  }

  campoSenha.addEventListener("keyup", verificaSenha);

  function verificaSenha() {
    let senhaValida = campoSenha.value.match(regSenha);

    if (campoSenha.value.length < 8) {
      labelSenha.setAttribute("style", "color: red");
      labelSenha.innerHTML = "Senha: *Insira uma senha válida!";
      campoSenha.setAttribute(
        "style",
        "display: block; margin-bottom: 15px; width: 415px; border-color: red;"
      );
      validSenha = false;
    } else if (senhaValida === null) {
      labelSenha.innerHTML =
        "Senha: *Deve conter uma letra maíuscula e caracteres especiais";
      validSenha = false;
    } else {
      labelSenha.setAttribute("style", "color: green");
      labelSenha.innerHTML = "Senha: ";
      campoSenha.setAttribute(
        "style",
        "display: block; margin-bottom: 15px; width: 415px; border-color: green;"
      );
      validSenha = true;
    }
  }

  campoConfirmaSenha.addEventListener("keyup", verificaConfirmaSenha);

  function verificaConfirmaSenha() {
    if (campoSenha.value !== campoConfirmaSenha.value) {
      labelConfirmaSenha.setAttribute("style", "color: red");
      labelConfirmaSenha.innerHTML =
        "Confirme a senha: *A senha digitada não corresponde";
      campoConfirmaSenha.setAttribute(
        "style",
        "display: block; margin-bottom: 15px; width: 415px; border-color: red;"
      );
      validConfirmaSenha = false;
    } else {
      labelConfirmaSenha.setAttribute("style", "color: green");
      labelConfirmaSenha.innerHTML = "Confirme a senha";
      campoConfirmaSenha.setAttribute(
        "style",
        "display: block; margin-bottom: 15px; width: 415px; border-color: green;"
      );
      validConfirmaSenha = true;
    }
  }
  botaoCriarConta.addEventListener("click", verificaCampos);

  function verificaCampos() {
    if (
      campoEmail.value === "" ||
      campoSenha.value === "" ||
      campoConfirmaSenha.value === ""
    ) {
      alert(
        "Erro! Por favor, verifique se todos os campos estão preenchidos!"
      );
    } else if (!validEmail && !validSenha && !validConfirmaSenha) {
      alert(
        "Campos incorretos! Por favor, verifique se todos os campos estão preenchidos corretamente!"
      );
    } else {
      alert("Conta foi criada com sucesso");

      salvarNoLocalStorage(
        criarObjetoUsuario(
          campoEmail.value,
          campoSenha.value,
          campoConfirmaSenha.value
        )
      );
      window.location.href = "index.html";
    }
  }

  function salvarNoLocalStorage(objetoUsuario) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(objetoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }

  function criarObjetoUsuario(email, senha, confirmaSenha) {
    const objetoUsuario = {
      login: email,
      senha: senha,
      confirmaSenha: confirmaSenha,
    };
    return objetoUsuario;
  }
}

document.querySelector('#botao_voltar').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = "index.html";
});