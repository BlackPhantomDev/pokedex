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
    try {
        console.log(pokemonUrl);
        
        let response = await fetch(pokemonUrl);
        fetchError = false;
        return await response.json();
    } catch (error) {
        showFetchError(error);
        fetchError = true;
    }
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
    try {
        let response = await fetch(typeUrl);
        fetchError = false;
        return await response.json();
    } catch (error) {
        showFetchError(error);
        fetchError = true;
    }
}

function showFetchError(error) {
    dex.innerHTML = getErrorMessageTemplate(error);
    closeLoadingScreen();
}