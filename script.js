let entrada_nova_tarefa = document.querySelector("#entrada_nova_tarefa");
let botao_adicionar = document.querySelector('#botao_adicionar');
let lista_tarefas = document.querySelector('#lista_tarefas');
let btn_fechar_edicao = document.getElementById('btn_fechar_edicao');
let btn_atualizar_tarefa = document.getElementById('btn_atualizar_tarefa');
let janela_edicao = document.getElementById('janela_edicao');
let janela_edicao_fundo = document.getElementById('janela_edicao_fundo');
let input_tarefa_edicao = document.getElementById('input_tarefa_edicao');
let titulo_tarefa_edicao = document.getElementById('titulo_tarefa_edicao');

entrada_nova_tarefa.addEventListener('keypress', (e) =>{
    if (e.keyCode == 13) {
    let tarefa = {
        nome: entrada_nova_tarefa.value,
        id: gerarId(),
    }

    adicionarTarefa(tarefa);

    }
});

botao_adicionar.addEventListener("click", (e) =>{
    let tarefa = {
        nome: entrada_nova_tarefa.value,
        id: gerarId(),
    }
    adicionarTarefa(tarefa);
});

btn_atualizar_tarefa.addEventListener('click', (e) => {
    e.preventDefault();
    let tarefa_editada = input_tarefa_edicao.value;
    let id_tarefa_edicao = titulo_tarefa_edicao.innerHTML;
    let tarefa = {
        nome: input_tarefa_edicao.value,
        id: id_tarefa_edicao,
    };
    let tarefa_atual = document.getElementById(''+id_tarefa_edicao+'');
    let li = criarTagLi(tarefa);
    lista_tarefas.replaceChild(li, tarefa_atual);
    alternar_janela_edicao();
});

btn_fechar_edicao.addEventListener('click', (e) => {
    alternar_janela_edicao();
});

function gerarId() {
    return Math.floor(Math.random() * 3000);
};

function adicionarTarefa(tarefa) {
    if (entrada_nova_tarefa.value != '') {
        let li = criarTagLi(tarefa);
        lista_tarefas.appendChild(li);
        entrada_nova_tarefa.value = '';
    }
    else {
        window.alert("Adicione um texto");
    };
};

function criarTagLi(tarefa) {
    let li = document.createElement('li');
    li.id = tarefa.id;
    let h_tres = document.createElement('h3');
    h_tres.classList.add('textoTarefa');
    h_tres.innerHTML = tarefa.nome;

    let div = document.createElement('div');
    let btn_editar = document.createElement('button');
    btn_editar.classList.add('botaoAcao');
    btn_editar.innerHTML = '<i class="fa fa-pencil"></i>';
    btn_editar.setAttribute('onclick', 'editar('+tarefa.id+')');

    let btn_excluir = document.createElement('button');
    btn_excluir.classList.add('botaoAcao');
    btn_excluir.innerHTML = '<i class="fa fa-trash"></i>';
    btn_excluir.setAttribute('onclick', 'excluir('+tarefa.id+')');

    div.appendChild(btn_editar);
    div.appendChild(btn_excluir);
    li.appendChild(h_tres);
    li.appendChild(div);

    return li;

};

function editar(id_tarefa) {
    confirmacao = window.confirm('Editar tarefa?');
    if (confirmacao) {
        let li = document.getElementById(''+id_tarefa+'');
        if(li) {
            titulo_tarefa_edicao.innerHTML = id_tarefa;
            alternar_janela_edicao();
        };

    };
};

function excluir(id_tarefa) {
    confirmacao = window.confirm('Deseja realmente excluir?');
    if (confirmacao) {
        let li = document.getElementById(''+id_tarefa+'');
        if(li) {
            lista_tarefas.removeChild(li);
        };

    }
};

function alternar_janela_edicao() {
    janela_edicao.classList.toggle('abrir');
    janela_edicao_fundo.classList.toggle('abrir');
};