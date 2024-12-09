const API_URL = "http://localhost:8080/pessoas"; // URL do endpoint da API

function formatarDataParaDDMMYYYY(dataISO) {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}-${mes}-${ano}`;
}


const inputDataNascimento = document.getElementById("dataNascimento");

inputDataNascimento.addEventListener("input", () => {
    const valorISO = inputDataNascimento.value;
    if (valorISO) {
        const [ano, mes, dia] = valorISO.split("-");
        inputDataNascimento.value = `${dia}-${mes}-${ano}`; // Mostra no formato dd-mm-yyyy
    }
});

async function carregarPessoas() {
    const tabelaBody = document.getElementById("pessoa-table-body");
    tabelaBody.innerHTML = ""; // Limpa a tabela antes de recarregar

    try {
        const response = await fetch(API_URL); // GET para listar pessoas
        if (response.ok) {
            const pessoas = await response.json(); // Converte a resposta em JSON
            pessoas.forEach((pessoa) => {
                const linha = document.createElement("tr");
                linha.innerHTML = `
                    <td>${pessoa.id}</td>
                    <td>${pessoa.nome}</td>
                    <td>${pessoa.email}</td>
                    <td>${pessoa.dataNascimento}</td>
                    <td>
                        <button class="visualizar" onclick="visualizarPessoa(${pessoa.id})">
                            <img src="img/mostrar.png" alt="Visualizar" width="10" height="10" vertical-align: middle>
                        </button>
                        <button class="editar" onclick="editarPessoa(${pessoa.id})">
                            <img src="img/editar.png" alt="editar" width="10" height="10" vertical-align: middle>
                        </button>
                        <button class="remover" onclick="removerPessoa(${pessoa.id})">
                            <img src="img/remover.png" alt="remover" width="10" height="10" vertical-align: middle>
                        </button>
                    </td>
                `;
                tabelaBody.appendChild(linha);
            });
        } else {
            console.error("Erro ao carregar pessoas");
        }
    } catch (error) {
        console.error("Erro:", error);
    }
}

// Função para visualizar os detalhes de uma pessoa
async function visualizarPessoa(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`); // GET com ID
        if (response.ok) {
            const pessoa = await response.json();
            alert(
                `ID: ${pessoa.id}\nNome: ${pessoa.nome}\nEmail: ${pessoa.email}\nData de Nascimento: ${pessoa.dataNascimento}`
            );
        } else {
            alert("Pessoa não encontrada.");
        }
    } catch (error) {
        console.error("Erro ao visualizar pessoa:", error);
    }
}



document.getElementById("formPessoa").addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const dataNascimentoISO = document.getElementById("dataNascimento").value;
    const dataNascimento = formatarDataParaDDMMYYYY(dataNascimentoISO);

    try {
        const response = await fetch(API_URL, {
            method: "POST", // POST para criar uma nova pessoa
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nome, email, dataNascimento }),
        });

        if (response.ok) {
            alert("Pessoa adicionada com sucesso!");
            carregarPessoas(); // Atualiza a tabela
            document.getElementById("formPessoa").reset(); // Limpa o formulário
        } else {
            alert("Erro ao adicionar pessoa.");
        }
    } catch (error) {
        console.error("Erro ao adicionar pessoa:", error);
    }
});



// // Função para adicionar uma nova pessoa
// document.getElementById("formPessoa").addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const nome = document.getElementById("nome").value;
//     const email = document.getElementById("email").value;
//     // const dataNascimento = document.getElementById("dataNascimento").value;
//     const dataNascimentoISO = document.getElementById("dataNascimento").value;
//     const dataNascimento = formatarDataParaDDMMYYYY(dataNascimentoISO); // Reformatando a data

//     try {
//         const response = await fetch(API_URL, {
//             method: "POST", // POST para criar uma nova pessoa
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ nome, email, dataNascimento }),
//         });

//         if (response.ok) {
//             alert("Pessoa adicionada com sucesso!");
//             carregarPessoas(); // Atualiza a tabela
//             document.getElementById("formPessoa").reset(); // Limpa o formulário
//         } else {
//             alert("Erro ao adicionar pessoa.");
//         }
//     } catch (error) {
//         console.error("Erro ao adicionar pessoa:", error);
//     }
// });

// Função para editar uma pessoa pelo ID
async function editarPessoa(id) {
    const novoNome = prompt("Digite o novo nome:");
    const novoEmail = prompt("Digite o novo email:");
    const novaDataNascimento = prompt("Digite a nova data de nascimento (DD-MM-YYYY):");

    if (novoNome && novoEmail && novaDataNascimento) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT", // PUT para editar
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome: novoNome,
                    email: novoEmail,
                    dataNascimento: novaDataNascimento,
                }),
            });

            if (response.ok) {
                alert("Pessoa editada com sucesso!");
                carregarPessoas(); // Atualiza a tabela
            } else {
                alert("Erro ao editar pessoa.");
            }
        } catch (error) {
            console.error("Erro ao editar pessoa:", error);
        }
    } else {
        alert("Todos os campos devem ser preenchidos para editar.");
    }
}

// Função para remover uma pessoa pelo ID
async function removerPessoa(id) {
    if (confirm("Tem certeza que deseja remover esta pessoa?")) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE", // DELETE para excluir
            });

            if (response.ok) {
                alert("Pessoa removida com sucesso!");
                carregarPessoas(); // Atualiza a tabela
            } else {
                alert("Erro ao remover pessoa.");
            }
        } catch (error) {
            console.error("Erro ao remover pessoa:", error);
        }
    }
}

// Carrega a tabela ao carregar a página
document.addEventListener("DOMContentLoaded", carregarPessoas);


// inputDataNascimento.addEventListener("focus", () => {
//     const valorAtual = inputDataNascimento.value;
//     if (valorAtual.includes("-")) {
//         const [dia, mes, ano] = valorAtual.split("-");
//         inputDataNascimento.value = `${ano}-${mes}-${dia}`; // Volta para o formato yyyy-mm-dd ao abrir o calendário
//     }
// });

