
/* ==========================================
   ASTRA — TRADUÇÃO DAS FOTOGRAFIAS
   NASA + MyMemory Translation API
========================================== */

const cacheTraducoes = new Map();

let descricaoAtual = null;
let textoOriginal = "";
let numeroDaTraducao = 0;

// Divide textos longos em partes menores
// A API aceita no máximo 500 bytes por chamada.
function dividirTexto(texto) {
    const limite = 400;
    const encoder = new TextEncoder();

    const palavras = texto.match(/\S+\s*/g) || [];
    const partes = [];
    let parte = "";

    for (const palavra of palavras) {
        if (encoder.encode(parte + palavra).length <= limite) {
            parte += palavra;
        } else {
            if (parte.trim()) {
                partes.push(parte.trim());
            }

            parte = "";

            for (const letra of palavra) {
                if (encoder.encode(parte + letra).length > limite) {
                    partes.push(parte.trim());
                    parte = "";
                }

                parte += letra;
            }
        }
    }

    if (parte.trim()) {
        partes.push(parte.trim());
    }

    return partes;
}

// Consulta o serviço de tradução
async function traduzirTrecho(texto) {
    const url = new URL(
        "https://api.mymemory.translated.net/get"
    );

    url.searchParams.set("q", texto);
    url.searchParams.set("langpair", "en|pt-BR");

    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error("Serviço de tradução indisponível.");
    }

    const dados = await resposta.json();

    if (Number(dados.responseStatus) !== 200) {
        throw new Error("Limite ou erro na tradução.");
    }

    const traducao = dados.responseData?.translatedText;

    if (!traducao || /MYMEMORY WARNING/i.test(traducao)) {
        throw new Error("Tradução não disponível.");
    }

    // Decodifica entidades HTML da resposta
    const decodificador = document.createElement("textarea");
    decodificador.innerHTML = traducao;

    return decodificador.value;
}

// Traduz a descrição completa
async function traduzirDescricao(texto) {
    if (cacheTraducoes.has(texto)) {
        return cacheTraducoes.get(texto);
    }

    const partes = dividirTexto(texto);
    const traducoes = [];

    for (const parte of partes) {
        const traducao = await traduzirTrecho(parte);
        traducoes.push(traducao);
    }

    const resultado = traducoes.join(" ");

    cacheTraducoes.set(texto, resultado);

    return resultado;
}

// Atualiza a descrição conforme o idioma
async function atualizarDescricao() {
    const descricao = document.querySelector(
        "#modal-galeria .modal-descricao"
    );

    if (!descricao || !textoOriginal) return;

    const idioma = document.documentElement.lang;
    const requisicao = ++numeroDaTraducao;

    // Inglês: mantém o texto original da NASA
    if (idioma === "en") {
        descricao.firstChild.nodeValue = textoOriginal;
        return;
    }

    // Português: traduz automaticamente
    descricao.firstChild.nodeValue = "Traduzindo descrição...";

    try {
        const traducao = await traduzirDescricao(textoOriginal);

        // Evita modificar outra foto ou idioma
        if (
            requisicao !== numeroDaTraducao ||
            descricao !== descricaoAtual ||
            document.documentElement.lang !== "pt-BR"
        ) {
            return;
        }

        descricao.firstChild.nodeValue = traducao;

    } catch (erro) {
        console.error("Erro na tradução:", erro);

        if (
            requisicao !== numeroDaTraducao ||
            descricao !== descricaoAtual ||
            document.documentElement.lang !== "pt-BR"
        ) {
            return;
        }

        descricao.firstChild.nodeValue =
            textoOriginal +
            "\n\nTradução indisponível no momento.";
    }
}

// Detecta quando uma fotografia é aberta
const observarModal = new MutationObserver(() => {
    const descricao = document.querySelector(
        "#modal-galeria .modal-descricao"
    );

    if (!descricao || descricao === descricaoAtual) {
        return;
    }

    descricaoAtual = descricao;
    textoOriginal = descricao.textContent;

    atualizarDescricao();
});

const modalGaleria = document.getElementById("modal-galeria");

if (modalGaleria) {
    observarModal.observe(modalGaleria, {
        childList: true,
        subtree: true
    });
}

// Detecta mudanças de PT para EN e vice-versa
const observarIdioma = new MutationObserver(() => {
    if (descricaoAtual?.isConnected) {
        atualizarDescricao();
    }
});

observarIdioma.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"]
});

console.log("ASTRA: tradução da galeria inicializada.");
