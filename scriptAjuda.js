var elementosDuvida = document.querySelectorAll(".duvida")

elementosDuvida.forEach(function(duvida) {
    duvida.addEventListener("click", function() {

        //se esta selecionda
        const resposta = duvida.querySelector('.resposta-item');
        
        //esconde
        if (resposta.style.display === "block") {
            resposta.style.display = "none";
        } else {
            //mostra
            resposta.style.display = "block";
        }
    });
});