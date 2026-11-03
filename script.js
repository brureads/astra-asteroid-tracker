
/* ==========================================
   ASTRA — ASTEROID TRACKER
   Missão 06: Dashboard e filtros
========================================== */

const API_KEY = "DEMO_KEY";

const botaoBuscar = document.getElementById("buscar-asteroides");
const resultados = document.getElementById("resultados");

// Dados guardados após a consulta
let asteroidesEncontrados = [];

// Formatação
function formatarNumero(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        maximumFractionDigits: 0
    });
}

function formatarDataAPI(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}

function formatarData(data) {
    return data.split("-").reverse().join("/");
}

// Obtém os dados da aproximação
function aproximacao(asteroide) {
    return asteroide.close_approach_data?.[0];
}

function distancia(asteroide) {
    return Number(
        aproximacao(asteroide)?.miss_distance?.kilometers
        ?? Infinity
    );
}

function velocidade(asteroide) {
    return Number(
        aproximacao(asteroide)?.relative_velocity?.kilometers_per_hour
        ?? 0
    );
}

// Cria um elemento com classe e texto
function criarElemento(tag, classe, texto) {
    const elemento = document.createElement(tag);

    if (classe) {
        elemento.className = classe;
    }

    if (texto !== undefined) {
        elemento.textContent = texto;
    }

    return elemento;
}

// Cria uma estatística
function criarEstatistica(icone, valor, descricao) {
    const card = criarElemento("article", "stat-card");

    const simbolo = criarElemento("span", "stat-icon", icone);
    const numero = criarElemento("strong", "stat-value", valor);
    const titulo = criarElemento("span", "stat-label", descricao);

    card.append(simbolo, numero, titulo);

    return card;
}

// Cria o painel de estatísticas
function criarDashboard(asteroides) {
    const painel = criarElemento("section", "stats-section");

    const titulo = criarElemento(
        "h2",
        "stats-heading",
        "Visão geral da missão"
    );

    painel.appendChild(titulo);

    const grade = criarElemento("div", "stats-grid");

    const perigosos = asteroides.filter(
        a => a.is_potentially_hazardous_asteroid
    );

    const maisRapido = Math.max(
        0,
        ...asteroides.map(velocidade)
    );

    const maisProximo = Math.min(
        ...asteroides.map(distancia)
    );

    grade.appendChild(
        criarEstatistica(
            "◎",
            String(asteroides.length),
            "Asteroides encontrados"
        )
    );

    grade.appendChild(
        criarEstatistica(
            "△",
            String(perigosos.length),
            "Potencialmente perigosos"
        )
    );

    grade.appendChild(
        criarEstatistica(
            "↗",
            `${formatarNumero(maisRapido)} km/h`,
            "Maior velocidade"
        )
    );

    grade.appendChild(
        criarEstatistica(
            "◉",
            Number.isFinite(maisProximo)
                ? `${formatarNumero(maisProximo)} km`
                : "Indisponível",
            "Menor distância da Terra"
        )
    );

    painel.appendChild(grade);

    return painel;
}

// Cria uma linha de informação
function criarInformacao(rotulo, valor) {
    const linha = criarElemento("div", "asteroide-info");

    linha.appendChild(criarElemento("span", "", rotulo));
    linha.appendChild(criarElemento("strong", "", valor));

    return linha;
}

// Cria um cartão de asteroide
function criarCard(asteroide) {
    const card = criarElemento("article", "asteroide-card");

    const nome = criarElemento("h3", "", asteroide.name);
    card.appendChild(nome);

    const perigoso =
        asteroide.is_potentially_hazardous_asteroid;

    const etiqueta = criarElemento(
        "span",
        perigoso ? "asteroide-alerta" : "asteroide-normal",
        perigoso
            ? "Potencialmente perigoso"
            : "Não classificado como perigoso"
    );

    card.appendChild(etiqueta);

    const diametro = asteroide.estimated_diameter.meters;

    const tamanhoMedio = (
        diametro.estimated_diameter_min +
        diametro.estimated_diameter_max
    ) / 2;

    card.appendChild(
        criarInformacao(
            "Diâmetro estimado",
            `${formatarNumero(tamanhoMedio)} m`
        )
    );

    card.appendChild(
        criarInformacao(
            "Velocidade",
            `${formatarNumero(velocidade(asteroide))} km/h`
        )
    );

    card.appendChild(
        criarInformacao(
            "Distância da Terra",
            `${formatarNumero(distancia(asteroide))} km`
        )
    );

    const dados = aproximacao(asteroide);

    if (dados) {
        card.appendChild(
            criarInformacao(
                "Data da aproximação",
                formatarData(dados.close_approach_date)
            )
        );
    }

    return card;
}

// Exibe os cartões com filtro
function mostrarAsteroides(somentePerigosos = false) {
    const container = document.getElementById("lista-asteroides");

    if (!container) return;

    container.replaceChildren();

    const filtrados = somentePerigosos
        ? asteroidesEncontrados.filter(
            a => a.is_potentially_hazardous_asteroid
        )
        : asteroidesEncontrados;

    if (filtrados.length === 0) {
        container.appendChild(
            criarElemento(
                "p",
                "mensagem-status",
                "Nenhum asteroide encontrado neste filtro."
            )
        );
        return;
    }

    const grade = criarElemento("div", "asteroides-grid");

    filtrados.forEach(asteroide => {
        grade.appendChild(criarCard(asteroide));
    });

    container.appendChild(grade);
}

// Cria os controles de filtro
function criarFiltros() {
    const area = criarElemento("section", "filtros-section");

    const titulo = criarElemento(
        "h2",
        "resultados-titulo",
        "Objetos monitorados"
    );

    const controles = criarElemento("div", "filtros-botoes");

    const todos = criarElemento("button", "filtro ativo", "Todos");
    const perigosos = criarElemento(
        "button",
        "filtro",
        "Potencialmente perigosos"
    );

    todos.type = "button";
    perigosos.type = "button";

    todos.setAttribute("aria-pressed", "true");
    perigosos.setAttribute("aria-pressed", "false");

    todos.addEventListener("click", () => {
        todos.classList.add("ativo");
        perigosos.classList.remove("ativo");

        todos.setAttribute("aria-pressed", "true");
        perigosos.setAttribute("aria-pressed", "false");

        mostrarAsteroides(false);
    });

    perigosos.addEventListener("click", () => {
        perigosos.classList.add("ativo");
        todos.classList.remove("ativo");

        perigosos.setAttribute("aria-pressed", "true");
        todos.setAttribute("aria-pressed", "false");

        mostrarAsteroides(true);
    });

    controles.append(todos, perigosos);
    area.append(titulo, controles);

    return area;
}

// Busca os dados reais na NASA
async function buscarAsteroides() {
    botaoBuscar.disabled = true;
    botaoBuscar.textContent = "Consultando NASA...";

    resultados.replaceChildren();

    resultados.appendChild(
        criarElemento(
            "p",
            "mensagem-status",
            "Estabelecendo conexão com a NASA..."
        )
    );

    try {
        const inicio = new Date();
        const fim = new Date(inicio);

        fim.setDate(fim.getDate() + 2);

        const dataInicio = formatarDataAPI(inicio);
        const dataFim = formatarDataAPI(fim);

        const url = new URL(
            "https://api.nasa.gov/neo/rest/v1/feed"
        );

        url.searchParams.set("start_date", dataInicio);
        url.searchParams.set("end_date", dataFim);
        url.searchParams.set("api_key", API_KEY);

        const resposta = await fetch(url);

        if (!resposta.ok) {
            if (resposta.status === 429) {
                throw new Error(
                    "Limite de consultas atingido. Tente novamente mais tarde."
                );
            }

            throw new Error(
                `Erro na consulta à NASA: HTTP ${resposta.status}`
            );
        }

        const dados = await resposta.json();

        asteroidesEncontrados = Object.values(
            dados.near_earth_objects || {}
        ).flat();

        // Ordena por distância da Terra
        asteroidesEncontrados.sort(
            (a, b) => distancia(a) - distancia(b)
        );

// Envia os dados para a seção de gráficos
document.dispatchEvent(
    new CustomEvent("astra:asteroides-carregados", {
        detail: {
            asteroides: asteroidesEncontrados
        }
    })
);


        resultados.replaceChildren();

        // Identificação do intervalo consultado
        resultados.appendChild(
            criarElemento(
                "p",
                "periodo-consulta",
                `PERÍODO ANALISADO: ${formatarData(dataInicio)} — ${formatarData(dataFim)}`
            )
        );

        // Adiciona painel de estatísticas
        resultados.appendChild(
            criarDashboard(asteroidesEncontrados)
        );

        // Adiciona filtros
        resultados.appendChild(criarFiltros());

        // Área da lista
        const lista = criarElemento(
            "div",
            "",
        );

        lista.id = "lista-asteroides";
        resultados.appendChild(lista);

        // Mostra todos inicialmente
        mostrarAsteroides();

    } catch (erro) {
        console.error("Erro ASTRA:", erro);

        resultados.replaceChildren();

        resultados.appendChild(
            criarElemento(
                "p",
                "mensagem-erro",
                erro.message
            )
        );

    } finally {
        botaoBuscar.disabled = false;
        botaoBuscar.textContent = "Explorar asteroides";
    }
}

// Evento do botão principal
botaoBuscar.addEventListener("click", buscarAsteroides);
