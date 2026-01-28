const dex = document.getElementById("pokemon-cards");
let searchBar = document.getElementById("search-input");
let searchCategory = document.getElementById("search-category");

let fetchLimit = 1000;
let renderLimit = 10;
let globalStartIndex = 0;

async function init() {
    await fetchAllSourcesFromRemote(fetchLimit);
    await renderCards(globalStartIndex, renderLimit);
}
    
async function renderCards(startIndex, count) {
    const endIndex = startIndex + count;
    for (let index = startIndex; index < endIndex; index++) {
        const allPokemons = pokemons.results[index];
        const pokemon = await fetchSinglePokemonFromRemote(allPokemons.url);
        let typesString = "";
        for (let i = 0; i < pokemon.types.length; i++) {
            typesString = generateTypeString(i, pokemon, typesString);
        }
        setCardInfos(pokemon, typesString);
    }
}

function setCardInfos(pokemon, typesString) {
    dex.innerHTML += getPokemonCardTemplate(
        pokemon.id,
        pokemon.name.toUpperCase(),
        pokemon.stats,
        typesString,
        pokemon.sprites["other"]["official-artwork"]["front_default"],
        typeColor(pokemon)
    );
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

async function loadMoreCards() {
    globalStartIndex = globalStartIndex + 10;
    renderCards(globalStartIndex, 10);
}

function searchPokemon() {     
    if (searchBar.value) {
        switch (searchCategory.value) {
            case "name":
                break;
            case "type":
                break;
            default:
                break;
        }
    }    
}