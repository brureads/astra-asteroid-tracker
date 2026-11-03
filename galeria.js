
/* =====================================
   ASTRA — SPACE GALLERY
   NASA Image and Video Library
===================================== */

const galeriaResultados = document.getElementById(
    "galeria-resultados"
);

const filtrosGaleria = document.querySelectorAll(
    ".galeria-filtro"
);

// Guarda as consultas para evitar buscas repetidas
const cacheGaleria = new Map();

let consultaAtual = 0;

// Exibe mensagens de carregamento ou erro
function mostrarMensagemGaleria(texto) {
    const mensagem = document.createElement("p");
    mensagem.className = "galeria-mensagem";
    mensagem.textContent = texto;

    galeriaResultados.replaceChildren(mensagem);
}

// Cria um cartão de fotografia
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

    const foto = document.createElement("img");
    foto.src = imagem.href;
    foto.alt = dados.description || dados.title || "Imagem espacial";
    foto.loading = "lazy";

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
    card.append(foto, conteudo);

    return card;
}

// Busca imagens na biblioteca oficial
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
                    `Falha na consulta: HTTP ${resposta.status}`
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

        // Ignora resultados de uma pesquisa anterior
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

// Alterna as categorias
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

// Carrega a galeria quando a página abre
buscarFotos("galaxy");
