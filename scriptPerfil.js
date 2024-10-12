function updateProfile() {
    const birthday = document.getElementById('birthday').value;
    const name = document.getElementById('username').value; // Assumindo que o nome possa ser uma string qualquer sem formato específico, não fiz validação
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phone').value;
    const gender = document.getElementById('gender').value;

    // Verificar se todos os campos estão preenchidos
    if (!name || !email || !phoneNumber || !birthday) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Validações de formato
    if (!validateEmailFormat(email)) {
        alert("Por favor, insira um e-mail válido no formato 'nome@exemplo.com'.");
        return;
    }

    if (!validatePhoneNumberFormat(phoneNumber)) {
        alert("Por favor, insira um número de telefone válido no formato '(xx) xxxxx-xxxx'.");
        return;
    }

    updateName(name);

    alert("Perfil atualizado com sucesso!");
}

// Validação do número de telefone e e-mail para verificar se estão dentro do padrão (conter apenas números e ser no formato correto de e-mail)
function validatePhoneNumberFormat(str) {
    const pattern = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/; // DDD + espaço opcional (\s?) + 4 a 5 números + - + 4 números
    return pattern.test(str);
}

function validateEmailFormat(str) {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(str);
}

function updateName(name) {
    document.getElementById('user-name').textContent = name;
    document.getElementById('welcome-user-name').innerText = name;
}

function updateProfileButtonEvent() {
    const updateButton = document.getElementById('edit-btn'); 
    updateButton.addEventListener('click', updateProfile);
}

document.addEventListener('DOMContentLoaded', updateProfileButtonEvent);

function handleFileLoad(event) {
    const userImage = document.getElementById('user-image');
    const profilePic = document.getElementById('profile-pic');
    const userIcon = document.getElementById('user-icon');

    userImage.src = event.target.result; // Define o 'src' do ícone de usuário e da foto de perfil com a mesma URL da imagem qeu foi carregada
    profilePic.src = event.target.result;

    userImage.style.display = 'block'; 
    profilePic.style.display = 'block';
    
    userIcon.style.display = 'none'; // Troca o ícone sem foto de perfil pela foto de perfil e oculta o ícone antigo
}

function updateImage(event) {
    const input = event.target;
    const file = input.files[0]; // Pega o primeiro arquivo selecionado

    if(file) {
        const reader = new FileReader();
        reader.onload = handleFileLoad; // Cahama a função 'handleFileLoad' quando o arquivo é lido

        reader.readAsDataURL(file);
    }
}
