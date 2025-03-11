var titreElement = document.getElementById("titre");
var chaineRecuperee = titreElement.innerText;
var autreVariable = prompt("Introduit ton nom.");

var fusion = "Jouons à un jeu, " + autreVariable + ".";
checkName(autreVariable);

function checkName(nom) {
    nom = autreVariable;
    if (nom === "Lana") {
        fusion = "Amusons nous, Lana.";
        titreElement.innerHTML = fusion;
    } else if (nom === "Lina") {
        alert("Vous n'êtes pas la bienvenue!");
        window.close();
    } else {
        titreElement.innerHTML = fusion;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const choices = ['🪨', '📄', '✂️'];
    const buttons = document.querySelectorAll('.choices button');
    const userChoiceDisplay = document.getElementById('user-choice');
    const computerChoiceDisplay = document.getElementById('computer-choice');
    const winnerDisplay = document.getElementById('winner');
    const userScoreDisplay = document.getElementById('user-score');
    const computerScoreDisplay = document.getElementById('computer-score');
    let userScore = 0;
    let computerScore = 0;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const userChoice = button.textContent;
            userChoiceDisplay.textContent = `Votre choix: ${userChoice}`;
            disableButtons();
            startCarousel(userChoice);
        });
    });

    function startCarousel(userChoice) {
        const computerChoiceDisplay = document.getElementById('computer-choice');
        let index = 0;
        const interval = setInterval(() => {
            computerChoiceDisplay.textContent = `Choix de l'ordinateur: ${choices[index]}`;
            index = (index + 1) % choices.length;
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
            computerChoiceDisplay.textContent = `Choix de l'ordinateur: ${computerChoice}`;
            const winner = determineWinner(userChoice, computerChoice);
            winnerDisplay.textContent = `Résultat: ${winner}`;

            if (winner === 'Vous avez gagné!') {
                userScore++;
                flashElement(userScoreDisplay, 'green');
                winnerDisplay.style.color = 'green';
            } else if (winner === 'Vous avez perdu!') {
                computerScore++;
                flashElement(computerScoreDisplay, 'red');
                winnerDisplay.style.color = 'red';
            } else {
                winnerDisplay.style.color = 'black';
            }

            userScoreDisplay.textContent = `Votre score: ${userScore}`;
            computerScoreDisplay.textContent = `Score de l'ordinateur: ${computerScore}`;

            if (userScore === 10 || computerScore === 10) {
                alert(userScore === 10 ? 'Félicitations! Vous avez gagné le jeu!' : 'Dommage! L\'ordinateur a gagné le jeu!');
                userScore = 0;
                computerScore = 0;
                userScoreDisplay.textContent = `Votre score: ${userScore}`;
                computerScoreDisplay.textContent = `Score de l'ordinateur: ${computerScore}`;
            }

            enableButtons();
        }, 2000);
    }

    function determineWinner(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return 'Égalité';
        } else if (
            (userChoice === '🪨' && computerChoice === '✂️') ||
            (userChoice === '📄' && computerChoice === '🪨') ||
            (userChoice === '✂️' && computerChoice === '📄')
        ) {
            return 'Vous avez gagné!';
        } else {
            return 'Vous avez perdu!';
        }
    }

    function flashElement(element, color) {
        element.style.transition = 'color 0.5s ease';
        const originalColor = element.style.color;
        element.style.color = color;
        setTimeout(() => {
            element.style.color = originalColor;
        }, 500);
    }

    function disableButtons() {
        buttons.forEach(button => {
            button.disabled = true;
        });
    }

    function enableButtons() {
        buttons.forEach(button => {
            button.disabled = false;
        });
    }
});