
/* =====================================
   ASTRA — ASTEROID SEARCH
   NASA NeoWs API
===================================== */

(() => {
    const form = document.getElementById("form-busca");
    const campo = document.getElementById("campo-asteroide");
    const botao = document.getElementById("botao-busca");
    const resultados = document.getElementById("busca-resultados");

    if (!form || !campo || !botao || !resultados) return;

    const API_KEY = "DEMO_KEY";

    // Asteroides conhecidos e seus identificadores
    const conhecidos = {
        apophis: "20099942",
        bennu: "2101955",
        eros: "2000433"
    };

    const textos = {
        pt: {
            menu: "Buscar",
            titulo: "Explorador de asteroides",
            descricao: "Pesquise Apophis, Bennu, Eros ou informe um identificador NASA/JPL.",
            label: "Nome ou identificador",
            botao: "Buscar",
            carregando: "Consultando a NASA...",
            naoEncontrado: "Objeto não encontrado.",
            invalido: "Use Apophis, Bennu, Eros ou um identificador numérico NASA/JPL.",
            erro: "Não foi possível consultar a NASA. Tente novamente.",
            limite: "Limite de consultas atingido. Tente novamente mais tarde.",
            diametro: "Diâmetro estimado",
            perigoso: "Potencialmente perigoso",
            velocidade: "Velocidade",
            distancia: "Distância de aproximação",
            data: "Data da aproximação",
            indisponivel: "Não disponível",
            sim: "Sim",
            nao: "Não",
            link: "Ver dados oficiais na NASA ↗",
            nota: "Aproximações exibidas são registros fornecidos pela NASA, não distâncias em tempo real."
        },
        en: {
            menu: "Search",
            titulo: "Asteroid Explorer",
            descricao: "Search Apophis, Bennu, Eros or enter a NASA/JPL identifier.",
            label: "Name or identifier",
            botao: "Search",
            carregando: "Contacting NASA...",
            naoEncontrado: "Object not found.",
            invalido: "Use Apophis, Bennu, Eros or a numeric NASA/JPL identifier.",
            erro: "Unable to contact NASA. Please try again.",
            limite: "Request limit reached. Try again later.",
            diametro: "Estimated diameter",
            perigoso: "Potentially hazardous",
            velocidade: "Speed",
            distancia: "Close approach distance",
            data: "Close approach date",
            indisponivel: "Unavailable",
            sim: "Yes",
            nao: "No",
            link: "View official NASA data ↗",
            nota: "Approaches shown are NASA records, not real-time distances."
        }
    };

    let objetoAtual = null;
    let consultando = false;

    function idioma() {
        return document.documentElement.lang === "en"
            ? "en" : "pt";
    }

    function t() {
        return textos[idioma()];
    }

    function criar(tag, classe, texto) {
        const el = document.createElement(tag);
        if (classe) el.className = classe;
        if (texto !== undefined) el.textContent = texto;
        return el;
    }

    function numero(valor, casas = 0) {
        if (valor == null || valor === "") {
            return t().indisponivel;
        }

        const n = Number(valor);

        if (!Number.isFinite(n)) {
            return t().indisponivel;
        }

        return n.toLocaleString(
            idioma() === "pt" ? "pt-BR" : "en-US",
            { maximumFractionDigits: casas }
        );
    }

    function mensagem(texto) {
        resultados.replaceChildren(
            criar("p", "busca-mensagem", texto)
        );
    }

    function linha(rotulo, valor) {
        const div = criar("div", "busca-dado");
        div.append(
            criar("span", "", rotulo),
            criar("strong", "", valor)
        );
        return div;
    }

    function exibirObjeto(dados) {
        resultados.replaceChildren();

        const card = criar("article", "busca-resultado-card");

        const titulo = criar(
            "h3",
            "",
            dados.name || "Asteroide"
        );

        const etiqueta = criar(
            "span",
            "busca-resultado-etiqueta",
            "NASA / NEOWS"
        );

        const grade = criar("div", "busca-dados-grid");

        const diametro = dados.estimated_diameter?.meters;

        let tamanho = t().indisponivel;

        if (diametro) {
            const medio = (
                diametro.estimated_diameter_min +
                diametro.estimated_diameter_max
            ) / 2;

            tamanho = `${numero(medio)} m`;
        }

        // Usa o último registro de aproximação disponível.
        // Não representa necessariamente a próxima aproximação.
        const registros = dados.close_approach_data || [];
        const aproximacao = registros.at(-1);

        const velocidade = aproximacao
            ? `${numero(aproximacao.relative_velocity.kilometers_per_hour)} km/h`
            : t().indisponivel;

        const distancia = aproximacao
            ? `${numero(aproximacao.miss_distance.kilometers)} km`
            : t().indisponivel;

        const data = aproximacao
            ? aproximacao.close_approach_date
            : t().indisponivel;

        const informacoes = [
            [t().diametro, tamanho],
            [
                t().perigoso,
                dados.is_potentially_hazardous_asteroid
                    ? t().sim : t().nao
            ],
            [t().velocidade, velocidade],
            [t().distancia, distancia],
            [t().data, data]
        ];

        informacoes.forEach(([rotulo, valor]) => {
            grade.appendChild(linha(rotulo, valor));
        });

        const nota = criar("p", "busca-nota", t().nota);

        const link = criar("a", "busca-link", t().link);
        link.href = dados.nasa_jpl_url ||
            "https://science.nasa.gov/solar-system/asteroids/";

        link.target = "_blank";
        link.rel = "noopener noreferrer";

        card.append(etiqueta, titulo, grade, nota, link);
        resultados.appendChild(card);
    }

    async function pesquisar() {
        const termo = campo.value.trim();

        if (!termo || consultando) return;

        const nome = termo.toLowerCase();

        // Nomes conhecidos ou identificadores numéricos
        const id = conhecidos[nome] ||
            (/^\d+$/.test(termo) ? termo : null);

        if (!id) {
            objetoAtual = null;
            mensagem(t().invalido);
            return;
        }

        consultando = true;
        botao.disabled = true;
        botao.textContent = t().carregando;
        mensagem(t().carregando);

        try {
            const url = new URL(
                `https://api.nasa.gov/neo/rest/v1/neo/${id}`
            );

            url.searchParams.set("api_key", API_KEY);

            const resposta = await fetch(url);

            if (!resposta.ok) {
                if (resposta.status === 429) {
                    throw new Error(t().limite);
                }

                if (resposta.status === 404) {
                    throw new Error(t().naoEncontrado);
                }

                throw new Error(t().erro);
            }

            objetoAtual = await resposta.json();
            exibirObjeto(objetoAtual);

        } catch (erro) {
            objetoAtual = null;
            console.error("Erro na busca ASTRA:", erro);
            mensagem(erro.message || t().erro);

        } finally {
            consultando = false;
            botao.disabled = false;
            botao.textContent = t().botao;
        }
    }

    function atualizarIdioma() {
        document.getElementById("link-busca")
            .textContent = t().menu;

        document.getElementById("busca-titulo")
            .textContent = t().titulo;

        document.getElementById("busca-descricao")
            .textContent = t().descricao;

        document.getElementById("busca-label")
            .textContent = t().label;

        botao.textContent = consultando
            ? t().carregando : t().botao;

        campo.placeholder = "Apophis, Bennu, Eros";

        if (objetoAtual) {
            exibirObjeto(objetoAtual);
        }
    }

    form.addEventListener("submit", evento => {
        evento.preventDefault();
        pesquisar();
    });

    new MutationObserver(atualizarIdioma).observe(
        document.documentElement,
        {
            attributes: true,
            attributeFilter: ["lang"]
        }
    );

    atualizarIdioma();
})();
