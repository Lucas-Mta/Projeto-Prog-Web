//Função para o menu ajuda
var elementosDuvida = document.querySelectorAll(".questions")
    
elementosDuvida.forEach(function(duvida) {
    duvida.addEventListener("click", function() {

        //se esta selecionda
        const resposta = duvida.querySelector('.item-answer');
        
        //esconde
        if (resposta.style.display === "block") {
            resposta.style.display = "none";
        } else {
            //mostra
            resposta.style.display = "block";
        }
    });
});
