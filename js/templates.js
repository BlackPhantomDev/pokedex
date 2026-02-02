function getSmallPokemonCardTemplate(id, name, stats, types, img, headerColor) {
    return `
        <article class="pokemon-card" aria-labelledby="pokemon-card-name-${id}" role="article" onclick="openPokemonCardDialog(${id})">
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
                <p>Type: ${types} | HP: ${stats[0]["base_stat"]}</p>
            </footer>
        </article>
    `;
}

function getBigPokemonCardTemplate(pokemon) {
    return `
        <article class="inner-dialog">
            <header id="dialog-header">
                <h2 id="dialog-title">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                <button onclick="closePokemonCardDialog()" aria-label="Dialog schliessen" href="#" class="close-btn navigation-btn" type="button" tabindex="0">
                    <img src="./assets/icons/close.png" alt="Schliessen Button"/>
                </button>
            </header>

            <section id="dialog-content">
                <figure>
                    <img id="pokemon-preview"
                        src="${pokemon.sprites["other"]["official-artwork"]["front_default"]}"
                        alt="Pokemon: ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}">
                    <figcaption id="stats-container">
                        <div id="stats-menue">
                            <span onclick="switchStat(0)">Main</span>
                            <span onclick="switchStat(1)">Battle</span>
                            <span onclick="switchStat(2)">Evochain</span>
                        </div>
                        <div id="stats-content">
                            <div class="stats" id="main-stats">
                                <p><span>Height: </span><span>${pokemon.height}</span></p>
                                <p><span>Weight: </span><span>${pokemon.weight}</span></p>
                                <p><span>Base-Experience: </span><span>${pokemon.base_experience}</span></p>
                                <p><span>Abilities: </span><span>${getAllPokemonAbilities(pokemon.abilities).join(", ")}</span></p>

                            </div>
                            <div class="stats" id="battle-stats">
                                <p><span>${pokemon.stats[0]["stat"]["name"].toUpperCase()}: </span><span>${pokemon.stats[0]["base_stat"]}</span></p>
                                <p><span>${capWords(pokemon.stats[1]["stat"]["name"])}: </span><span>${pokemon.stats[1]["base_stat"]}</span></p>
                                <p><span>${capWords(pokemon.stats[2]["stat"]["name"])}: </span><span>${pokemon.stats[2]["base_stat"]}</span></p>
                                <p><span>${capWords(pokemon.stats[3]["stat"]["name"])}: </span><span>${pokemon.stats[3]["base_stat"]}</span></p>
                                <p><span>${capWords(pokemon.stats[4]["stat"]["name"])}: </span><span>${pokemon.stats[4]["base_stat"]}</span></p>
                                <p><span>${capWords(pokemon.stats[5]["stat"]["name"])}: </span><span>${pokemon.stats[5]["base_stat"]}</span></p>
                            </div>
                            <div id="evo-chain">
                            
                            </div>
                        </div>
                    </figcaption>
                </figure>
            </section>
        </article>
    `;
}