// Funções para o modal "Sobre"
function abrirModal() {
  const modal = document.getElementById('modalSobre');
  modal.style.display = 'flex';
}

function fecharModal() {
  const modal = document.getElementById('modalSobre');
  modal.style.display = 'none';
}

// Função para conectar dois elementos com uma aresta dentro de um container
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
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    aresta.style.width = comprimento + "px";
    aresta.style.left = x1 + "px";
    aresta.style.top = y1 + "px";
    aresta.style.transform = `rotate(${angle}deg)`;
    aresta.classList.add("active");
}

// Lógica para o grafo interativo (Conteúdo 3)
function initGrafoInterativo() {
    const grafo = document.getElementById("grafo");
    if (!grafo) return;

    function atualizarArestasGrafo() {
        conectar(
            document.getElementById("vertice1"),
            document.getElementById("vertice2"),
            document.getElementById("aresta1-2"),
            grafo
        );
        conectar(
            document.getElementById("vertice2"),
            document.getElementById("vertice3"),
            document.getElementById("aresta2-3"),
            grafo
        );
    }

    document.querySelectorAll(".vertice").forEach(vertice => {
        vertice.addEventListener("click", () => {
            document.querySelectorAll(".vertice").forEach(v => v.classList.remove("highlighted"));
            vertice.classList.add("highlighted");
            atualizarArestasGrafo();
        });
    });

    window.addEventListener("load", atualizarArestasGrafo);
    window.addEventListener("resize", atualizarArestasGrafo);
    window.addEventListener("scroll", atualizarArestasGrafo);
}

// Lógica para os cards
function initCardsInterativos() {
    const cards = document.querySelectorAll(".card-interativo");
    if (cards.length === 0) return;

    const modal = document.getElementById("modal-ilustracao");
    const modalImg = document.getElementById("ilustracao-modal");
    const fecharModalBtn = document.querySelector(".fechar-modal");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const app = card.getAttribute("data-app");
            modalImg.src = `../imagens/${app}.gif`;
            modal.style.display = "block";
        });
    });
    fecharModalBtn.addEventListener("click", () => (modal.style.display = "none"));
    window.addEventListener("click", event => {
        if (event.target === modal) modal.style.display = "none";
    });
}


function initInfograficoAnimado() {
    const infografico = document.getElementById("infografico");
    if (!infografico) return;

    const btnAnimar = document.getElementById("iniciar-animacao");
    const nodes = document.querySelectorAll(".node");
    const edges = document.querySelectorAll(".edge");
    const explicacao = document.getElementById("explicacao");

    function startAnimation() {
        btnAnimar.disabled = true;
        btnAnimar.textContent = "Estamos construindo...";
        explicacao.style.opacity = 1;

        // Limpa o estilo de todas as arestas no início de cada animação
        edges.forEach(edge => edge.style.width = '0px');

        setTimeout(() => {
            explicacao.textContent = "Olá! Conheça a 🍎 Maçã!";
            document.getElementById("node1").classList.add("active");
        }, 1000);

        setTimeout(() => {
            explicacao.textContent = "A Maçã encontrou uma nova amiga, a 🍇 Uva!";
            document.getElementById("node2").classList.add("active");
        }, 3000);

        setTimeout(() => {
            explicacao.textContent = "Eles agora estão conectados! Que legal!";
            // Usando a função conectar global e passando o infográfico como container
            conectar(
                document.getElementById("node1"),
                document.getElementById("node2"),
                document.getElementById("edge1-2"),
                infografico
            );
        }, 5000);

        setTimeout(() => {
            explicacao.textContent = "Olha só, a 🍀 Sorte também chegou para brincar!";
            document.getElementById("node3").classList.add("active");
        }, 7500);

        setTimeout(() => {
            explicacao.textContent = "A Uva e a Sorte formaram uma dupla!";
            conectar(
                document.getElementById("node2"),
                document.getElementById("node3"),
                document.getElementById("edge2-3"),
                infografico
            );
        }, 9500);

        setTimeout(() => {
            explicacao.textContent = "E o 💖 Amor se junta à festa!";
            document.getElementById("node4").classList.add("active");
        }, 12000);

        setTimeout(() => {
            explicacao.textContent = "Agora a Sorte está conectada com o Amor!";
            conectar(
                document.getElementById("node3"),
                document.getElementById("node4"),
                document.getElementById("edge3-4"),
                infografico
            );
        }, 14000);

        setTimeout(() => {
            explicacao.textContent = "Quando juntamos tudo, temos uma rede de amigos, ou um grafo!";
            btnAnimar.textContent = "Conexões Mostradas";
            btnAnimar.disabled = false;
        }, 16000);
    }

    function resetAnimation() {
        nodes.forEach(node => node.classList.remove("active"));
        edges.forEach(edge => {
            edge.classList.remove("active");
            edge.style.width = "0px";
        });
        explicacao.textContent = "";
        explicacao.style.opacity = "0";
    }

    btnAnimar.addEventListener("click", () => {
        if (btnAnimar.textContent === "Conexões Mostradas") {
            resetAnimation();
            setTimeout(startAnimation, 500);
        } else {
            startAnimation();
        }
    });
}


function initConteudo4() {
    const quizContainer = document.getElementById("quiz-container");
    const proximoBotao = document.querySelector(".next-button");

    const quizData = {
        pergunta: "Qual tipo de grafo não tem setas nas suas conexões?",
        opcoes: ["Grafo Simples", "Grafo Dirigido", "Grafo Ponderado"],
        respostaCorreta: "Grafo Simples"
    };

    function mostrarQuiz() {
        if (!quizContainer) return;
        quizContainer.style.display = "block";
        const perguntaElemento = document.getElementById("pergunta-quiz");
        const opcoesElemento = document.getElementById("opcoes-quiz");
        perguntaElemento.textContent = quizData.pergunta;
        opcoesElemento.innerHTML = "";
        quizData.opcoes.forEach(opcao => {
            const botaoOpcao = document.createElement("button");
            botaoOpcao.textContent = opcao;
            botaoOpcao.classList.add("opcao");
            botaoOpcao.addEventListener("click", () => checarResposta(botaoOpcao, opcao));
            opcoesElemento.appendChild(botaoOpcao);
        });
    }

    function checarResposta(botao, respostaSelecionada) {
        const feedbackElemento = document.getElementById("feedback-quiz");
        const opcoes = document.querySelectorAll(".opcao");
        if (respostaSelecionada === quizData.respostaCorreta) {
            feedbackElemento.textContent = "Parabéns, resposta correta! 🎉";
            feedbackElemento.classList.add("correto");
            botao.style.backgroundColor = "#8BC34A";
            proximoBotao.style.display = "block";
            opcoes.forEach(opcao => (opcao.disabled = true));
        } else {
            feedbackElemento.textContent = "Ops, resposta incorreta. Tente novamente! 😕";
            feedbackElemento.classList.remove("correto");
            feedbackElemento.classList.add("incorreto");
            botao.style.backgroundColor = "#FF7043";
            opcoes.forEach(opcao => (opcao.disabled = false));
            setTimeout(() => {
                botao.style.backgroundColor = "";
            }, 500);
        }
    }
    window.onYouTubeIframeAPIReady = function() {
        const videoPlayer = new YT.Player("video-player", {
            events: {
                onStateChange: onPlayerStateChange
            }
        });
    };

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            mostrarQuiz();
        }
    }
}


function initQuizNivel1() {
    const quizContainer = document.getElementById("quiz-container");
    if (!quizContainer) return;

    const perguntaElemento = document.getElementById("pergunta");
    const opcoesElemento = document.getElementById("opcoes");
    const feedbackElemento = document.getElementById("feedback");

    let perguntaAtual = 0;
    const perguntas = [
        {
            pergunta: "O que é um vértice em um grafo?",
            opcoes: ["Uma linha", "Um ponto", "Uma cor"],
            resposta: "Um ponto"
        },
        {
            pergunta: "As ligações entre vértices se chamam:",
            opcoes: ["Nós", "Círculos", "Arestas"],
            resposta: "Arestas"
        },
        {
            pergunta: "Marque um exemplo de grafo no dia a dia:",
            opcoes: ["Um livro", "Um mapa de cidades", "Um lápis"],
            resposta: "Um mapa de cidades"
        }
    ];

    function carregarPergunta() {
        if (perguntaAtual < perguntas.length) {
            const quiz = perguntas[perguntaAtual];
            perguntaElemento.textContent = quiz.pergunta;
            opcoesElemento.innerHTML = "";
            feedbackElemento.textContent = "";

            quiz.opcoes.forEach(opcao => {
                const botaoOpcao = document.createElement("button");
                botaoOpcao.textContent = opcao;
                botaoOpcao.classList.add("opcao");
                botaoOpcao.addEventListener("click", () => checarResposta(botaoOpcao, opcao));
                opcoesElemento.appendChild(botaoOpcao);
            });
        } else {
            // Redireciona para a nova tela de parabéns
            window.location.href = "nivel1-parabens.html";
        }
    }

    function checarResposta(botao, respostaSelecionada) {
        const quiz = perguntas[perguntaAtual];
        if (respostaSelecionada === quiz.resposta) {
            feedbackElemento.textContent = "Correto! Avance para a próxima pergunta.";
            feedbackElemento.classList.remove("incorreto");
            feedbackElemento.classList.add("correto");
            document.querySelectorAll(".opcao").forEach(btn => (btn.disabled = true));
            botao.classList.add("correta-destaque");

            setTimeout(() => {
                perguntaAtual++;
                carregarPergunta();
            }, 1500);
        } else {
            feedbackElemento.textContent = "Ops, resposta incorreta. Tente novamente! 😕";
            feedbackElemento.classList.remove("correto");
            feedbackElemento.classList.add("incorreto");
            botao.style.backgroundColor = "#FF7043";
            document.querySelectorAll(".opcao").forEach(opcao => (opcao.disabled = false));
            setTimeout(() => {
                botao.style.backgroundColor = "";
            }, 500);
        }
    }
    carregarPergunta();
}


// Carrega a API do YouTube
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Executa a lógica da página correta
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("infografico")) {
        initInfograficoAnimado();
    } else if (document.getElementById("quiz-container")) {
        if (document.querySelector(".video-container")) {
            initConteudo4();
        } else {
            initQuizNivel1();
        }
    } else if (document.getElementById("grafo")) {
        initGrafoInterativo();
    } else if (document.querySelector(".card-interativo")) {
        initCardsInterativos();
    }
});