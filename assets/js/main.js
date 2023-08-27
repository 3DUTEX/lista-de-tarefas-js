const inputTarefa = document.querySelector(".input-tarefa");
const btnTarefa = document.querySelector(".btn-tarefa");
const tarefas = document.querySelector(".tarefas");

//cria um elemento Li.
function criaLi() {
  const li = document.createElement("li");
  return li;
}

/*
cria um elemento button, atribui uma classe "apagar" nele e cololoca dentro de uma li.
*/
function criaBotaoApagar(li) {
  li.innerText += " ";
  const botaoApagar = document.createElement("button");
  botaoApagar.innerText = "Apagar";
  botaoApagar.setAttribute("class", "apagar");
  li.appendChild(botaoApagar);
}

/*
cria uma tarefa com uma li e dentro dessa li um botão de apagar, depois salva tarefa
*/
function criaTarefa(textoInput) {
  const li = criaLi();
  li.innerText = textoInput;
  tarefas.appendChild(li);
  limpaInput();
  criaBotaoApagar(li);
  salvarTarefas();
}

/*
recebe uma função anônima que é chamada quando uma tecla é pressionada, porém a função só é
ativada se a tecla pressionada for "Enter".
*/
inputTarefa.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    //se o input estiver vazio não executa
    if (!inputTarefa.value || inputTarefa.value.length > 20) {
      limpaInput();
      return alert("Informe o nome da tarefa! (max 20 caracteres)");
    }

    //chama a função criar tarefa passando o texto do input
    criaTarefa(inputTarefa.value);
  }
});

/*
limpa o input e foca
*/
function limpaInput() {
  inputTarefa.value = "";
  inputTarefa.focus();
}

/*
recebe uma função anônima que é chamada quando o botão é pressionada.
*/
btnTarefa.addEventListener("click", function () {
  if (!inputTarefa.value || inputTarefa.value.length > 20) {
    limpaInput();
    return alert("Informe o nome da tarefa! (max 20 caracteres)");
  }

  criaTarefa(inputTarefa.value);
});

/*
pega o elemento que foi clicado no documento e se o elemento
conter uma classe chamada "Apagar", remove o pai desse elemento e salvaTarefa.
*/
document.addEventListener("click", function (e) {
  //pegando o elemento que foi clicado
  const elemento = e.target;

  //fazendo a checagem
  if (elemento.classList.contains("apagar")) {
    elemento.parentElement.remove();
    salvarTarefas();
  }
});

function salvarTarefas() {
  //seleciona todos os li's dentro da ul tarefas
  const liTarefas = tarefas.querySelectorAll("li");
  const listaDeTarefas = [];

  /*
  pegando o texto de cada li, removendo o texto apagar e removendo espaços vazios.
  */
  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace("Apagar", "").trim();
    //coloca esse texto dentro do array lista de tarefas
    listaDeTarefas.push(tarefaTexto);
  }

  //converte o array para string
  const tarefasJSON = JSON.stringify(listaDeTarefas);
  //seta esse array no localStorage com a chave de "tarefas"
  localStorage.setItem("tarefas", tarefasJSON);
}

function adicionaTarefasSalvas() {
  //pega as tarefas na chave tarefas
  const tarefas = localStorage.getItem("tarefas");

  //converte para array novamente
  const listaDeTarefas = JSON.parse(tarefas);

  //percorre o array criando os elementos com o texto especificado
  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}

//sempre executa quando a pagina é recarregada
adicionaTarefasSalvas();
