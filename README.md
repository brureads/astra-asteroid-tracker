# ☄️ ASTRA — Asteroid Tracker

**Explore o universo através de dados reais da NASA.**

O **ASTRA** é uma aplicação web interativa desenvolvida para explorar e visualizar informações sobre asteroides próximos da Terra, combinando dados astronômicos, gráficos interativos, fotografias espaciais e conteúdos educativos.

O projeto utiliza APIs públicas da NASA para transformar informações científicas em uma experiência acessível, visual e interativa.

Com uma interface inspirada na estética cinematográfica da ficção científica, o ASTRA busca aproximar a astronomia da tecnologia.

---

## 🚀 Funcionalidades

###  Monitoramento de asteroides
- Consulta de asteroides próximos da Terra utilizando a API NASA NeoWs.
- Exibição de nome, diâmetro estimado, velocidade e distância de aproximação.
- Identificação de objetos classificados como potencialmente perigosos.
- Filtros para visualizar diferentes classificações.

### Dashboard e gráficos interativos
- Total de asteroides encontrados.
- Quantidade de objetos potencialmente perigosos.
- Maior velocidade identificada.
- Menor distância de aproximação.
- Gráficos interativos de velocidade, tamanho e distância utilizando Chart.js.

###  Explorador de asteroides
- Pesquisa de asteroides conhecidos, como Apophis, Bennu e Eros.
- Consulta por identificador numérico NASA/JPL.
- Visualização de características físicas e registros de aproximação disponíveis.
- Acesso aos dados oficiais da NASA.

###  Galeria espacial
- Fotografias provenientes da NASA Image and Video Library.
- Filtros por galáxias, nebulosas e asteroides.
- Visualização ampliada das imagens.
- Descrições, créditos e links para o acervo original.

###  Interface bilíngue
- Alternância entre português (PT-BR) e inglês (EN).
- Tradução dos elementos da interface.
- Tradução automática de descrições fotográficas para português por meio do serviço MyMemory.
- Armazenamento local da preferência de idioma.

###  Curiosidades cósmicas
- Biblioteca de curiosidades científicas sobre o universo.
- Categorias de asteroides, planetas, estrelas e galáxias.
- Cartões interativos com explicações.
- Botão para descobrir curiosidades aleatórias.
- Carregamento progressivo de conteúdos.
- Referências científicas da NASA.

---

##  Tecnologias utilizadas

| Tecnologia | Aplicação |
|---|---|
| HTML5 | Estrutura e organização da aplicação |
| CSS3 | Estilização, animações e responsividade |
| JavaScript | Lógica, interatividade e integração com APIs |
| Chart.js | Visualização interativa de dados |
| Fetch API | Requisições HTTP |
| Git | Controle de versão |
| GitHub | Hospedagem do código-fonte |
| GitHub Pages | Publicação da aplicação web |

---

##  APIs e serviços utilizados

**NASA NeoWs (Near Earth Object Web Service)**

Fornece informações sobre objetos próximos da Terra, incluindo estimativas de tamanho, velocidades e registros de aproximação.

https://api.nasa.gov/

**NASA Image and Video Library**

Permite consultar imagens e conteúdos audiovisuais do acervo espacial da NASA.

https://images.nasa.gov/

**MyMemory Translation API**

Utilizada para traduzir descrições astronômicas para português.

https://mymemory.translated.net/

Os serviços externos podem apresentar limites de requisição ou indisponibilidade temporária. O ASTRA utiliza a chave pública `DEMO_KEY` da NASA para consultas experimentais.

---

##  Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/brureads/astra-asteroid-tracker.git
```

### 2. Acesse a pasta

```bash
cd astra-asteroid-tracker
```

### 3. Abra o projeto no VS Code

```bash
code .
```

### 4. Execute a aplicação

Utilize a extensão **Live Server** do VS Code para abrir o arquivo `index.html` no navegador.

A aplicação precisa de conexão com a internet para consultar as APIs e carregar os recursos externos.

---

##  Estrutura do projeto

```text
astra-asteroid-tracker/
│
├── fonts/
│   └── Starjedi.ttf
│
├── index.html
├── style.css
├── script.js
├── galeria.js
├── idioma.js
├── traducao-galeria.js
├── curiosidades.js
├── graficos.js
├── busca.js
│
└── README.md
```

Cada arquivo JavaScript possui uma responsabilidade específica, facilitando a manutenção e a evolução do projeto.

---

##  Interface e experiência

O ASTRA apresenta uma identidade visual inspirada em produções cinematográficas de ficção científica, com:

- Fundo espacial escuro e degradê roxo.
- Fotografia de galáxia ao fundo.
- Tipografia futurista.
- Cartões com informações astronômicas.
- Navegação entre seções.
- Layout responsivo.
- Elementos interativos e animações discretas.

O objetivo é unir uma estética cinematográfica à clareza de uma plataforma científica.

---

##  Acesse o projeto

**ASTRA — Asteroid Tracker**

https://brureads.github.io/astra-asteroid-tracker/

*O endereço estará disponível após a ativação do GitHub Pages.*

---

## 🔭 Possíveis melhorias futuras

- [ ] Pesquisa ampliada por nome utilizando o catálogo completo do JPL.
- [ ] Visualização interativa de órbitas.
- [ ] Filtros por período de aproximação.
- [ ] Sistema de favoritos.
- [ ] Quiz educativo sobre astronomia.
- [ ] Melhorias de acessibilidade.
- [ ] Backend para consultas e gerenciamento seguro de APIs.
- [ ] Ampliação do acervo de curiosidades científicas.

---

##  Observações

As informações astronômicas são fornecidas por serviços oficiais da NASA e instituições associadas.

A classificação **potencialmente perigoso** não significa que exista uma colisão prevista com a Terra.

As distâncias exibidas correspondem aos registros e previsões de aproximação disponibilizados pelas APIs, não necessariamente à posição atual dos objetos.

Imagens e outros recursos de terceiros estão sujeitos às respectivas condições de uso e atribuição.

Este projeto é independente e não possui afiliação ou endosso oficial da NASA.

---

##  Desenvolvedora

**Bruna Martins Moura**

Estudante de Ciência da Computação, interessada em desenvolvimento de software, tecnologia e criação de aplicações interativas.

**GitHub:** [@brureads](https://github.com/brureads)

---

*ASTRA — Explorando o universo através da tecnologia.*

**© 2026 Bruna Martins Moura**