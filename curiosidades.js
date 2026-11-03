
/* =====================================
   ASTRA — CURIOSIDADES CÓSMICAS
   Missão 11
===================================== */

const curiosidades = [
    {
        icone: "☄",
        categoria: {
            pt: "ASTEROIDES",
            en: "ASTEROIDS"
        },
        titulo: {
            pt: "Asteroides podem ter luas?",
            en: "Can asteroids have moons?"
        },
        descricao: {
            pt: "Sim! Mais de 150 asteroides possuem pequenas luas conhecidas. Alguns têm até duas, e também existem sistemas de asteroides duplos e triplos.",
            en: "Yes! More than 150 asteroids have known small moons. Some even have two, and binary and triple asteroid systems also exist."
        },
        fonte: "https://science.nasa.gov/solar-system/asteroids/facts/"
    },
    {
        icone: "◎",
        categoria: {
            pt: "SISTEMA SOLAR",
            en: "SOLAR SYSTEM"
        },
        titulo: {
            pt: "Onde ficam a maioria dos asteroides?",
            en: "Where are most asteroids found?"
        },
        descricao: {
            pt: "A maioria dos asteroides conhecidos orbita o Sol no cinturão principal, localizado entre Marte e Júpiter.",
            en: "Most known asteroids orbit the Sun in the main asteroid belt, located between Mars and Jupiter."
        },
        fonte: "https://science.nasa.gov/solar-system/asteroids/facts/"
    },
    {
        icone: "◇",
        categoria: {
            pt: "ASTEROIDES",
            en: "ASTEROIDS"
        },
        titulo: {
            pt: "Os asteroides são muito antigos?",
            en: "Are asteroids very old?"
        },
        descricao: {
            pt: "Sim! Eles são remanescentes da formação do Sistema Solar, ocorrida há aproximadamente 4,6 bilhões de anos.",
            en: "Yes! They are remnants from the formation of the Solar System, approximately 4.6 billion years ago."
        },
        fonte: "https://science.nasa.gov/solar-system/asteroids/facts/"
    },
    {
        icone: "△",
        categoria: {
            pt: "DEFESA PLANETÁRIA",
            en: "PLANETARY DEFENSE"
        },
        titulo: {
            pt: "Potencialmente perigoso significa colisão?",
            en: "Does potentially hazardous mean impact?"
        },
        descricao: {
            pt: "Não! Essa classificação considera características da órbita e do tamanho do objeto. Ela não significa que exista uma colisão prevista com a Terra.",
            en: "No! This classification considers an object's orbit and size. It does not mean a collision with Earth is predicted."
        },
        fonte: "https://cneos.jpl.nasa.gov/faq/new.html"
    },
    {
        icone: "✦",
        categoria: {
            pt: "FENÔMENOS",
            en: "PHENOMENA"
        },
        titulo: {
            pt: "O que é uma estrela cadente?",
            en: "What is a shooting star?"
        },
        descricao: {
            pt: "Apesar do nome, não é uma estrela! É o fenômeno luminoso produzido quando um meteoroide atravessa a atmosfera terrestre.",
            en: "Despite its name, it is not a star! It is the luminous phenomenon produced when a meteoroid passes through Earth's atmosphere."
        },
        fonte: "https://www.jpl.nasa.gov/keeping-an-eye-on-space-rocks/"
    },
    {
        icone: "◈",
        categoria: {
            pt: "ASTEROIDES",
            en: "ASTEROIDS"
        },
        titulo: {
            pt: "Júpiter pode mudar a rota de um asteroide?",
            en: "Can Jupiter change an asteroid's path?"
        },
        descricao: {
            pt: "Sim! A enorme gravidade de Júpiter pode alterar a órbita de asteroides e até desviá-los do cinturão principal.",
            en: "Yes! Jupiter's enormous gravity can change asteroid orbits and even send them out of the main asteroid belt."
        },
        fonte: "https://science.nasa.gov/solar-system/asteroids/facts/"
    }
];

const gradeCuriosidades = document.getElementById(
    "curiosidades-grid"
);

const botaoSurpresa = document.getElementById(
    "curiosidade-aleatoria"
);

let ultimoSorteio = -1;

// Retorna o idioma selecionado no ASTRA
function idiomaCuriosidades() {
    return document.documentElement.lang === "en"
        ? "en"
        : "pt";
}

// Cria elementos com segurança
function criarElementoCuriosidade(tag, classe, texto) {
    const elemento = document.createElement(tag);

    if (classe) {
        elemento.className = classe;
    }

    if (texto !== undefined) {
        elemento.textContent = texto;
    }

    return elemento;
}

// Constrói um cartão
function criarCardCuriosidade(curiosidade, indice) {
    const idioma = idiomaCuriosidades();

    const card = criarElementoCuriosidade(
        "article",
        "curiosidade-card"
    );

    card.id = `curiosidade-${indice}`;

    const icone = criarElementoCuriosidade(
        "span",
        "curiosidade-icone",
        curiosidade.icone
    );

    const categoria = criarElementoCuriosidade(
        "span",
        "curiosidade-categoria",
        curiosidade.categoria[idioma]
    );

    const titulo = criarElementoCuriosidade(
        "h3",
        "",
        curiosidade.titulo[idioma]
    );

    const detalhes = document.createElement("details");
    detalhes.className = "curiosidade-detalhes";

    const resumo = criarElementoCuriosidade(
        "summary",
        "",
        idioma === "pt"
            ? "Revelar curiosidade +"
            : "Reveal fact +"
    );

    const descricao = criarElementoCuriosidade(
        "p",
        "curiosidade-descricao",
        curiosidade.descricao[idioma]
    );

    const fonte = criarElementoCuriosidade(
        "a",
        "curiosidade-fonte",
        idioma === "pt"
            ? "Fonte: NASA ↗"
            : "Source: NASA ↗"
    );

    fonte.href = curiosidade.fonte;
    fonte.target = "_blank";
    fonte.rel = "noopener noreferrer";

    detalhes.append(resumo, descricao, fonte);
    card.append(icone, categoria, titulo, detalhes);

    return card;
}

// Renderiza todas as curiosidades
function renderizarCuriosidades() {
    if (!gradeCuriosidades) return;

    // Preserva os cartões que estavam abertos
    const abertos = new Set(
        [...gradeCuriosidades.querySelectorAll(
            ".curiosidade-detalhes[open]"
        )].map(detalhes => detalhes.closest(
            ".curiosidade-card"
        ).id)
    );

    gradeCuriosidades.replaceChildren();

    curiosidades.forEach((curiosidade, indice) => {
        const card = criarCardCuriosidade(
            curiosidade,
            indice
        );

        if (abertos.has(card.id)) {
            card.querySelector("details").open = true;
        }

        gradeCuriosidades.appendChild(card);
    });
}

// Atualiza os títulos fixos
function atualizarInterfaceCuriosidades() {
    const idioma = idiomaCuriosidades();

    document.getElementById(
        "link-curiosidades"
    ).textContent = idioma === "pt"
        ? "Curiosidades"
        : "Fun Facts";

    document.getElementById(
        "curiosidades-titulo"
    ).textContent = idioma === "pt"
        ? "Curiosidades cósmicas"
        : "Cosmic Curiosities";

    document.getElementById(
        "curiosidades-subtitulo"
    ).textContent = idioma === "pt"
        ? "Descubra os segredos do universo, uma curiosidade de cada vez."
        : "Discover the secrets of the universe, one fact at a time.";

    botaoSurpresa.textContent = idioma === "pt"
        ? "✦ Me surpreenda!"
        : "✦ Surprise me!";

    renderizarCuriosidades();
}

// Sorteia uma curiosidade
function surpreender() {
    let indice;

    do {
        indice = Math.floor(
            Math.random() * curiosidades.length
        );
    } while (
        indice === ultimoSorteio &&
        curiosidades.length > 1
    );

    ultimoSorteio = indice;

    // Fecha outros cartões
    document.querySelectorAll(
        ".curiosidade-detalhes"
    ).forEach(detalhes => {
        detalhes.open = false;
    });

    const card = document.getElementById(
        `curiosidade-${indice}`
    );

    const detalhes = card.querySelector("details");
    detalhes.open = true;

    card.scrollIntoView({
        behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches ? "instant" : "smooth",
        block: "center"
    });

    detalhes.querySelector("summary").focus();
}

// Eventos
if (gradeCuriosidades && botaoSurpresa) {
    botaoSurpresa.addEventListener(
        "click",
        surpreender
    );

    // Atualiza os cartões quando PT/EN muda
    const observarIdiomaCuriosidades =
        new MutationObserver(() => {
            atualizarInterfaceCuriosidades();
        });

    observarIdiomaCuriosidades.observe(
        document.documentElement,
        {
            attributes: true,
            attributeFilter: ["lang"]
        }
    );

    atualizarInterfaceCuriosidades();
}
