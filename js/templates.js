function getPokemonCardTemplate(id, name, stats, types, img, headerColor) {
    return `
        <div class="pokemon-card">
            <div class="card-header ${headerColor}" id="pokemon-card-name">
                ${name}
            </div>
            <div class="card-body">
                <div class="card-image">
                    <img id="pokemon-card-img" src="${img}" alt="Pokemon" onclick="openPokemonCard(${id})">
                </div>
                <div class="card-stats">
                    <div class="stat">
                        <div class="stat-value">${stats[1]["base_stat"]}</div>
                        <div class="stat-label">Attack</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${stats[2]["base_stat"]}</div>
                        <div class="stat-label">Defence</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${stats[5]["base_stat"]}</div>
                        <div class="stat-label">Speed</div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                Type: ${types} | HP: ${stats[0]["base_stat"]}
            </div>
        </div>
    `;
}