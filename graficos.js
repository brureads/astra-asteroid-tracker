
/* =====================================
   ASTRA — DATA VISUALIZATION
   Gráficos com Chart.js
===================================== */

const botoesGraficos = document.querySelectorAll(
    ".grafico-botao"
);

const graficoCanvas = document.getElementById(
    "grafico-asteroides"
);

const graficoContainer = document.getElementById(
    "grafico-container"
);

const graficoMensagem = document.getElementById(
    "grafico-mensagem"
);

const graficoNome = document.getElementById(
    "grafico-nome"
);

const graficoNota = document.getElementById(
    "grafico-nota"
);

let dadosGraficos = [];
let graficoAtual = null;
let tipoGrafico = "velocidade";

// Traduções exclusivas da seção
const textosGraficos = {
    pt: {
        menu: "Gráficos",
        etiqueta: "ASTRA / ANÁLISE DE DADOS",
        titulo: "Análise de asteroides",
        descricao: "Compare velocidade, tamanho e distância dos objetos monitorados pela NASA.",
        velocidade: "Velocidade",
        tamanho: "Tamanho",
        distancia: "Distância",
        tituloVelocidade: "Asteroides mais rápidos",
        tituloTamanho: "Maiores diâmetros estimados",
        tituloDistancia: "Menores distâncias de aproximação",
        vazio: "Clique em Explorar asteroides para carregar os dados da NASA.",
        semDados: "Nenhum dado disponível para este gráfico.",
        erro: "Não foi possível carregar a biblioteca de gráficos.",
        fonte: "Fonte: NASA NeoWs API · Até 10 objetos por comparação",
        unidadeVelocidade: "Velocidade (km/h)",
        unidadeTamanho: "Diâmetro médio estimado (m)",
        unidadeDistancia: "Distância (milhões de km)"
    },

    en: {
        menu: "Charts",
        etiqueta: "ASTRA / DATA ANALYSIS",
        titulo: "Asteroid Analysis",
        descricao: "Compare the speed, size and close-approach distance of NASA-monitored objects.",
        velocidade: "Speed",
        tamanho: "Size",
        distancia: "Distance",
        tituloVelocidade: "Fastest Asteroids",
        tituloTamanho: "Largest Estimated Diameters",
        tituloDistancia: "Closest Approaches",
        vazio: "Click Explore Asteroids to load NASA data.",
        semDados: "No data available for this chart.",
        erro: "Unable to load the chart library.",
        fonte: "Source: NASA NeoWs API · Up to 10 objects per comparison",
        unidadeVelocidade: "Speed (km/h)",
        unidadeTamanho: "Estimated mean diameter (m)",
        unidadeDistancia: "Distance (million km)"
    }
};

function idiomaGrafico() {
    return document.documentElement.lang === "en"
        ? "en"
        : "pt";
}

function numeroGrafico(valor, casas = 0) {
    return Number(valor).toLocaleString(
        idiomaGrafico() === "pt" ? "pt-BR" : "en-US",
        { maximumFractionDigits: casas }
    );
}

// Extrai o valor numérico da API
function obterValor(asteroide, tipo) {
    const aproximacao = asteroide.close_approach_data?.[0];

    if (tipo === "velocidade") {
        return Number(
            aproximacao?.relative_velocity?.kilometers_per_hour
        );
    }

    if (tipo === "distancia") {
        const km = Number(
            aproximacao?.miss_distance?.kilometers
        );

        // Converte km para milhões de km
        return km / 1000000;
    }

    const diametro = asteroide.estimated_diameter?.meters;

    const minimo = Number(
        diametro?.estimated_diameter_min
    );

    const maximo = Number(
        diametro?.estimated_diameter_max
    );

    return (minimo + maximo) / 2;
}

// Seleciona até 10 asteroides
function selecionarDados(tipo) {
    return dadosGraficos
        .map(asteroide => ({
            nome: asteroide.name,
            valor: obterValor(asteroide, tipo),
            perigoso: Boolean(
                asteroide.is_potentially_hazardous_asteroid
            )
        }))
        .filter(item =>
            Number.isFinite(item.valor) &&
            item.valor >= 0
        )
        .sort((a, b) =>
            tipo === "distancia"
                ? a.valor - b.valor
                : b.valor - a.valor
        )
        .slice(0, 10);
}

// Mostra as legendas do tipo escolhido
function atualizarRotulos() {
    const idioma = idiomaGrafico();
    const textos = textosGraficos[idioma];

    document.getElementById(
        "link-graficos"
    ).textContent = textos.menu;

    document.getElementById(
        "graficos-etiqueta"
    ).textContent = textos.etiqueta;

    document.getElementById(
        "graficos-titulo"
    ).textContent = textos.titulo;

    document.getElementById(
        "graficos-descricao"
    ).textContent = textos.descricao;

    graficoNome.textContent =
        tipoGrafico === "velocidade"
            ? textos.tituloVelocidade
            : tipoGrafico === "tamanho"
                ? textos.tituloTamanho
                : textos.tituloDistancia;

    graficoNota.textContent = textos.fonte;

    botoesGraficos.forEach(botao => {
        const tipo = botao.dataset.grafico;
        const ativo = tipo === tipoGrafico;

        botao.classList.toggle("ativo", ativo);
        botao.setAttribute(
            "aria-pressed",
            String(ativo)
        );

        botao.textContent = textos[tipo];
    });
}

// Atualiza a visualização
function desenharGrafico() {
    atualizarRotulos();

    if (graficoAtual) {
        graficoAtual.destroy();
        graficoAtual = null;
    }

    const textos = textosGraficos[idiomaGrafico()];

    if (dadosGraficos.length === 0) {
        graficoContainer.hidden = true;
        graficoMensagem.hidden = false;
        graficoMensagem.textContent = textos.vazio;
        return;
    }

    if (typeof Chart === "undefined") {
        graficoContainer.hidden = true;
        graficoMensagem.hidden = false;
        graficoMensagem.textContent = textos.erro;
        return;
    }

    const itens = selecionarDados(tipoGrafico);

    if (itens.length === 0) {
        graficoContainer.hidden = true;
        graficoMensagem.hidden = false;
        graficoMensagem.textContent = textos.semDados;
        return;
    }

    graficoMensagem.hidden = true;
    graficoContainer.hidden = false;

    const nomeUnidade =
        tipoGrafico === "velocidade"
            ? textos.unidadeVelocidade
            : tipoGrafico === "tamanho"
                ? textos.unidadeTamanho
                : textos.unidadeDistancia;

    // Lilás para objetos comuns;
    // coral para potencialmente perigosos
    const cores = itens.map(item =>
        item.perigoso ? "#e7a5a9" : "#bda5eb"
    );

    graficoAtual = new Chart(graficoCanvas, {
        type: "bar",

        data: {
            labels: itens.map(item => item.nome),

            datasets: [{
                label: nomeUnidade,
                data: itens.map(item => item.valor),
                backgroundColor: cores,
                hoverBackgroundColor: itens.map(item =>
                    item.perigoso ? "#ffc2c5" : "#e1d2ff"
                ),
                borderRadius: 5,
                maxBarThickness: 28
            }]
        },

        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,

            animation: {
                duration: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? 0 : 650
            },

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    backgroundColor: "#171020",
                    titleColor: "#ffffff",
                    bodyColor: "#ddd3ed",
                    borderColor: "#604b79",
                    borderWidth: 1,
                    padding: 12,

                    callbacks: {
                        label(contexto) {
                            const valor = contexto.parsed.x;
                            const casas = tipoGrafico === "distancia"
                                ? 2 : 0;

                            return `${nomeUnidade}: ${numeroGrafico(valor, casas)}`;
                        }
                    }
                }
            },

            scales: {
                x: {
                    beginAtZero: true,

                    grid: {
                        color: "rgba(192,169,236,0.10)"
                    },

                    border: {
                        display: false
                    },

                    ticks: {
                        color: "#ada4bf",

                        callback(valor) {
                            return numeroGrafico(
                                valor,
                                tipoGrafico === "distancia" ? 1 : 0
                            );
                        }
                    },

                    title: {
                        display: true,
                        text: nomeUnidade,
                        color: "#c0a9ec"
                    }
                },

                y: {
                    grid: {
                        display: false
                    },

                    border: {
                        display: false
                    },

                    ticks: {
                        color: "#ede7f5",
                        font: {
                            size: 11
                        }
                    }
                }
            }
        }
    });
}

// Recebe os dados que o script.js buscou
document.addEventListener(
    "astra:asteroides-carregados",
    evento => {
        dadosGraficos = Array.isArray(evento.detail.asteroides)
            ? evento.detail.asteroides
            : [];

        desenharGrafico();
    }
);

// Alterna entre os três gráficos
botoesGraficos.forEach(botao => {
    botao.addEventListener("click", () => {
        tipoGrafico = botao.dataset.grafico;
        desenharGrafico();
    });
});

// Detecta mudanças de idioma
const observadorIdiomaGraficos = new MutationObserver(() => {
    desenharGrafico();
});

observadorIdiomaGraficos.observe(
    document.documentElement,
    {
        attributes: true,
        attributeFilter: ["lang"]
    }
);

// Estado inicial
desenharGrafico();
