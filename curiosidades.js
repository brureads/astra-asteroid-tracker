
/* =====================================
   ASTRA — COSMIC DISCOVERIES
   Biblioteca de curiosidades PT / EN
===================================== */

(() => {
    const fatos = [
        {
            categoria: "asteroides",
            icone: "☄",
            pt: ["Asteroides podem ter luas?",
                "Sim! Alguns asteroides têm pequenos satélites naturais. Existem até sistemas com mais de dois corpos."],
            en: ["Can asteroids have moons?",
                "Yes! Some asteroids have small natural satellites. Systems with more than two bodies also exist."],
            fonte: "https://science.nasa.gov/solar-system/asteroids/facts/"
        },
        {
            categoria: "asteroides",
            icone: "◇",
            pt: ["Asteroides são fósseis espaciais?",
                "De certa forma, sim! São remanescentes da formação do Sistema Solar, há cerca de 4,6 bilhões de anos."],
            en: ["Are asteroids space fossils?",
                "In a way, yes! They are remnants of the Solar System's formation about 4.6 billion years ago."],
            fonte: "https://science.nasa.gov/solar-system/asteroids/facts/"
        },
        {
            categoria: "asteroides",
            icone: "◎",
            pt: ["Onde fica o cinturão de asteroides?",
                "O cinturão principal fica entre as órbitas de Marte e Júpiter e abriga muitos asteroides conhecidos."],
            en: ["Where is the asteroid belt?",
                "The main asteroid belt lies between Mars and Jupiter and contains many known asteroids."],
            fonte: "https://spaceplace.nasa.gov/asteroid/en/"
        },
        {
            categoria: "asteroides",
            icone: "△",
            pt: ["Perigoso significa colisão?",
                "Não! A classificação potencialmente perigoso não significa que exista uma colisão prevista com a Terra."],
            en: ["Does hazardous mean impact?",
                "No! A potentially hazardous classification does not mean an Earth impact is predicted."],
            fonte: "https://cneos.jpl.nasa.gov/faq/new.html"
        },
        {
            categoria: "asteroides",
            icone: "✦",
            pt: ["Estrelas cadentes são estrelas?",
                "Não! O brilho é produzido quando um meteoroide atravessa a atmosfera terrestre."],
            en: ["Are shooting stars actual stars?",
                "No! The glow is produced when a meteoroid travels through Earth's atmosphere."],
            fonte: "https://science.nasa.gov/solar-system/meteors-meteorites/"
        },
        {
            categoria: "asteroides",
            icone: "◈",
            pt: ["Júpiter influencia os asteroides?",
                "Sim! Sua gravidade pode alterar as órbitas de asteroides, inclusive dentro do cinturão principal."],
            en: ["Does Jupiter influence asteroids?",
                "Yes! Its gravity can change asteroid orbits, including those within the main belt."],
            fonte: "https://science.nasa.gov/solar-system/asteroids/facts/"
        },
        {
            categoria: "planetas",
            icone: "♀",
            pt: ["Um dia em Vênus dura mais que um ano?",
                "Sim! Uma rotação de Vênus leva cerca de 243 dias terrestres, enquanto sua órbita ao redor do Sol dura aproximadamente 225."],
            en: ["Is a Venus day longer than its year?",
                "Yes! One Venus rotation takes about 243 Earth days, while its orbit around the Sun takes about 225."],
            fonte: "https://science.nasa.gov/venus/venus-facts/"
        },
        {
            categoria: "planetas",
            icone: "♄",
            pt: ["Urano gira de lado?",
                "Praticamente! Seu eixo de rotação é inclinado quase 90 graus em relação ao plano de sua órbita."],
            en: ["Does Uranus spin sideways?",
                "Almost! Its rotational axis is tilted nearly 90 degrees relative to its orbital plane."],
            fonte: "https://science.nasa.gov/uranus/facts/"
        },
        {
            categoria: "planetas",
            icone: "◉",
            pt: ["Mercúrio e Vênus têm luas?",
                "Não! São os únicos dois planetas do Sistema Solar sem luas naturais reconhecidas."],
            en: ["Do Mercury and Venus have moons?",
                "No! They are the only two planets in the Solar System without recognized natural moons."],
            fonte: "https://science.nasa.gov/solar-system/solar-system-facts/"
        },
        {
            categoria: "planetas",
            icone: "♆",
            pt: ["Quanto dura um ano em Netuno?",
                "Netuno leva aproximadamente 165 anos terrestres para completar uma volta ao redor do Sol."],
            en: ["How long is a year on Neptune?",
                "Neptune takes approximately 165 Earth years to complete one orbit around the Sun."],
            fonte: "https://spaceplace.nasa.gov/years-on-other-planets/en/"
        },
        {
            categoria: "galaxias",
            icone: "✧",
            pt: ["Nossa galáxia é espiral?",
                "Sim! A Via Láctea é uma galáxia espiral barrada, com uma estrutura central alongada de estrelas."],
            en: ["Is our galaxy a spiral?",
                "Yes! The Milky Way is a barred spiral galaxy, with an elongated central structure of stars."],
            fonte: "https://science.nasa.gov/solar-system/solar-system-facts/"
        },
        {
            categoria: "galaxias",
            icone: "✺",
            pt: ["O Sol gira ao redor da galáxia?",
                "Sim! O Sistema Solar leva aproximadamente 230 milhões de anos para completar uma órbita ao redor do centro da Via Láctea."],
            en: ["Does the Sun orbit the galaxy?",
                "Yes! The Solar System takes about 230 million years to orbit the center of the Milky Way."],
            fonte: "https://science.nasa.gov/solar-system/solar-system-facts/"
        },
        {
            categoria: "estrelas",
            icone: "☼",
            pt: ["O Sol é uma estrela?",
                "Sim! Ele é a estrela central do nosso Sistema Solar, responsável por fornecer luz e energia à Terra."],
            en: ["Is the Sun a star?",
                "Yes! It is the central star of our Solar System, providing Earth with light and energy."],
            fonte: "https://science.nasa.gov/sun/facts/"
        },
        {
            categoria: "estrelas",
            icone: "✧",
            pt: ["O que é uma supernova?",
                "É uma explosão estelar extremamente energética que pode ocorrer em diferentes etapas finais da evolução de estrelas."],
            en: ["What is a supernova?",
                "It is an extremely energetic stellar explosion that can occur during different final stages of stellar evolution."],
            fonte: "https://science.nasa.gov/universe/stars/"
        },
        {
            categoria: "galaxias",
            icone: "◎",
            pt: ["Onde estamos na Via Láctea?",
                "Nosso Sistema Solar fica numa região conhecida como Braço de Órion, entre os braços de Sagitário e Perseu."],
            en: ["Where are we in the Milky Way?",
                "Our Solar System lies in a region called the Orion Spur, between the Sagittarius and Perseus arms."],
            fonte: "https://science.nasa.gov/solar-system/solar-system-facts/"
        }
    ];

    const grade = document.getElementById("curiosidades-grid");
    const surpresa = document.getElementById("curiosidade-aleatoria");

    if (!grade || !surpresa) return;

    const categorias = ["todos", "asteroides", "planetas", "estrelas", "galaxias"];

    const idiomas = {
        pt: {
            titulo: "Curiosidades cósmicas",
            descricao: "Descubra os segredos do universo, uma curiosidade de cada vez.",
            menu: "Curiosidades",
            etiqueta: "ASTRA / DESCOBERTAS CÓSMICAS",
            surpresa: "✦ Me surpreenda!",
            mais: "Carregar mais descobertas +",
            revelar: "Revelar curiosidade +",
            fonte: "Fonte: NASA ↗",
            mostrando: "Exibindo",
            de: "de",
            fatos: "curiosidades",
            categorias: ["Todos", "Asteroides", "Planetas", "Estrelas", "Galáxias"]
        },
        en: {
            titulo: "Cosmic Curiosities",
            descricao: "Discover the secrets of the universe, one fact at a time.",
            menu: "Fun Facts",
            etiqueta: "ASTRA / COSMIC DISCOVERIES",
            surpresa: "✦ Surprise me!",
            mais: "Load more discoveries +",
            revelar: "Reveal fact +",
            fonte: "Source: NASA ↗",
            mostrando: "Showing",
            de: "of",
            fatos: "facts",
            categorias: ["All", "Asteroids", "Planets", "Stars", "Galaxies"]
        }
    };

    let categoriaAtual = "todos";
    let quantidadeVisivel = 6;
    let ultimoSorteio = -1;
    const abertos = new Set();

    const controles = document.createElement("div");
    controles.className = "curiosidades-filtros";

    const contador = document.createElement("p");
    contador.className = "curiosidades-contador";

    const botaoMais = document.createElement("button");
    botaoMais.id = "curiosidades-carregar-mais";
    botaoMais.type = "button";

    const areaMais = document.createElement("div");
    areaMais.className = "curiosidades-rodape";

    areaMais.append(contador, botaoMais);

    grade.before(controles);
    grade.after(areaMais);

    function idioma() {
        return document.documentElement.lang === "en" ? "en" : "pt";
    }

    function textos() {
        return idiomas[idioma()];
    }

    function criar(tag, classe, texto) {
        const el = document.createElement(tag);
        if (classe) el.className = classe;
        if (texto !== undefined) el.textContent = texto;
        return el;
    }

    function listaFiltrada() {
        return fatos.map((fato, indice) => ({ fato, indice }))
            .filter(item =>
                categoriaAtual === "todos" ||
                item.fato.categoria === categoriaAtual
            );
    }

    function criarCard(item) {
        const { fato, indice } = item;
        const lang = idioma();
        const txt = textos();

        const card = criar("article", "curiosidade-card");
        card.id = `curiosidade-${indice}`;

        const icone = criar("span", "curiosidade-icone", fato.icone);

        const categoria = criar(
            "span",
            "curiosidade-categoria",
            txt.categorias[categorias.indexOf(fato.categoria)]
        );

        const titulo = criar("h3", "", fato[lang][0]);

        const detalhes = document.createElement("details");
        detalhes.className = "curiosidade-detalhes";
        detalhes.open = abertos.has(indice);

        const resumo = criar("summary", "", txt.revelar);
        const descricao = criar("p", "curiosidade-descricao", fato[lang][1]);

        const fonte = criar("a", "curiosidade-fonte", txt.fonte);
        fonte.href = fato.fonte;
        fonte.target = "_blank";
        fonte.rel = "noopener noreferrer";

        detalhes.addEventListener("toggle", () => {
            if (detalhes.open) {
                abertos.add(indice);
            } else {
                abertos.delete(indice);
            }
        });

        detalhes.append(resumo, descricao, fonte);
        card.append(icone, categoria, titulo, detalhes);

        return card;
    }

    function atualizarFiltros() {
        controles.replaceChildren();

        const txt = textos();

        categorias.forEach((categoria, indice) => {
            const ativo = categoria === categoriaAtual;

            const botao = criar(
                "button",
                ativo ? "curiosidade-filtro ativo" : "curiosidade-filtro",
                txt.categorias[indice]
            );

            botao.type = "button";
            botao.setAttribute("aria-pressed", String(ativo));

            botao.addEventListener("click", () => {
                categoriaAtual = categoria;
                quantidadeVisivel = 6;
                renderizar();
            });

            controles.appendChild(botao);
        });
    }

    function renderizar() {
        const txt = textos();

        document.getElementById("link-curiosidades").textContent = txt.menu;
        document.getElementById("curiosidades-titulo").textContent = txt.titulo;
        document.getElementById("curiosidades-subtitulo").textContent = txt.descricao;

        const etiqueta = document.querySelector(".curiosidades-etiqueta");
        if (etiqueta) etiqueta.textContent = txt.etiqueta;

        surpresa.textContent = txt.surpresa;

        atualizarFiltros();

        const lista = listaFiltrada();
        const visiveis = lista.slice(0, quantidadeVisivel);

        grade.replaceChildren();

        visiveis.forEach(item => {
            grade.appendChild(criarCard(item));
        });

        contador.textContent =
            `${txt.mostrando} ${visiveis.length} ${txt.de} ${lista.length} ${txt.fatos}`;

        botaoMais.textContent = txt.mais;
        botaoMais.hidden = visiveis.length >= lista.length;
    }

    botaoMais.addEventListener("click", () => {
        quantidadeVisivel += 6;
        renderizar();
    });

    surpresa.addEventListener("click", () => {
        const lista = listaFiltrada();
        if (!lista.length) return;

        let sorteado;

        do {
            sorteado = lista[Math.floor(Math.random() * lista.length)];
        } while (
            lista.length > 1 &&
            sorteado.indice === ultimoSorteio
        );

        ultimoSorteio = sorteado.indice;

        const posicao = lista.findIndex(
            item => item.indice === sorteado.indice
        );

        quantidadeVisivel = Math.max(
            quantidadeVisivel,
            posicao + 1
        );

        abertos.clear();
        abertos.add(sorteado.indice);

        renderizar();

        const card = document.getElementById(
            `curiosidade-${sorteado.indice}`
        );

        card?.scrollIntoView({
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "auto" : "smooth",
            block: "center"
        });
    });

    new MutationObserver(renderizar).observe(
        document.documentElement,
        {
            attributes: true,
            attributeFilter: ["lang"]
        }
    );

    renderizar();
})();
