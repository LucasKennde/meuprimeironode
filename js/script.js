const form = document.getElementById('cadastroForm');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = form.elements.nome.value;
    const email = form.elements.email.value;

    try {
        const response = await fetch('http://localhost:3000/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email })
        });

        if (response.ok) {
            alert('Usuário cadastrado com sucesso!');
            form.reset();
        } else {
            alert('Erro ao cadastrar usuário. Tente novamente mais tarde.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro. Verifique o console para mais detalhes.');
    }
});
