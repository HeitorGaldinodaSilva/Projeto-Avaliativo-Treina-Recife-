function atualizarContainer() {

    quantidadeProjetos.forEach(projeto => {

        const divprojeto = document.createElement('div');
        divprojeto.className = 'projeto-card';

        divprojeto.innerHTML = `
            <h3>${projeto.nome || 'sem título'}</h3>
            <p>Descrição: ${projeto.descricao || 'não informada'}</p>
            <p>Status: ${projeto.status || 'não definido'}</p>
            <p>Data de criação: ${formatarData(projeto.datacriacao)}</p>
            <p>Data de conclusão: ${formatarData(projeto.dataconclusao)}</p>
            <p>Responsável: ${projeto.responsavel || 'não atribuído'}</p>
        `;

        container.appendChild(divprojeto);

    });

}

function carregarProjetoParaEdicao(id) {
    const projetos = JSON.parse(localStorage.getItem('projetos') || '[]');
    const projeto = projetos.find(p =>p.id === id);

    if (!projeto) {
        alert('projeto não encontrado');
        return;
    }

    document.getElementById
}