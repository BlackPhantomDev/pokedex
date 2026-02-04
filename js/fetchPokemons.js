const remoteUrl = "https://pokeapi.co/api/v2/";
let pokemons = [];

async function fetchAllSourcesFromRemote(limit) {
    try {
        let response = await fetch(remoteUrl+`pokemon/?limit=${limit}&offset=0`);
        pokemons = await response.json();
    } catch (error) {
        showFetchError(error);
    }
}

async function fetchSinglePokemonFromRemote(pokemonUrl) {
    let response = await fetch(pokemonUrl);
    return await response.json();
}

function showFetchError(error) {
    dex.innerHTML = getErrorMessageTemplate(error);
}