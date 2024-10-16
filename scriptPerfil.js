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


    // nao funciona ainda
    localStorage.setItem('localBirthday', birthday);
    localStorage.setItem('localUsername', username); 
    localStorage.setItem('localEmail', email);
    localStorage.setItem('localPhone', phoneNumber);
    localStorage.setItem('localGender', gender);

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
    document.getElementById('user-name').innerText = name;
    document.getElementById('welcome-user-name').innerText = name;

    localStorage.setItem('localUser-name', name);
    localStorage.setItem('localWelcome-user-name', name);    
}

function updateProfileButtonEvent() {
    const updateButton = document.getElementById('edit-btn'); 
    updateButton.addEventListener('click', updateProfile);
}

document.addEventListener('DOMContentLoaded', updateProfileButtonEvent);

function loadFile(event) {
    const userImage = document.getElementById('user-image');
    const profilePic = document.getElementById('profile-pic');
    const userIcon = document.getElementById('user-icon');

    const fileSrc = event.target.result;

    userImage.src = fileSrc; // Define o 'src' do ícone de usuário e da foto de perfil com a mesma URL da imagem qeu foi carregada
    profilePic.src = fileSrc;

    userImage.style.display = 'block'; 
    profilePic.style.display = 'block';
    
    userIcon.style.display = 'none'; // Troca o ícone sem foto de perfil pela foto de perfil e oculta o ícone antigo

    localStorage.setItem('localUser-image', fileSrc);
    localStorage.setItem('localProfile-pic', fileSrc);
}

function updateImage(event) {
    const input = event.target;
    const file = input.files[0]; // Pega o primeiro arquivo selecionado

    if(file) {
        const reader = new FileReader();
        reader.onload = loadFile; // Cahama a função 'loadFile' quando o arquivo é lido

        reader.readAsDataURL(file);
    }
}

function keepUserProfileInfo() {
    const keepBirthday = localStorage.getItem('localBirthday');
    const keepUserNameProfile = localStorage.getItem('localUsername');
    const keepEmail = localStorage.getItem('localEmail');
    const keepPhone = localStorage.getItem('localPhone');
    const keepGender = localStorage.getItem('localGender');
   
    if (keepBirthday) 
        document.getElementById('birthday').value = keepBirthday;

    if (keepUserNameProfile) 
        document.getElementById('username').value = keepUserNameProfile;
    
    if (keepEmail) 
        document.getElementById('email').value = keepEmail;
    
    if (keepPhone) 
        document.getElementById('phone').value = keepPhone;
    
    if (keepGender) 
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

function keepUserPic() {
    const keepUserImageSideBar = localStorage.getItem('localUser-image');
    const keepProfilePicProfile = localStorage.getItem('localProfile-pic');

    if (keepUserImageSideBar) {
        const userImage = document.getElementById('user-image');
        const profilePic = document.getElementById('profile-pic');
        const userIcon = document.getElementById('user-icon');

        userImage.src = keepUserImageSideBar;
        profilePic.src = keepProfilePicProfile;

        userImage.style.display = 'block'; 
        profilePic.style.display = 'block';
        userIcon.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', keepUserProfileInfo);
document.addEventListener('DOMContentLoaded', keepUserNameInfo);
document.addEventListener('DOMContentLoaded', keepProfilePicProfile);