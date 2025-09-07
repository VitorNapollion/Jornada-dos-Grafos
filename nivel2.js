function conectar(el1, el2, aresta, container) {
    if (!el1 || !el2 || !aresta || !container) return;

    const p1 = el1.getBoundingClientRect();
    const p2 = el2.getBoundingClientRect();
    const rectContainer = container.getBoundingClientRect();

    const x1 = p1.left + p1.width / 2 - rectContainer.left;
    const y1 = p1.top + p1.height / 2 - rectContainer.top;
    const x2 = p2.left + p2.width / 2 - rectContainer.left;
    const y2 = p2.top + p2.height / 2 - rectContainer.top;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const comprimento = Math.sqrt(dx * dx + dy * dy);
    const angulo = Math.atan2(dy, dx) * 180 / Math.PI;

    aresta.style.width = comprimento + "px";
    aresta.style.left = x1 + "px";
    aresta.style.top = y1 + "px";
    aresta.style.transform = `rotate(${angulo}deg)`;
}

function initRevisaoGrafos() {
    const grafoRevisao = document.getElementById("grafo-revisao");
    if (!grafoRevisao) return;

    const vertices = document.querySelectorAll(".vertice-revisao");
    const arestas = document.querySelectorAll(".aresta-revisao");
    const proximoBotao = document.querySelector('.next-button');

    const conexoes = {
        'aresta-AB': ['vertice-A', 'vertice-B'],
        'aresta-BC': ['vertice-B', 'vertice-C'],
        'aresta-CD': ['vertice-C', 'vertice-D'],
        'aresta-DE': ['vertice-D', 'vertice-E'],
        'aresta-AE': ['vertice-A', 'vertice-E']
    };

    function atualizarGrafo() {
        for (const arestaId in conexoes) {
            const [vertice1Id, vertice2Id] = conexoes[arestaId];
            const vertice1 = document.getElementById(vertice1Id);
            const vertice2 = document.getElementById(vertice2Id);
            const aresta = document.getElementById(arestaId);
            if (vertice1 && vertice2 && aresta && grafoRevisao) {
                conectar(vertice1, vertice2, aresta, grafoRevisao);
            }
        }
    }

    vertices.forEach(vertice => {
        vertice.addEventListener('mouseover', () => {
            vertice.classList.add('destacado');
            for (const aresta of arestas) {
                const [v1, v2] = aresta.dataset.conexao.split('-');
                const verticeLabel = vertice.id.split('-')[1];
                if (v1 === verticeLabel || v2 === verticeLabel) {
                    aresta.classList.add('destacada');
                }
            }
        });
        vertice.addEventListener('mouseout', () => {
            vertice.classList.remove('destacado');
            arestas.forEach(aresta => aresta.classList.remove('destacada'));
        });
    });

    if (proximoBotao) {
        proximoBotao.style.display = 'block';
    }

    window.addEventListener('load', atualizarGrafo);
    window.addEventListener('resize', atualizarGrafo);
}

// Lógica para a atividade de prática de grau
function initPraticaGrau() {
    const grauSpan = document.getElementById("grauA");
    const mensagem = document.getElementById("mensagem");
    const btnProximo = document.getElementById("btnProximo");

    if (!grauSpan || !mensagem || !btnProximo) return;

    const vizinhos = ["B", "C", "D"];
    let grau = 0;

    vizinhos.forEach(v => {
        const node = document.getElementById("node" + v);
        const aresta = document.getElementById("edgeA" + v);

        node.addEventListener("click", () => {
            if (!node.classList.contains("selecionado")) {
                node.classList.add("selecionado");

                if (aresta) {
                    aresta.classList.remove("hidden");
                }

                grau++;
                grauSpan.textContent = grau;

                if (grau === vizinhos.length) {
                    mensagem.classList.remove("hidden");
                    btnProximo.classList.remove("hidden");
                }
            }
        });
    });

    // Garante que os elementos de feedback estejam ocultos no início
    mensagem.classList.add('hidden');
    btnProximo.classList.add('hidden');
    grauSpan.textContent = '0';
}

// Lógica para o grafo dirigido
function initGrafoDirigido() {
    const grafo = document.getElementById('grafo-dirigido');
    if (!grafo) return;

    const vertices = document.querySelectorAll('.vertice-dirigido');
    const arestas = document.querySelectorAll('.aresta-dirigida');
    const legenda = document.getElementById('legenda-grau-dirigido');
    const grauInSpan = legenda.querySelector('.grau-in');
    const grauOutSpan = legenda.querySelector('.grau-out');
    const proximoBotao = document.querySelector('.next-button');

    const conexoes = [
        { id: 'edgeAB', origem: 'A', destino: 'B' },
        { id: 'edgeBC', origem: 'B', destino: 'C' },
        { id: 'edgeCA', origem: 'C', destino: 'A' },
        { id: 'edgeCD', origem: 'C', destino: 'D' },
        { id: 'edgeDB', origem: 'D', destino: 'B' }
    ];

    vertices.forEach(vertice => {
        vertice.addEventListener('click', () => {
            vertices.forEach(v => v.classList.remove('clicado'));
            arestas.forEach(a => {
                a.classList.remove('in-degree', 'out-degree');
                a.removeAttribute('marker-end');
                a.style.stroke = '';
            });

            vertice.classList.add('clicado');
            const verticeId = vertice.dataset.label;
            
            let inDegree = 0;
            let outDegree = 0;

            conexoes.forEach(conexao => {
                const aresta = document.getElementById(conexao.id);
                if (conexao.destino === verticeId) {
                    aresta.classList.add('in-degree');
                    aresta.setAttribute('marker-end', 'url(#arrowhead-in)');
                    inDegree++;
                }
                if (conexao.origem === verticeId) {
                    aresta.classList.add('out-degree');
                    aresta.setAttribute('marker-end', 'url(#arrowhead-out)');
                    outDegree++;
                }
            });

           
            grauInSpan.textContent = inDegree;
            grauOutSpan.textContent = outDegree;
            legenda.style.display = 'block';

        
            if (proximoBotao) {
                proximoBotao.style.display = 'block';
            }
        });
    });
}

// Lógica para a atividade de Peso e Grau (nivel2-conteudo4)
function initPesoGrau() {
    const perguntaRapida = document.querySelector('.pergunta-rapida'); // Corrigido o seletor
    if (!perguntaRapida) {
        console.log("Elemento .pergunta-rapida não encontrado. initPesoGrau não será inicializado.");
        return;
    }

    const inputResposta = document.getElementById('resposta-grau');
    const btnChecar = document.getElementById('checar-resposta');
    const feedback = document.getElementById('feedback-grau');
    const proximoBotao = document.querySelector('.next-button');

    // Esconde o botão de próximo e o feedback no início
    if (proximoBotao) {
        proximoBotao.style.display = 'none';
    }
    if (feedback) {
        feedback.textContent = ''; // Limpa qualquer texto anterior
        feedback.classList.remove('correto', 'incorreto');
    }


    btnChecar.addEventListener('click', () => {
        const respostaUsuario = parseInt(inputResposta.value);
        const respostaCorreta = 2; // O grau do vértice A é 2

        if (feedback) { // Garante que o elemento feedback existe antes de tentar manipulá-lo
            if (respostaUsuario === respostaCorreta) {
                feedback.textContent = "Correto! O grau de um vértice é o número de conexões, não a força delas.";
                feedback.classList.remove('incorreto');
                feedback.classList.add('correto');
                if (proximoBotao) {
                    proximoBotao.style.display = 'block';
                }
            } else {
                feedback.textContent = "Incorreto. Lembre-se, o grau de um vértice é o número de conexões, não o valor delas.";
                feedback.classList.remove('correto');
                feedback.classList.add('incorreto');
                if (proximoBotao) { // Esconde o botão de próximo se a resposta estiver incorreta
                    proximoBotao.style.display = 'none';
                }
            }
        }
    });
}

// Lógica para a tela de Vértices Especiais
function initVerticesEspeciais() {
    // Verifique se a página é a correta
    const secao = document.querySelector('.vertice-especial-secao');
    if (!secao) return;
    

}

// Lógica para o Quiz do Nível 2
function initQuizNivel2() {
    const questionBlocks = document.querySelectorAll('.question-block');
    let currentQuestionIndex = 0;

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
        const correctFeedbackText = questionBlock.dataset.feedbackCorrect || "Correto!";

        const radioButtons = questionBlock.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => radio.disabled = true);

        if (selectedOption.value === correctAnswer) {
            feedbackElement.textContent = correctFeedbackText;
            feedbackElement.classList.remove('incorrect');
            feedbackElement.classList.add('correct');
            
            // Verifica se é a última pergunta antes de avançar
            if (currentQuestionIndex === questionBlocks.length - 1) {
                // Se for a última pergunta, redireciona para a tela de parabéns após 1 segundo
                setTimeout(() => {
                    window.location.href = "nivel2-parabens.html";
                }, 1000);
            } else {
                // Se não for a última, avança para a próxima pergunta após 1 segundo
                setTimeout(() => {
                    currentQuestionIndex++;
                    showQuestion(currentQuestionIndex);
                }, 1000);
            }
        } else {
            feedbackElement.textContent = "Incorreto. Tente novamente!";
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
    if (document.querySelector('.conteudo-nivel2-revisao')) {
        initRevisaoGrafos();
    }

    if (document.getElementById('grauA')) {
        initPraticaGrau();
    }

    if (document.getElementById('grafo-dirigido')) {
        initGrafoDirigido();
    }

    if (document.querySelector('.pergunta-rapida')) {
        initPesoGrau();
    }

    if (document.querySelector('.vertice-especial-secao')) {
        initVerticesEspeciais();
    }

    if (document.querySelector('.question-block')) {
        initQuizNivel2();
    }
});
