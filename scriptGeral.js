/* ----------------- MENU ---------------- */
let isDarkMode;

// Função para criar o menu dinamicamente
function createMenu() {
    const menuHTML = `
        <!-- Aba de Navegação Lateral -->

        <aside class="sidebar">

            <div class="user-profile">
                <a href="indexPerfil.html">
                    <div class="user-icon">
                        <img id="user-image" class="user-image" alt="User Image">
                        <i id="user-icon" class="fa-solid fa-circle-user"></i>
                    </div>
                
                    <p class="user-name" id="user-name">Nome</p>
                </a>
            </div>

            <button id="new-transaction-btn" class="new-transaction-btn">
                <i class="fa-solid fa-plus"></i> NOVO
            </button>

            <nav class="menu poppins-regular">
                <ul>
                    <a href="indexDashboard.php">
                        <li class="menu-item">
                            <i class="fa-solid fa-house"></i>
                            <p>Dashboard</p>
                        </li>
                    </a>
                    <a href="indexTransacoes.php">
                        <li class="menu-item">
                            <i class="fa-solid fa-money-bill-transfer"></i>
                            <p>Transações</p>
                        </li>
                    </a>
                    <a href="indexReceitas.php">
                        <li class="menu-item">
                            <i class="fa-solid fa-arrow-up"></i>
                            <p>Receitas</p>
                        </li>
                    </a>
                    <a href="indexGastos.php">
                        <li class="menu-item">
                            <i class="fa-solid fa-arrow-down"></i>
                            <p>Gastos</p>
                        </li>
                    </a>
                </ul>
            </nav>

            <nav class="secondary-menu poppins-regular">
                <ul>
                    <a id="change-theme-btn">
                        <li class="menu-item">
                            <i class="fa-solid fa-moon"></i>
                            <p>Modo Escuro</p>
                        </li>
                    </a>
                    <a href="indexAjuda.html">
                        <li class="menu-item">
                            <i class="fa-solid fa-circle-question"></i>
                            <p>Ajuda</p>
                        </li>
                    </a>
                </ul>
            </nav>

        </aside>

        <!-- Menu de seleção do botão "Novo" para Gasto ou Receita -->
        
        <div id="new-transaction-menu" class="transaction-menu">
            <ul>
                <li onclick="selectType('income')" class="income">
                    <i class="fa-solid fa-arrow-up"></i>
                    <p>Receita</p>
                </li>
                <li onclick="selectType('expense')" class="expense">
                    <i class="fa-solid fa-arrow-down"></i>
                    <p>Gasto</p>
                </li>
            </ul>
        </div>

        <!-- Modal para inserir os dados -->

        <div id="transaction-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal()">&times;</span>
                <h2>Nova Transação</h2>
                <form id="transaction-form" action="recebeTransacao.php" method="post" onsubmit="addTransaction(event)">
                    <input type="hidden" id="type" name="type">
                        
                    <label for="movement">Movimentação:</label>
                    <input id="movement" name="movement" required>
        
                    <label for="amount">Valor:</label>
                    <input type="number" id="amount" name="amount" required>
        
                    <label for="category">Categoria:</label>
                    <select id="category" name="category" required>
                    </select>
        
                    <label for="date">Data:</label>
                    <input type="date" id="date" name="date" required>
        
                    <label for="description">Descrição:</label>
                    <textarea id="description" name="description"></textarea>
        
                    <button type="submit">Adicionar</button>
                </form>
            </div>
        </div>
    `;
    document.getElementById("main-menu").innerHTML = menuHTML;

    // Adiciona o listener para o botão de troca de tema
    const darkModeButton = document.getElementById('change-theme-btn');
    isDarkMode = false;

    darkModeButton.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        changeTheme();
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('themeIcon', isDarkMode ? 'fa-sun' : 'fa-moon');
        localStorage.setItem('themeText', isDarkMode ? 'Modo Claro' : 'Modo Escuro');
    });
}

// Função executada quando carregar a página
window.onload = function () {

    // Cria o menu 
    createMenu();

    // Verificar o tema, ícone e texto sobre o modo escuro salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    const savedThemeIcon = localStorage.getItem('themeIcon') || 'fa-moon'; // valor padrão
    const savedThemeText = localStorage.getItem('themeText') || 'Modo Escuro'; // valor padrão

    if (savedTheme === 'dark') {
        isDarkMode = true;
    } else {
        isDarkMode = false;
    }

    // Aplica o tema da página
    changeTheme();


    // Atualizar o ícone e texto do tema no menu
    const themeBtn = document.querySelector('#change-theme-btn');
    if (themeBtn) {
        const themeIcon = themeBtn.querySelector('i');
        const themeText = themeBtn.querySelector('p');

        themeIcon.classList.remove('fa-moon', 'fa-sun');
        themeIcon.classList.add(savedThemeIcon);
        themeText.textContent = savedThemeText;
    }

    // Atualiza as outras funcionalidades
    setTimeout(() => {
        keepUserProfileInfo();
        keepUserNameInfo();
        keepUserIcon();
    }, 100)


    highlightActiveMenu();
};

// Função para destacar o item ativo no menu
function highlightActiveMenu() {
    // Seleciona todos os <a> dentro do menu
    const menuLinks = document.querySelectorAll('.menu a, .secondary-menu a');

    // Loop por todos os links no menu
    menuLinks.forEach(link => {
        // Verifica se o href do link corresponde com a URL
        if (link.href === window.location.href) {
            // Encontra o <li> associado 
            const menuItem = link.querySelector('.menu-item');
            if (menuItem) {
                // Adiciona o 'active'
                menuItem.classList.add('active');
            }
        }
    });

    highlightProfile();
}

// Função para destacar o perfil 
function highlightProfile() {
    const profileLink = document.querySelector('.user-profile a');

    // Verifica se o href do link corresponde com a URL do perfil
    if (profileLink.href === window.location.href) {
        // Adiciona a classe 'active'
        const userProfile = document.querySelector('.user-profile');
        userProfile.classList.add('active');
    }
}

/* ----------------- BOTÃO NOVO ---------------- */

// Listas de categorias
const expenseCategories = [
    "Casa", "Educação", "Eletrônicos", "Lanches", "Lazer", "Saúde",
    "Serviços", "Mercado", "Transporte", "Vestuário", "Viagens", "Outros"
];

const incomeCategories = [
    "Salário", "Investimento", "Prêmios", "Presente", "Outros"
];

// Função para exibir o menu para adicionar uma nova transação
document.addEventListener('click', function (event) {
    if (event.target.id === "new-transaction-btn") {
        var menu = document.getElementById("new-transaction-menu");
        menu.style.display = "block";
        menu.style.top = event.clientY + "px";
        menu.style.left = event.clientX + "px";
        event.stopPropagation();
    } else {
        closeMenu(); // Fecha se clicar fora do botão
    }
});

// Função para selecionar o tipo de transação e abrir o modal
function selectType(type) {
    document.getElementById("type").value = type;
    var modalTitle = document.querySelector("#transaction-modal h2");
    modalTitle.textContent = type === "expense" ? "Novo Gasto" : "Nova Receita";
    fillCategories(type);
    openModal();
    closeMenu();
}

// Função para preencher as categorias no campo de seleção
function fillCategories(type) {
    var categorySelect = document.getElementById("category");
    categorySelect.innerHTML = "";
    var categories = type === "expense" ? expenseCategories : incomeCategories;

    categories.forEach(function (category) {
        var option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Função para abrir o MODAL
function openModal() {
    limparFormulario();
    var modal = document.getElementById("transaction-modal");
    modal.style.display = "flex";
}

// Função para fechar o MODAL
function closeModal() {
    var modal = document.getElementById("transaction-modal");
    modal.style.display = "none";
}

// Função para fechar o MENU de seleção
function closeMenu() {
    var menu = document.getElementById("new-transaction-menu");
    menu.style.display = "none";
}

// Função para adicionar uma nova transação (gasto ou receita) usando AJAX
function addTransaction(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    console.log(formData.get('date')); // Adicione esta linha para verificar o valor

    fetch('recebeTransacao.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data.includes("sucesso")) {
            alert("Transação adicionada com sucesso!");
            closeModal();
        } else {
            alert("Erro ao adicionar transação: " + data);
        }
    })
    .catch(error => console.error('Erro:', error));
}


// Função para limpar os campos do formulário
function limparFormulario() {
    document.getElementById("movement").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("date").value = "";
    document.getElementById("description").value = "";
}

// Fecha o modal se o usuário clicar fora no fundo
window.onclick = function (event) {
    var modal = document.getElementById("transaction-modal");
    if (event.target === modal) {
        closeModal();
    }
};

/* ----------------- ATUALIZAÇÃO DOS DADOS ---------------- */

// Scrip  geral para atualizar o nome e foto de perfil em todas as páginas
function keepUserProfileInfo() {
    const keepBirthday = localStorage.getItem('localBirthday');
    const keepUserNameProfile = localStorage.getItem('localUsername');
    const keepEmail = localStorage.getItem('localEmail');
    const keepPhone = localStorage.getItem('localPhone');
    const keepGender = localStorage.getItem('localGender');

    if (keepBirthday && document.getElementById('birthday') !== null)
        document.getElementById('birthday').value = keepBirthday;

    if (keepUserNameProfile && document.getElementById('username') !== null)
        document.getElementById('username').value = keepUserNameProfile;

    if (keepEmail && document.getElementById('email') !== null)
        document.getElementById('email').value = keepEmail;

    if (keepPhone && document.getElementById('phone') !== null)
        document.getElementById('phone').value = keepPhone;

    if (keepGender && document.getElementById('gender') !== null)
        document.getElementById('gender').value = keepGender;
}

function keepUserNameInfo() {
    const keepUserNameSideBar = localStorage.getItem('localUser-name');
    const keepWelcomeUserName = localStorage.getItem('localWelcome-user-name');

    if (keepUserNameSideBar)
        document.getElementById('user-name').innerText = keepUserNameSideBar;

    if (keepWelcomeUserName)
        document.getElementById('welcome-user-name').innerText = keepWelcomeUserName;
}

function keepUserIcon() {
    const keepUserImage = localStorage.getItem('localUser-image');

    if (keepUserImage) {
        const userImage = document.getElementById('user-image');
        const userIcon = document.getElementById('user-icon');

        userImage.src = keepUserImage;

        userImage.style.display = 'block';
        userIcon.style.display = 'none';
    }
}

/* ----------------- MODO NOTURNO ---------------- */

// Altera entre os temas
function changeTheme() {

    if (isDarkMode) {
        turnOnDarkMode();
        updateThemeIcon();
    } else {
        turnOffDarkMode();
        updateThemeIcon();
    }

}

const turnOnDarkMode = () => {
    document.documentElement.style.setProperty('--background-color', 'var(--darkmode-background-color)');
    document.documentElement.style.setProperty('--sidebar-color', 'var(--darkmode-sidebar-color)');
    document.documentElement.style.setProperty('--text-color', 'var(--darkmode-text-color)');
    document.documentElement.style.setProperty('--complemental-text-color', 'var(--darkmode-complemental-text-color)');
    document.documentElement.style.setProperty('--background-item', 'var(--darkmode-background-item)');
    document.documentElement.style.setProperty('--complemental-white', 'var(--darkmode-complemental-white)');
    document.documentElement.style.setProperty('--background-transactions', 'var(--darkmode-background-transactions)');
    document.documentElement.style.setProperty('--background-question', 'var(--darkmode-background-question)');
    document.documentElement.style.setProperty('--question-border', 'var(--darkmode-question-border)');
    document.documentElement.style.setProperty('--text-opacity', 'var(--darkmode-text-opacity)');
    document.documentElement.style.setProperty('--calendar-color', 'var(--darkmode-calendar-color)');
    document.documentElement.style.setProperty('--hover-color', 'var(--darkmode-hover-color)');
}

const turnOffDarkMode = () => {
    document.documentElement.style.setProperty('--background-color', '#ffffff');
    document.documentElement.style.setProperty('--sidebar-color', '#f2f2f2');
    document.documentElement.style.setProperty('--text-color', '#000');
    document.documentElement.style.setProperty('--complemental-text-color', '#666');
    document.documentElement.style.setProperty('--background-item', '#f5f5f5');
    document.documentElement.style.setProperty('--complemental-white', '#666');
    document.documentElement.style.setProperty('--background-transactions', '#ddd');
    document.documentElement.style.setProperty('--background-question', '#f9f9f9');
    document.documentElement.style.setProperty('--question-border', '#ddd');
    document.documentElement.style.setProperty('--calendar-color', 'invert(1) brightness(0%)');
    document.documentElement.style.setProperty('--hover-color', '#ddd');
}

// Atualiza o ícone de tema
function updateThemeIcon() {
    const themeBtn = document.querySelector('#change-theme-btn'); // Seleciona a tag <a>

    if (themeBtn) {
        const themeIcon = themeBtn.querySelector('i');  // Seleciona o ícone dentro de <a>
        const themeText = themeBtn.querySelector('p');  // Seleciona o texto dentro de <a>

        if (isDarkMode) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            themeText.textContent = 'Modo Claro';
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            themeText.textContent = 'Modo Escuro';
        }
    }
}

//o nome estava Fulano e só dps de 1 segundo atualizando pro nome da pessoa
document.addEventListener("DOMContentLoaded", function () {
    // Obtém o nome do usuário do localStorage
    const userName = localStorage.getItem("localWelcome-user-name");
    
    if (userName) {
        // Atualiza o nome de boas-vindas
        document.getElementById("welcome-user-name").innerText = userName;

        // Atualiza o nome embaixo da foto de perfil
        const profileNameElement = document.getElementById("user-name");
        if (profileNameElement) {
            profileNameElement.innerText = userName;
        }
    }
});




