function enviarFormulario() {
    const form = document.getElementById('cadastroForm');

    const nome = form.elements.nome.value;
    const cpf = form.elements.cpf.value;
    const email = form.elements.email.value;
    const senha = form.elements.senha.value;
    const senha2 = form.elements.senha2.value;

    if (nome.trim() === '') {
        alert("O campo nome está vazio.");
        return;
    } else if (cpf.trim() === '') {
        alert("O campo cpf está vazio.");
        return;
    } else if (email.trim() === '') {
        alert("O campo Email está vazio.");
        return;
    } else if (senha.trim() === '') {
        alert("O campo Senha está vazio.");
        return;
    } else if (senha2.trim() === '') {
        alert("O campo Confirmar senha está vazio.");
        return;
    } else if (senha.trim() != senha2.trim()) {
        alert("A senha está confirmada!");
        return;
    }

    // Realiza a solicitação ao servidor
    fetch('http://localhost:3000/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, cpf, email, senha })
    })
    .then(response => {
        if (response.ok) {
            alert('Usuário cadastrado com sucesso!');
            form.reset();
            window.location.href("inform.html")
        } else {
            alert('Erro ao cadastrar usuário. Tente novamente mais tarde.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro. Verifique o console para mais detalhes.');
    });
}