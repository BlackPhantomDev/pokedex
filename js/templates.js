function getSmallPokemonCardTemplate(id, name, stats, types, img, headerColor) {
    return `
        <article class="pokemon-card" aria-labelledby="pokemon-card-name-${id}" role="article" onclick="openPokemonCard(${id})">
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

function getBigPokemonCardTemplate(id, name, img) {
    return `
        <div class="inner-dialog">
            <header id="dialog-header">
                <h2 id="dialog-title">${name}</h2>
                <button onclick="closeDialog()" aria-label="Dialog schliessen" href="#" class="close-btn navigation-btn" type="button" tabindex="0">
                    <img src="./assets/icons/close-icon.png" alt="Schliessen Button"/>
                </button>
            </header>

            <section id="dialog-content">
                <figure>
                    <img id="preview"
                        src="${img}"
                        alt="Pokemon: ${name}">
                    <figcaption>
                        Stats:
                    </figcaption>
                </figure>
            </section>
        </div>
    `;
}