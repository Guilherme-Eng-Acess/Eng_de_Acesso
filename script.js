// Função para resetar todos os formulários
function resetForms() {
    document.querySelectorAll('.form-container form').forEach(form => {
        form.reset();
    });
}

// Adicionar evento de clique aos botões de alternância
document.querySelectorAll('.toggleBtn').forEach(button => {
    button.addEventListener('click', function () {
        const target = this.dataset.target;

        // Resetar todos os formulários antes de esconder
        resetForms();

        // Esconder todos os formulários
        document.querySelectorAll('.form-container').forEach(form => {
            form.classList.add('hidden');
        });

        // Mostrar o formulário alvo
        document.getElementById(`form${target}`).classList.remove('hidden');
        // Esconder os botões de alternância
        document.getElementById('toggleButtons').classList.add('hidden');
    });
});


// Função para atualizar os slots com base na cidade selecionada
function atualizarSlots(cidade) {
    const slotSelect = document.querySelector('.slot');
    const listaElementos = document.querySelector('.elementos');

    // Limpar opções anteriores
    slotSelect.innerHTML = '<option value="">Selecione o SLOT</option>';
    listaElementos.innerHTML = '';

    if (cidade && dadosCidades[cidade]) {
        const slots = Object.keys(dadosCidades[cidade]);
        slots.forEach(slot => {
            const option = document.createElement('option');
            option.value = slot;
            option.textContent = slot;
            slotSelect.appendChild(option);
        });

        // Mostrar o seletor de SLOT
        slotSelect.parentElement.style.display = 'block';
        document.getElementById("listaElementos").classList.remove("hidden");
    } else {
        // Esconder o seletor de SLOT se nenhuma cidade for selecionada
        slotSelect.parentElement.style.display = 'none';
        document.getElementById("listaElementos").classList.add("hidden");
    }
}

// Função para atualizar a lista de elementos com base no SLOT selecionado
function mostrarLista(slotSelect) {
    const listaElementos = document.querySelector('.elementos');
    const cidadeSelect = document.querySelector('.cidade');

    const cidade = cidadeSelect.value;
    const slot = slotSelect.value;

    // Limpar elementos anteriores
    listaElementos.innerHTML = '';

    if (cidade && slot && dadosCidades[cidade] && dadosCidades[cidade][slot]) {
        const elementos = dadosCidades[cidade][slot];
        elementos.forEach(elemento => {
            const li = document.createElement('li');
            li.textContent = elemento;
            listaElementos.appendChild(li);
        });

        // Mostrar a lista de elementos
        document.getElementById("listaElementos").classList.remove("hidden");
    } else {
        // Esconder a lista de elementos se nenhuma cidade ou slot for selecionado ou se os dados não estiverem disponíveis
        document.getElementById("listaElementos").classList.add("hidden");
    }
}

// Função para voltar à seleção de cidade e SLOT
function voltar() {
    const formVlans = document.getElementById("formVlans");
    const slotSelect = formVlans.querySelector('.slot');
    const listaElementos = formVlans.querySelector('.elementos');

    // Limpar seleção de SLOT e lista de elementos
    slotSelect.value = '';
    listaElementos.innerHTML = '';

    // Ocultar lista de elementos
    document.getElementById("listaElementos").classList.add("hidden");
}

// Evento para carregar o formulário quando a página é carregada
window.addEventListener('load', function () {
    // Esconder todos os formulários ao carregar a página
    document.querySelectorAll('.form-container').forEach(form => {
        form.classList.add('hidden');
    });

});

// Adicionar evento de clique aos botões de voltar
document.querySelectorAll('.voltarBtn').forEach(button => {
    button.addEventListener('click', function () {
        // Esconder o formulário atual
        const form = this.closest('.form-container');
        form.classList.add('hidden');

        // Mostrar os botões de alternância
        document.getElementById('toggleButtons').classList.remove('hidden');

        // Resetar todos os formulários
        resetForms();
    });
});

// Função para verificar se todos os campos obrigatórios estão preenchidos
function verificarCamposPreenchidos(campos) {
    return campos.every(campo => campo.trim() !== '');
}

// Adicionar evento de clique aos botões de copiar
document.querySelectorAll('.copiarBtn').forEach(button => {
    button.addEventListener('click', function () {
        const form = this.closest('.formContent');
        const tipo = form.dataset.type;
        let textoCopiado = '';

        const tipoCaixaAtendimento = form.querySelector('.tipoCaixaAtendimento')?.value || '';
        const caixaAtendimento = form.querySelector('.caixaAtendimento')?.value || '';
        const olt = form.querySelector('.olt')?.value || '';
        const localizacao = form.querySelector('.localizacao')?.value || '';
        const Sinal = form.querySelector('.Sinal')?.value || '';
        let caboDrop = parseInt(form.querySelector('.caboDrop')?.value, 10) || 0;
        caboDrop += 40;
        caboDrop = Math.round(caboDrop / 10) * 10;
        const plano = form.querySelector('.plano')?.value || '';
        const identificarCliente = form.querySelector('.identificarCliente')?.value || '';
        const onu = form.querySelector('.onu')?.value || '';
        const observacao = form.querySelector('.observacao')?.value || '';
        const atenuadoCaixa = form.querySelector('.atenuadoCaixa')?.value || '';
        const usadoVaga = form.querySelector('.usadoVaga')?.value || '';
        const dropExistente = form.querySelector('.dropExistente')?.value || '';

        let camposObrigatorios;

        // Verificar os campos obrigatórios com base no tipo de formulário
         if (tipo === 'SemDrop') {
            camposObrigatorios = [tipoCaixaAtendimento, caixaAtendimento, olt, localizacao, Sinal, plano, identificarCliente, onu];
            if (!verificarCamposPreenchidos(camposObrigatorios)) {
                alert('Por favor, preencha todos os campos obrigatórios antes de copiar.');
                return;
            }
            textoCopiado = `Ativação-FTTX (sem drop)\n\nTipo Caixa de Atendimento: ${tipoCaixaAtendimento}\nCaixa de Atendimento: ${caixaAtendimento}\nOLT: ${olt}\nLocalização: ${localizacao}\nSinal esperado do cliente: ${Sinal}\n\nMateriais:\nCabo Drop: ${caboDrop} metros\n01 ROTEADOR WIRELESS: ${plano}\n01 ONU: ${onu}\n01 PATCH CORD\nIdentificar Cliente: ${identificarCliente}`;
        } else if (tipo === 'SemDrop1') {
            camposObrigatorios = [tipoCaixaAtendimento, caixaAtendimento, localizacao, Sinal, plano, onu];
            if (!verificarCamposPreenchidos(camposObrigatorios)) {
                alert('Por favor, preencha todos os campos obrigatórios antes de copiar.');
                return;
            }
            textoCopiado = `Ativação-FTTX\n\nNão documentado GEOGRID para realizar ativação pelo APP\n\nTipo Caixa de Atendimento: ${tipoCaixaAtendimento}\nCaixa de Atendimento mais próxima: ${caixaAtendimento}\nLocalização: ${localizacao}\nSinal esperado do cliente: ${Sinal}\nMateriais:\n01 ROTEADOR WIRELESS: ${plano}\n01 ONU: ${onu}\n01 PATCH CORD`;
        } else if (tipo === 'ComDrop') {
            camposObrigatorios = [tipoCaixaAtendimento, caixaAtendimento, olt, localizacao, Sinal, plano, identificarCliente, onu, dropExistente];
            if (!verificarCamposPreenchidos(camposObrigatorios)) {
                alert('Por favor, preencha todos os campos obrigatórios antes de copiar.');
                return;
            }
            textoCopiado = `Ativação-FTTX (com drop)\n\nPossivelmente existe drop em nome de: ${dropExistente}\nTipo Caixa de Atendimento: ${tipoCaixaAtendimento}\nCaixa de Atendimento: ${caixaAtendimento}\nOLT: ${olt}\nLocalização: ${localizacao}\nSinal esperado do cliente: ${Sinal}\n\nMateriais:\nCabo Drop: ${caboDrop} metros\n01 ROTEADOR WIRELESS: ${plano}\n01 ONU: ${onu}\n01 PATCH CORD\nIdentificar Cliente: ${identificarCliente}`;
        } else if (tipo === 'MudSemDrop') {
            camposObrigatorios = [tipoCaixaAtendimento, caixaAtendimento, olt, localizacao, Sinal, identificarCliente];
            if (!verificarCamposPreenchidos(camposObrigatorios)) {
                alert('Por favor, preencha todos os campos obrigatórios antes de copiar.');
                return;
            }
            textoCopiado = `Mudança de endereço (sem drop)\n\nTipo Caixa de Atendimento: ${tipoCaixaAtendimento}\nCaixa de Atendimento: ${caixaAtendimento}\nOLT: ${olt}\nLocalização: ${localizacao}\nSinal esperado do cliente: ${Sinal}\n\nMateriais:\nCliente orientado a levar equipamentos ao novo endereço\nCabo Drop: ${caboDrop} metros\nIdentificar Cliente: ${identificarCliente}`;
        } else if (tipo === 'MudSemDropUP') {
            camposObrigatorios = [tipoCaixaAtendimento, caixaAtendimento, olt, localizacao, Sinal, plano, identificarCliente, onu];
            if (!verificarCamposPreenchidos(camposObrigatorios)) {
                alert('Por favor, preencha todos os campos obrigatórios antes de copiar.');
                return;
            }
            textoCopiado = `Mudança de endereço (com drop)\n\nTipo Caixa de Atendimento: ${tipoCaixaAtendimento}\nCaixa de Atendimento: ${caixaAtendimento}\nOLT: ${olt}\nLocalização: ${localizacao}\nSinal esperado do cliente: ${Sinal}\n\nMateriais:\nCabo Drop: ${caboDrop} metros\n01 ROTEADOR WIRELESS: ${plano}\n01 ONU: ${onu}\n01 PATCH CORD\nIdentificar Cliente: ${identificarCliente}`;
        } else if (tipo === 'MudComDrop') {
            camposObrigatorios = [tipoCaixaAtendimento, caixaAtendimento, olt, localizacao, Sinal, identificarCliente, dropExistente];
            if (!verificarCamposPreenchidos(camposObrigatorios)) {
                alert('Por favor, preencha todos os campos obrigatórios antes de copiar.');
                return;
            }
            textoCopiado = `Mudança de endereço (com drop)\n\nPossivelmente existe drop em nome de: ${dropExistente}\nTipo Caixa de Atendimento: ${tipoCaixaAtendimento}\nCaixa de Atendimento: ${caixaAtendimento}\nOLT: ${olt}\nLocalização: ${localizacao}\nSinal esperado do cliente: ${Sinal}\n\nMateriais:\nCabo Drop: ${caboDrop} metros\nIdentificar Cliente: ${identificarCliente}`;
        } else if (tipo === 'MudComDropUP') {
            camposObrigatorios = [tipoCaixaAtendimento, caixaAtendimento, olt, localizacao, Sinal, plano, identificarCliente, onu, dropExistente];
            if (!verificarCamposPreenchidos(camposObrigatorios)) {
                alert('Por favor, preencha todos os campos obrigatórios antes de copiar.');
                return;
            }
            textoCopiado = `Mudança de endereço (com drop)\n\nPossivelmente existe drop em nome de: ${dropExistente}\nTipo Caixa de Atendimento: ${tipoCaixaAtendimento}\nCaixa de Atendimento: ${caixaAtendimento}\nOLT: ${olt}\nLocalização: ${localizacao}\nSinal esperado do cliente: ${Sinal}\n\nMateriais:\nCabo Drop: ${caboDrop} metros\n01 ROTEADOR WIRELESS: ${plano}\n01 ONU: ${onu}\n01 PATCH CORD\nIdentificar Cliente: ${identificarCliente}`;
        } else if (tipo === 'Atenuacao') {
            camposObrigatorios = [atenuadoCaixa, usadoVaga];
            if (!verificarCamposPreenchidos(camposObrigatorios)) {
                alert('Por favor, preencha todos os campos obrigatórios antes de copiar.');
                return;
            }
            textoCopiado = `Tipo: Atenuação\n\nObservação:\nAtenuado caixa: ${atenuadoCaixa}, usado vaga em nome de: ${usadoVaga}`;
        }

        if (plano.includes('.')) {
            textoCopiado += '\n-01 ROTEADOR WIRELESS SEGUNDO PONTO MESH';
        }

        navigator.clipboard.writeText(textoCopiado)
            .then(() => {
                alert('Informações copiadas para área de transferência');
                // Resetar o formulário após a cópia bem-sucedida
                form.reset();
            })
            .catch(err => console.error('Erro ao copiar texto: ', err));
    });
});

// Adicionar evento de clique aos botões de voltar
document.querySelectorAll('.voltarBtn').forEach(button => {
    button.addEventListener('click', function () {
        const formContainer = this.closest('.form-container');

        // Resetar todos os formulários ao voltar
        resetForms();
    });
});

// Função para resetar todos os formulários
function resetForms() {
    document.querySelectorAll('.formContent').forEach(form => {
        form.reset();
    });
}
