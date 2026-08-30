function teste(){

    let titulo =  document.getElementById("titulo").value;
    if(titulo == ""){
        alert("campo titulo precisa ser preenchido");
    }else{
        alert("o titulo eh" + " " + titulo);
    }

    let responsavel =  document.getElementById("responsavel").value;
    if(responsavel == ""){
        alert("campo responsavel precisa ser preenchido");
    }else{
        alert("o responsavel eh" + " " + responsavel);
    }

    let prioridade =  document.getElementById("prioridade").value;
    if(prioridade == "PRIORIDADE"){
        alert("campo prioridade precisa ser preenchido");
    }else{
        alert("a prioridade eh" + " " + prioridade);
    }

    let descrição =  document.getElementById("descrição").value;
    if(descrição == ""){
        alert("campo descrição precisa ser preenchido");
    }else{
        alert("a descrição eh" + " " + descrição);
    }

    let data_criação =  document.getElementById("data_criação").value;
    if(data_criação == ""){
        alert("campo data de criação precisa ser preenchido");
    }else{
        alert("a data de criação eh" + " " + data_criação);
    }

    let data_conclusão =  document.getElementById("data_conclusão").value;
    if(data_criação == ""){
        alert("campo data de conclusão precisa ser preenchido");
    }else{
        alert("a data de conclusão eh" + " " + data_conclusão);
    }

    let status =  document.getElementById("status").value;
    if(status == "Selecione"){
        alert("campo status precisa ser preenchido");
    }else{
        alert("o status eh" + " " + status);
    }

    let projeto =  document.getElementById("projeto").value;
    if(projeto == "Selecione"){
        alert("campo projeto precisa ser preenchido");
    }else{
        alert("o projeto eh" + " " + projeto);
    }

    const tarefa = {
    id: Date.now().toString(),
    titulo: titulo,
    responsavel: responsavel,
    prioridade: prioridade,
    descrição: descrição,
    data_criação: data_criação,
    data_conclusão: data_conclusão,
    status: status,
    projeto: projeto
}

let tarefas = JSON.parse(localStorage.getItem("tarefas") || "[]");

tarefas.push(tarefa);
localStorage.setItem('tarefas',JSON.stringify(tarefas))

}

function salvarProjeto(){

    let titulo = document.getElementById("titulo").value;
    if(titulo == ""){
        alert("campo nome do projeto precisa ser preenchido");
        return;
    }

    let descrição = document.getElementById("descrição").value;
    if(descrição == ""){
        alert("campo descrição precisa ser preenchido");
        return;
    }

    let data_criação = document.getElementById("data_criação").value;
    if(data_criação == ""){
        alert("campo data de criação precisa ser preenchido");
        return;
    }

    let data_conclusão = document.getElementById("data_conclusão").value;
    if(data_conclusão == ""){
        alert("campo data de conclusão precisa ser preenchido");
        return;
    }

    let status = document.getElementById("status").value;
    if(status == "Selecione"){
        alert("campo status precisa ser preenchido");
        return;
    }

    let responsavel = document.getElementById("responsavel").value;
    if(responsavel == ""){
        alert("campo responsável precisa ser preenchido");
        return;
    }

    const projeto = {
        id: Date.now().toString(),
        titulo: titulo,
        descrição: descrição,
        data_criação: data_criação,
        data_conclusão: data_conclusão,
        status: status,
        responsavel: responsavel
    }

    let projetos = JSON.parse(localStorage.getItem("projetos") || "[]");
    projetos.push(projeto);
    localStorage.setItem('projetos', JSON.stringify(projetos));

    alert("Projeto salvo com sucesso!");
}


function salvarUsuario(){

    let nome = document.getElementById("nome").value;
    if(nome == ""){
        alert("campo nome precisa ser preenchido");
        return;
    }

    let cpf = document.getElementById("cpf").value;
    if(cpf == ""){
        alert("campo cpf precisa ser preenchido");
        return;
    }

    let email = document.getElementById("E-mail").value;
    if(email == ""){
        alert("campo e-mail precisa ser preenchido");
        return;
    }

    let dataNascimento = document.getElementById("dataNascimento").value;
    if(dataNascimento == ""){
        alert("campo data de nascimento precisa ser preenchido");
        return;
    }

    let status = document.getElementById("statusUsuario").value;
    if(status == "Selecione"){
        alert("campo status precisa ser preenchido");
        return;
    }

    let senha = document.getElementById("senhaUsuario").value;
    if(senha == ""){
        alert("campo senha precisa ser preenchido");
        return;
    }

    const usuario = {
        id: Date.now().toString(),
        nome: nome,
        cpf: cpf,
        email: email,
        dataNascimento: dataNascimento,
        status: status,
        senha: senha
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert("Usuário adicionado com sucesso!");
}

function atualizarDashboard(){
    let totalConcluidos = document.getElementById("TotalConcluidos");
    
    // só executa se estiver na página do dashboard
    if(!totalConcluidos) return;

    let projetos = JSON.parse(localStorage.getItem("projetos") || "[]");

    let concluidos = 0;
    let emAndamento = 0;
    let pendentes = 0;
    let cancelados = 0;

    projetos.forEach(function(projeto){
        if(projeto.status == "1"){
            pendentes++;
        } else if(projeto.status == "2"){
            emAndamento++;
        } else if(projeto.status == "3"){
            concluidos++;
        } else if(projeto.status == "4"){
            cancelados++;
        }
    });

    totalConcluidos.innerHTML = concluidos;
    document.getElementById("TotalEmAndamento").innerHTML = emAndamento;
    document.getElementById("TotalPendentes").innerHTML = pendentes;
    document.getElementById("TotalCancelados").innerHTML = cancelados;
}

atualizarDashboard();

function criarGraficos(){
    let canvasStatus = document.getElementById("graficoStatus");
    if(!canvasStatus) return; // só roda no dashboard

    let projetos = JSON.parse(localStorage.getItem("projetos") || "[]");

    // ---- Gráfico de Status (pizza) ----
    let concluidos = 0, emAndamento = 0, pendentes = 0, cancelados = 0;

    projetos.forEach(function(p){
        if(p.status == "1") pendentes++;
        else if(p.status == "2") emAndamento++;
        else if(p.status == "3") concluidos++;
        else if(p.status == "4") cancelados++;
    });

    new Chart(canvasStatus, {
        type: 'pie',
        data: {
            labels: ['Concluído', 'Em andamento', 'Pendente', 'Cancelado'],
            datasets: [{
                data: [concluidos, emAndamento, pendentes, cancelados],
                backgroundColor: ['#28a745', '#17a2b8', '#ffc107', '#dc3545']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'right', labels: { color: '#fff' } } }
        }
    });

    // ---- Gráfico por Mês (barras) ----
    let projetosPorMes = {};

    projetos.forEach(function(p){
        if(!p.data_criação) return;
        let data = new Date(p.data_criação + "T00:00:00");
        let chave = data.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
        projetosPorMes[chave] = (projetosPorMes[chave] || 0) + 1;
    });

    new Chart(document.getElementById("graficoMes"), {
        type: 'bar',
        data: {
            labels: Object.keys(projetosPorMes),
            datasets: [{
                label: 'Projetos criados',
                data: Object.values(projetosPorMes),
                backgroundColor: '#4287f5'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1, color: '#fff' } },
                x: { ticks: { color: '#fff' } }
            },
            plugins: { legend: { labels: { color: '#fff' } } }
        }
    });

    // ---- Gráfico por Responsável (barras) ----
    let projetosPorResponsavel = {};

    projetos.forEach(function(p){
        let nome = p.responsavel || "Não definido";
        projetosPorResponsavel[nome] = (projetosPorResponsavel[nome] || 0) + 1;
    });

    let cores = ['#e74c3c', '#2ecc71', '#3498db', '#f39c12', '#9b59b6', '#1abc9c'];

    new Chart(document.getElementById("graficoResponsavel"), {
        type: 'bar',
        data: {
            labels: Object.keys(projetosPorResponsavel),
            datasets: [{
                label: 'Projetos',
                data: Object.values(projetosPorResponsavel),
                backgroundColor: Object.keys(projetosPorResponsavel).map((_, i) => cores[i % cores.length])
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1, color: '#fff' } },
                x: { ticks: { color: '#fff' } }
            }
        }
    });
}

criarGraficos();


let quantidadeProjetos = JSON.parse(localStorage.getItem("tarefas")).length;
let qtd= document.getElementById("quantidade")
qtd.innerHTML=quantidadeProjetos
