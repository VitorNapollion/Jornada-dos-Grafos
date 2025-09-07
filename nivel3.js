// Lógica para a tela de introdução do Nível 3
function initNivel3Intro() {
    const introContainer = document.querySelector('.conteudo-nivel3-intro');
    if (!introContainer) return;
}

// Lógica para a tela de Caminho Mínimo
function initCaminhoMinimo() {
    // Esta tela é estática, então a lógica é mínima
    const pagina = document.querySelector('.conteudo-caminho-minimo');
    if (!pagina) return;
}

// Lógica para a tela de Critérios Diferentes
function initCriteriosDiferentes() {
    // Esta tela é estática, então a lógica é mínima
    const pagina = document.querySelector('.conteudo-criterios');
    if (!pagina) return;
}

// Lógica para a tela de Armadilhas Comuns
function initArmadilhasComuns() {
    // Esta tela é estática, então a lógica é mínima
    const pagina = document.querySelector('.armadilha-box');
    if (!pagina) return;
}

// Lógica para a tela de Como o computador escolhe?
function initNivel3Conteudo5() {
    const secao = document.querySelector('.container.conteudo');
    if (!secao) return;
}

// Lógica para o Quiz do Nível 3
function initQuizNivel3() {
    const questionBlocks = document.querySelectorAll('.question-block');
    let currentQuestionIndex = 0;

    const feedbackMessages = {
        correct: "Acertou! Excelente.",
        incorrect1: `Incorreto.
                    Pense em como os pontos estão ligados para formar um percurso.`,
        incorrect2: `Incorreto.
                    Lembre-se, caminho mínimo é o com menor custo, e não a aparência.`,
        incorrect3: `Incorreto.
                    O tempo está medido em minutos, não em passos ou quilômetros.`
    };

    if (!questionBlocks || questionBlocks.length === 0) return;

    function showQuestion(index) {
        questionBlocks.forEach((block, i) => {
            block.classList.add('hidden');
            if (i === index) {
                block.classList.remove('hidden');
                const feedback = block.querySelector('.feedback');
                if (feedback) {
                    feedback.textContent = '';
                    feedback.classList.remove('correct', 'incorrect');
                }
                const radioButtons = block.querySelectorAll('input[type="radio"]');
                radioButtons.forEach(radio => radio.checked = false);
            }
        });
    }

    function checkAnswer(event) {
        const selectedOption = event.target;
        const questionBlock = selectedOption.closest('.question-block');
        const feedbackElement = questionBlock.querySelector('.feedback');
        const correctAnswer = questionBlock.dataset.correct;

        const radioButtons = questionBlock.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => radio.disabled = true);
        
        if (selectedOption.value === correctAnswer) {
            feedbackElement.textContent = feedbackMessages.correct;
            feedbackElement.classList.remove('incorrect');
            feedbackElement.classList.add('correct');
            
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < questionBlocks.length) {
                    showQuestion(currentQuestionIndex);
                } else {
                    // Redireciona para a tela de parabéns do Nível 3
                    window.location.href = "nivel3-parabens.html";
                }
            }, 1000);
        } else {
            const incorrectHint = feedbackMessages[`incorrect${currentQuestionIndex + 1}`];
            feedbackElement.textContent = incorrectHint;
            feedbackElement.classList.remove('correct');
            feedbackElement.classList.add('incorrect');
            
            radioButtons.forEach(radio => radio.disabled = false);
            selectedOption.checked = false;
        }
    }

    const allRadioButtons = document.querySelectorAll('input[type="radio"]');
    allRadioButtons.forEach(radio => {
        radio.addEventListener('change', checkAnswer);
    });

    showQuestion(currentQuestionIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    
    if (document.querySelector('.conteudo-nivel3-intro')) {
        initNivel3Intro();
    }
    
    if (document.querySelector('.conteudo-caminho-minimo')) {
        initCaminhoMinimo();
    }
    
    if (document.querySelector('.armadilha-box')) {
        initArmadilhasComuns();
    }
    
    if (document.querySelector('.video-container')) {
        initNivel3Conteudo5();
    }

    if (document.querySelector('.quiz-container')) {
        initQuizNivel3();
    }
});
