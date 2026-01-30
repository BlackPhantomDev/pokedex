function getPokemonCardTemplate(id, name, stats, types, img, headerColor) {
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
                    Pokémon-Karte von ${name} – Klick zum Öffnen
                </figcaption>
                </figure>
                <div class="card-stats" aria-label="Statistiken">
                <div class="stat" aria-label="Angriff">
                    <div class="stat-value">${stats[1]["base_stat"]}</div>
                    <div class="stat-label">Attack</div>
                </div>
                <div class="stat" aria-label="Verteidigung">
                    <div class="stat-value">${stats[2]["base_stat"]}</div>
                    <div class="stat-label">Defence</div>
                </div>
                <div class="stat" aria-label="Geschwindigkeit">
                    <div class="stat-value">${stats[5]["base_stat"]}</div>
                    <div class="stat-label">Speed</div>
                </div>
                </div>
            </div>
            <footer class="card-footer" aria-label="Typ und Lebenspunkte">
                Type: ${types} | HP: ${stats[0]["base_stat"]}
            </footer>
        </article>
    `;
}