async function buscarCEP() {
    const uf = document.getElementById('uf').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const divResultado = document.getElementById('resultado');

    // Validação básica
    if (uf.length !== 2 || cidade.length < 3 || rua.length < 3) {
        alert("Por favor, preencha todos os campos corretamente. A cidade e a rua precisam de pelo menos 3 caracteres.");
        return;
    }

    divResultado.innerHTML = "Buscando...";

    try {
        const response = await fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`);
        const dados = await response.json();

        if (dados.length === 0) {
            divResultado.innerHTML = "<p>Nenhum CEP encontrado para este endereço.</p>";
            return;
        }

        // Limpa e renderiza os resultados
        divResultado.innerHTML = "";
        dados.forEach(item => {
            divResultado.innerHTML += `
                <div class="cep-item">
                    <strong>CEP: ${item.cep}</strong><br>
                    ${item.logradouro} - ${item.bairro}<br>
                    ${item.localidade}/${item.uf}
                </div>
            `;
        });

    } catch (error) {
        console.error(error);
        divResultado.innerHTML = "<p>Erro ao buscar os dados. Tente novamente mais tarde.</p>";
    }
}