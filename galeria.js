
/* =====================================
   ASTRA — SPACE GALLERY
   Missão 08: Galeria interativa
===================================== */

const galeriaResultados = document.getElementById(
    "galeria-resultados"
);

const filtrosGaleria = document.querySelectorAll(
    ".galeria-filtro"
);

const cacheGaleria = new Map();

let consultaAtual = 0;
let ultimoElementoFocado = null;

// =====================================
// MENSAGENS
// =====================================

function mostrarMensagemGaleria(texto) {
    const mensagem = document.createElement("p");
    mensagem.className = "galeria-mensagem";
    mensagem.textContent = texto;

    galeriaResultados.replaceChildren(mensagem);
}

// =====================================
// JANELA DE DETALHES
// =====================================

const modal = document.createElement("dialog");
modal.id = "modal-galeria";
modal.setAttribute("aria-label", "Detalhes da fotografia");

document.body.appendChild(modal);

// Fecha a janela e devolve o foco
function fecharModal() {
    modal.close();

    if (ultimoElementoFocado?.isConnected) {
        ultimoElementoFocado.focus();
    }
}

// Abre a fotografia ampliada
function abrirModal(dados, imagemURL) {
    ultimoElementoFocado = document.activeElement;

    modal.replaceChildren();

    const conteudo = document.createElement("div");
    conteudo.className = "modal-conteudo";

    // Botão de fechar
    const fechar = document.createElement("button");
    fechar.className = "modal-fechar";
    fechar.type = "button";
    fechar.textContent = "×";
    fechar.setAttribute("aria-label", "Fechar fotografia");

    fechar.addEventListener("click", fecharModal);

    // Fotografia ampliada
    const imagem = document.createElement("img");
    imagem.className = "modal-imagem";
    imagem.src = imagemURL;
    imagem.alt = dados.title || "Fotografia da NASA";

    // Informações da fotografia
    const informacoes = document.createElement("div");
    informacoes.className = "modal-informacoes";

    const etiqueta = document.createElement("span");
    etiqueta.className = "modal-etiqueta";
    etiqueta.textContent = "ASTRA / NASA VISUAL ARCHIVE";

    const titulo = document.createElement("h2");
    titulo.id = "modal-titulo";
    titulo.textContent = dados.title || "Sem título";

    modal.setAttribute("aria-labelledby", "modal-titulo");

    const descricao = document.createElement("p");
    descricao.className = "modal-descricao";
    descricao.textContent =
        dados.description || "Descrição não disponível no acervo.";

    const creditos = document.createElement("p");
    creditos.className = "modal-creditos";
    creditos.textContent = dados.photographer
        ? `Fotografia: ${dados.photographer}`
        : "Fonte: NASA Image and Video Library";

    // Link para a página original
    const link = document.createElement("a");
    link.className = "modal-link";

    link.href = dados.nasa_id
        ? `https://images.nasa.gov/details/${encodeURIComponent(dados.nasa_id)}`
        : "https://images.nasa.gov/";

    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "VISUALIZAR NA NASA ↗";

    informacoes.append(
        etiqueta,
        titulo,
        descricao,
        creditos,
        link
    );

    conteudo.append(fechar, imagem, informacoes);
    modal.appendChild(conteudo);

    modal.showModal();
    fechar.focus();
}

// Fecha ao clicar fora do conteúdo
modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
        fecharModal();
    }
});

// O navegador já permite fechar dialog com Esc
modal.addEventListener("close", () => {
    if (ultimoElementoFocado?.isConnected) {
        ultimoElementoFocado.focus();
    }
});

// =====================================
// CARTÕES DA GALERIA
// =====================================

function criarFotoGaleria(item) {
    const dados = item.data?.[0];

    const imagem = item.links?.find(
        link => link.render === "image"
    );

    if (!dados || !imagem?.href) {
        return null;
    }

    const card = document.createElement("article");
    card.className = "galeria-card";

    // Botão que abre os detalhes
    const botaoFoto = document.createElement("button");
    botaoFoto.className = "galeria-foto-botao";
    botaoFoto.type = "button";

    botaoFoto.setAttribute(
        "aria-label",
        `Ampliar fotografia: ${dados.title || "Sem título"}`
    );

    const foto = document.createElement("img");
    foto.src = imagem.href;
    foto.alt = dados.title || "Fotografia espacial";
    foto.loading = "lazy";

    const indicador = document.createElement("span");
    indicador.className = "galeria-ampliar";
    indicador.textContent = "AMPLIAR +";
    indicador.setAttribute("aria-hidden", "true");

    botaoFoto.append(foto, indicador);

    botaoFoto.addEventListener("click", () => {
        abrirModal(dados, imagem.href);
    });

    // Textos do cartão
    const conteudo = document.createElement("div");
    conteudo.className = "galeria-card-conteudo";

    const titulo = document.createElement("h3");
    titulo.textContent = dados.title || "Sem título";

    const credito = document.createElement("p");
    credito.className = "galeria-credito";

    credito.textContent = dados.photographer
        ? `Fotografia: ${dados.photographer}`
        : "Fonte: NASA Image and Video Library";

    const link = document.createElement("a");

    link.href = dados.nasa_id
        ? `https://images.nasa.gov/details/${encodeURIComponent(dados.nasa_id)}`
        : "https://images.nasa.gov/";

    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Ver no acervo da NASA ↗";

    conteudo.append(titulo, credito, link);
    card.append(botaoFoto, conteudo);

    return card;
}

// =====================================
// BUSCA DE IMAGENS DA NASA
// =====================================

async function buscarFotos(tema) {
    const identificador = ++consultaAtual;

    mostrarMensagemGaleria(
        "Consultando arquivo fotográfico da NASA..."
    );

    try {
        let itens;

        if (cacheGaleria.has(tema)) {
            itens = cacheGaleria.get(tema);
        } else {
            const url = new URL(
                "https://images-api.nasa.gov/search"
            );

            url.searchParams.set("q", tema);
            url.searchParams.set("media_type", "image");
            url.searchParams.set("page_size", "30");

            const resposta = await fetch(url);

            if (!resposta.ok) {
                throw new Error(
                    `Erro na consulta: HTTP ${resposta.status}`
                );
            }

            const dados = await resposta.json();

            itens = (dados.collection?.items || [])
                .filter(item =>
                    item.data?.[0] &&
                    item.links?.some(
                        link => link.render === "image"
                    )
                )
                .slice(0, 9);

            cacheGaleria.set(tema, itens);
        }

        // Evita mostrar resultados antigos
        if (identificador !== consultaAtual) {
            return;
        }

        galeriaResultados.replaceChildren();

        if (itens.length === 0) {
            mostrarMensagemGaleria(
                "Nenhuma fotografia encontrada."
            );
            return;
        }

        const grade = document.createElement("div");
        grade.className = "galeria-grid";

        itens.forEach(item => {
            const card = criarFotoGaleria(item);

            if (card) {
                grade.appendChild(card);
            }
        });

        galeriaResultados.appendChild(grade);

    } catch (erro) {
        if (identificador !== consultaAtual) {
            return;
        }

        console.error("Erro na galeria:", erro);

        mostrarMensagemGaleria(
            "Não foi possível carregar as imagens da NASA."
        );
    }
}

// =====================================
// FILTROS
// =====================================

filtrosGaleria.forEach(botao => {
    botao.addEventListener("click", () => {
        filtrosGaleria.forEach(filtro => {
            filtro.classList.remove("ativo");
            filtro.setAttribute("aria-pressed", "false");
        });

        botao.classList.add("ativo");
        botao.setAttribute("aria-pressed", "true");

        buscarFotos(botao.dataset.tema);
    });
});

// Carregamento inicial
buscarFotos("galaxy");
