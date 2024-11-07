//Função para o menu ajuda
var helpElements = document.querySelectorAll(".questions")
    
helpElements.forEach(function(question) {
    question.addEventListener("click", function() {

        //se esta selecionda
        const answer = question.querySelector('.item-answer');
        
        //esconde
        if (answer.style.display === "block") {
            answer.style.display = "none";
        } else {
            //mostra
            answer.style.display = "block";
        }
    });
});
