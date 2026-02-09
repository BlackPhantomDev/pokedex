let pokemons = [];
let pokemonTypes = [];

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

async function fetchAllTypesFromRemote() {
    try {
        let response = await fetch(BASE_API_URL+"type");
        const data = await response.json();
        pokemonTypes = data.results;
        fetchError = false;
    } catch (error) {
        showFetchError(error);
        fetchError = true;
    }
}

async function fetchSingleTypeFromRemote(typeUrl) {
    let response = await fetch(typeUrl);
    return await response.json();
}

function showFetchError(error) {
    dex.innerHTML = getErrorMessageTemplate(error);
}