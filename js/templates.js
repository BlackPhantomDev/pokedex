function getSmallPokemonCardTemplate(id, name, stats, types, img, headerColor, isSearched) {
    return `
        <article class="pokemon-card" aria-labelledby="pokemon-card-name-${id}" role="article" onclick="openPokemonCardDialog(${id}, ${isSearched})">
            <header class="card-header ${headerColor}" id="pokemon-card-name-${id}">
                ${name}
            </header>
            <div class="card-body">
                <figure class="card-image" role="group" aria-label="Bild von ${name}">
                    <img 
                        id="pokemon-card-img-${id}" 
                        src="${img}" 
                        alt="${name}" 
                        role="img" 
                        aria-describedby="pokemon-card-caption-${id}"
                    />
                    <figcaption id="pokemon-card-caption-${id}" class="sr-only">
                        <p>Pokémon-Karte von ${name} – Klick zum Öffnen</p>
                    </figcaption>
                </figure>
                <div class="card-stats ${headerColor}" aria-label="Statistiken">
                    <div class="stat" aria-label="Angriff">
                        <p class="stat-value">
                            ${stats[1]["base_stat"]}
                        </p>
                        <p class="stat-label">
                            Attack
                        </p>
                    </div>
                    <div class="stat" aria-label="Verteidigung">
                        <p class="stat-value">
                            ${stats[2]["base_stat"]}
                        </p>
                        <p class="stat-label">
                            Defence
                        </p>
                    </div>
                    <div class="stat" aria-label="Geschwindigkeit">
                        <p class="stat-value">
                            ${stats[5]["base_stat"]}
                        </p>
                        <p class="stat-label">
                            Speed
                        </p>
                    </div>
                </div>
            </div>
            <footer class="card-footer" aria-label="Typ und Lebenspunkte">
                <p>Type: ${types}</p>
            </footer>
        </article>
    `;
}

async function getBigPokemonCardTemplate(pokemon, isSearched) {        
    return `
        <article class="inner-dialog">
            <header id="dialog-header">
                <h2 id="dialog-title">#${(pokemon.id)} ${capWords(pokemon.name)}</h2>
                <button onclick="closePokemonCardDialog()" aria-label="Dialog schliessen" href="#" class="close-btn navigation-btn" type="button" tabindex="0">
                    <img src="./assets/icons/close.png" alt="Schliessen Button"/>
                </button>
            </header>

            <section id="dialog-content">
                <figure>
                    <div id="figure-header">
                        <img id="pokemon-preview"
                            src="${pokemon.sprites["other"]["official-artwork"]["front_default"]}"
                            alt="Pokemon: ${capWords(pokemon.name)}">
                        <div id="card-nav">
                            <button id="previous" class="dialog-btn navigation-btn" onclick="previousPokemon(${pokemon.id}, ${isSearched})"><img src="./assets/icons/arrow-left.svg" alt="Button vorheriges Bild" /></button>
                            <button id="next" class="dialog-btn navigation-btn" onclick="nextPokemon(${pokemon.id}, ${isSearched})"><img src="./assets/icons/arrow-right.svg" alt="Button naechstes Bild" /></button>
                        </div>
                    </div>
                    <figcaption id="stats-container">
                        <div id="stats-menue">
                            <span onclick="switchStat(0)">Main</span>
                            <span onclick="switchStat(1)">Battle</span>
                            <span onclick="switchStat(2)">Evochain</span>
                        </div>
                        <div id="stats-content">
                            <div class="stats-table" id="main-stats">
                            <table>
                                <tr><th>Height</th><td>${pokemon.height}</td></tr>
                                <tr><th>Weight</th><td>${pokemon.weight}</td></tr>
                                <tr><th>Base-Experience</th><td>${pokemon.base_experience} pts.</td></tr>
                                <tr><th>Abilities</th><td>${getAllPokemonAbilities(pokemon.abilities).join(", ")}</td></tr>
                            </table>
                            </div>

                            <div class="stats-table" id="battle-stats">
                            <table>
                                <tr><th>${pokemon.stats[0].stat.name.toUpperCase()}</th><td>${pokemon.stats[0].base_stat} pts.</td></tr>
                                <tr><th>${capWords(pokemon.stats[1].stat.name)}</th><td>${pokemon.stats[1].base_stat} pts.</td></tr>
                                <tr><th>${capWords(pokemon.stats[2].stat.name)}</th><td>${pokemon.stats[2].base_stat} pts.</td></tr>
                                <tr><th>${capWords(pokemon.stats[3].stat.name)}</th><td>${pokemon.stats[3].base_stat} pts.</td></tr>
                                <tr><th>${capWords(pokemon.stats[4].stat.name)}</th><td>${pokemon.stats[4].base_stat} pts.</td></tr>
                                <tr><th>${capWords(pokemon.stats[5].stat.name)}</th><td>${pokemon.stats[5].base_stat} pts.</td></tr>
                            </table>
                            </div>
                            <div id="evo-chain">
                                ${await renderEvoChain(pokemon.id)}
                            </div>
                        </div>
                    </figcaption>
                </figure>
            </section>
        </article>
        <span id="message-box">
        </span>
    `;
}

function getErrorMessageTemplate(error) {
    return `
        <div class="error-card" id="errorCard">
            <h2>Fehler beim Laden</h2>
            <p>Die Daten von der PokéAPI konnten nicht abgerufen werden.</p>
            <p>Fehlermeldung: ${error}</p>
            <button onclick="init()" class="primary-button">Neu laden</button>
        </div>
    `;
}

function getEvoCardTemplate(pokemon) {
    return `
        <div class="evo-chain-card">
            <div class="evo-image"><img src="${pokemon.sprites["other"]["official-artwork"]["front_default"]}" alt="${capWords(pokemon.name)}"></div>
            <div class="evo-name">${capWords(pokemon.name)}</div>
        </div>
    `;
}