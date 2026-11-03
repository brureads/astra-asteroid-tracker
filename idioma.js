
/* ==========================================
   ASTRA — SISTEMA BILÍNGUE
   Português (PT-BR) / English (EN)
========================================== */

// Traduções da interface
const traducoes = {
    "Início": "Home",
    "Asteroides": "Asteroids",
    "Galeria": "Gallery",

    "Explore asteroides próximos da Terra com dados da NASA.":
        "Explore near-Earth asteroids with NASA data.",

    "Asteroides próximos da Terra":
        "Near-Earth Asteroids",

    "Descubra quais asteroides estão passando pela nossa vizinhança espacial.":
        "Discover asteroids passing through our cosmic neighborhood.",

    "Explorar asteroides": "Explore Asteroids",
    "Consultando NASA...": "Contacting NASA...",
    "Estabelecendo conexão com a NASA...":
        "Connecting to NASA...",

    "Visão geral da missão": "Mission Overview",
    "Asteroides encontrados": "Asteroids Found",
    "Potencialmente perigosos": "Potentially Hazardous",
    "Maior velocidade": "Highest Speed",
    "Menor distância da Terra": "Closest Approach",

    "Objetos monitorados": "Monitored Objects",
    "Todos": "All",

    "Diâmetro estimado": "Estimated Diameter",
    "Velocidade": "Velocity",
    "Distância da Terra": "Distance from Earth",
    "Data da aproximação": "Close Approach Date",

    "Potencialmente perigoso": "Potentially Hazardous",
    "Não classificado como perigoso":
        "Not Classified as Hazardous",

    "Explore o universo": "Explore the Universe",

    "Uma coleção de fotografias do cosmos, diretamente da biblioteca da NASA.":
        "A collection of cosmic photographs from NASA's image library.",

    "Galáxias": "Galaxies",
    "Nebulosas": "Nebulae",

    "AMPLIAR +": "ENLARGE +",

    "Consultando arquivo fotográfico da NASA...":
        "Searching NASA's photo archive...",

    "Nenhuma fotografia encontrada.":
        "No photographs found.",

    "Não foi possível carregar as imagens da NASA.":
        "Unable to load NASA images.",

    "Ver no acervo da NASA ↗":
        "View in NASA Archive ↗",

    "VISUALIZAR NA NASA ↗":
        "VIEW ON NASA ↗",

    "Descrição não disponível no acervo.":
        "Description unavailable in the archive.",

    "Fonte: NASA Image and Video Library":
        "Source: NASA Image and Video Library",

    "Desenvolvido por": "Developed by",

    "Indisponível": "Unavailable",
    "Sem título": "Untitled",

    "Nenhum asteroide encontrado neste filtro.":
        "No asteroids match this filter.",

    "Nenhum asteroide encontrado para este período.":
        "No asteroids found for this period."
};

// Textos originais ficam armazenados
const textosOriginais = new WeakMap();

// Idioma inicial
let idiomaAtual = "pt";

try {
    const idiomaSalvo = localStorage.getItem("astra-idioma");

    if (idiomaSalvo === "en") {
        idiomaAtual = "en";
    }
} catch (erro) {
    console.warn("Preferência de idioma não disponível.");
}

// Remove espaços extras para comparar textos
function normalizarTexto(texto) {
    return texto.replace(/\s+/g, " ").trim();
}

// Tradução dos textos dinâmicos
function traduzirDinamico(texto, idioma) {
    if (idioma === "pt") {
        return texto;
    }

    // Quantidade de asteroides
    const quantidade = texto.match(
        /^(\d+) asteroides encontrados$/i
    );

    if (quantidade) {
        return `${quantidade[1]} asteroids found`;
    }

    // Intervalo consultado
    const periodo = texto.match(
        /^PERÍODO ANALISADO:\s*(.+)$/i
    );

    if (periodo) {
        return `OBSERVATION PERIOD: ${periodo[1]}`;
    }

    // Créditos fotográficos
    const fotografia = texto.match(
        /^Fotografia:\s*(.+)$/i
    );

    if (fotografia) {
        return `Photography: ${fotografia[1]}`;
    }

    // Erros HTTP
    const erroHTTP = texto.match(
        /^Erro na consulta à NASA: HTTP (\d+)$/i
    );

    if (erroHTTP) {
        return `NASA request failed: HTTP ${erroHTTP[1]}`;
    }

    return texto;
}

// Traduz um texto individual
function traduzir(texto, idioma) {
    const textoNormalizado = normalizarTexto(texto);

    if (idioma === "pt") {
        return texto;
    }

    // Traduções diretas
    if (traducoes[textoNormalizado]) {
        return traducoes[textoNormalizado];
    }

    // Textos que mudam conforme os dados da NASA
    return traduzirDinamico(textoNormalizado, idioma);
}

// Traduz os nós de texto da página
function atualizarTextos() {
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
    );

    let no;

    while ((no = walker.nextNode())) {
        const pai = no.parentElement;

        if (!pai) continue;

        // Não traduz código nem estilos
        if (["SCRIPT", "STYLE"].includes(pai.tagName)) {
            continue;
        }

        if (!no.nodeValue.trim()) {
            continue;
        }

        // Guarda o texto original uma única vez
        if (!textosOriginais.has(no)) {
            textosOriginais.set(no, no.nodeValue);
        }

        const original = textosOriginais.get(no);

        // Preserva a indentação do HTML
        const espacoInicial = original.match(/^\s*/)[0];
        const espacoFinal = original.match(/\s*$/)[0];

        const novoTexto = traduzir(original, idiomaAtual);

        if (idiomaAtual === "pt") {
            no.nodeValue = original;
        } else {
            no.nodeValue =
                espacoInicial + novoTexto + espacoFinal;
        }
    }

    // Textos acessíveis dos botões e imagens
    document.querySelectorAll(
        ".galeria-foto-botao[aria-label]"
    ).forEach(botao => {
        const original = botao.dataset.ariaOriginal ||
            botao.getAttribute("aria-label");

        botao.dataset.ariaOriginal = original;

        if (idiomaAtual === "en") {
            botao.setAttribute(
                "aria-label",
                original.replace(
                    /^Ampliar fotografia:/,
                    "Enlarge photograph:"
                )
            );
        } else {
            botao.setAttribute("aria-label", original);
        }
    });
}

// Mostra o botão selecionado
function atualizarBotoes() {
    const botoes = document.querySelectorAll(
        ".idioma-botao"
    );

    botoes.forEach(botao => {
        const ativo = botao.dataset.idioma === idiomaAtual;

        botao.classList.toggle("ativo", ativo);

        botao.setAttribute(
            "aria-pressed",
            String(ativo)
        );
    });
}

// Troca o idioma do site
function mudarIdioma(novoIdioma) {
    if (novoIdioma !== "pt" && novoIdioma !== "en") {
        return;
    }

    idiomaAtual = novoIdioma;

    document.documentElement.lang =
        idiomaAtual === "pt" ? "pt-BR" : "en";

    try {
        localStorage.setItem("astra-idioma", idiomaAtual);
    } catch (erro) {
        console.warn("Não foi possível salvar o idioma.");
    }

    atualizarTextos();
    atualizarBotoes();
}

// Conecta os botões existentes
function configurarBotoesIdioma() {
    const botoes = document.querySelectorAll(
        ".idioma-botao"
    );

    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            mudarIdioma(botao.dataset.idioma);
        });
    });
}

// Detecta novos elementos vindos das APIs
const observadorIdioma = new MutationObserver(
    (alteracoes) => {
        const adicionouElementos = alteracoes.some(
            alteracao => alteracao.addedNodes.length > 0
        );

        if (adicionouElementos) {
            atualizarTextos();
        }
    }
);

// Inicialização
configurarBotoesIdioma();
mudarIdioma(idiomaAtual);

// Observa cartões e fotografias carregados
observadorIdioma.observe(document.body, {
    childList: true,
    subtree: true
});

console.log("ASTRA: sistema de idiomas iniciado.");
