let pokemons = [];

async function fetchAllSourcesFromRemote(limit) {
    try {
        let response = await fetch(BASE_API_URL+`pokemon/?limit=${limit}&offset=0`);
        pokemons = await response.json();
        fetchError = false;
    } catch (error) {
        showFetchError(error);
        fetchError = true;
    }
}

async function fetchSinglePokemonFromRemote(pokemonUrl) {
    let response = await fetch(pokemonUrl);
    return await response.json();
}

function showFetchError(error) {
    dex.innerHTML = getErrorMessageTemplate(error);
}