const dex = document.getElementById("pokemon-cards");

let limit = 10;

async function init() {
    await fetchAllSourcesFromRemote(limit);
    await renderCards(limit);
}
    
async function renderCards(amount) {
    for (let index = 0; index < amount; index++) {
        let allPokemons = pokemons.results[index];
        let pokemon = await fetchSinglePokemonFromRemote(allPokemons.url);
        let typesString = "";
        for (let i = 0; i < pokemon.types.length; i++) {
            typesString = generateTypeString(i, pokemon, typesString);
        }
        dex.innerHTML += getPokemonCardTemplate(
            pokemon.name.toUpperCase(),
            pokemon.stats,
            typesString,
            pokemon.weight,
            pokemon.sprites["other"]["official-artwork"]["front_default"],
            typeColor(pokemon)
        );
    }
}

function generateTypeString(i, pokemon, typesString) {
    let type = pokemon.types[i].type.name;
    let capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
    typesString += capitalizedType;
    if (i < pokemon.types.length - 1) {
        typesString += ", ";
    }
    return typesString;
}

function typeColor(pokemon) {
    switch (pokemon.types[0].type.name) {
        case "normal":     return "type-normal";
        case "fire":       return "type-fire";
        case "water":      return "type-water";
        case "electric":   return "type-electric";
        case "grass":      return "type-grass";
        case "ice":        return "type-ice";
        case "fighting":   return "type-fighting";
        case "poison":     return "type-poison";
        case "ground":     return "type-ground";
        case "flying":     return "type-flying";
        case "psychic":    return "type-psychic";
        case "bug":        return "type-bug";
        case "rock":       return "type-rock";
        case "ghost":      return "type-ghost";
        case "dragon":     return "type-dragon";
        case "dark":       return "type-dark";
        case "steel":      return "type-steel";
        case "fairy":      return "type-fairy";
        case "unknown":    return "type-unknown";
        case "shadow":     return "type-shadow";
        default:           return "type-unknown";
    }
}