const remoteUrl = "https://pokeapi.co/api/v2/";
let pokemons = [];

async function fetchAllSourcesFromRemote(limit) {
    let response = await fetch(remoteUrl+`pokemon/?limit=${limit}&offset=0`);
    pokemons = await response.json();
}

async function fetchSinglePokemonFromRemote(pokemonUrl) {
    let response = await fetch(pokemonUrl);
    return await response.json();
}