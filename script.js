const dex = document.getElementById("pokemon-cards");
const searchBar = document.getElementById("search-input");
const searchCategory = document.getElementById("search-category");
const dialogSection = document.getElementById("dialog-section");
const pokemonCardDialog = document.getElementById("pokemon-card-complete");
const loadMoreBtnsSection = document.getElementById("load-more-btns");
const loadingScreen = document.getElementById("loading-screen");
const body = document.getElementById("body");
const searchAmount = document.getElementById("search-amount");
const notEnoughLetters = document.getElementById("not-enough-letters");
const searchResetBtn = document.getElementById('search-reset-btn');
const searchError = document.getElementById("search-result-error");

let fetchLimit = 1000;
let renderLimit = 10;
let globalStartIndex = 0;
let fetchError = false;
let maxElementsSearch;

const BASE_API_URL = "https://pokeapi.co/api/v2/";

window.addEventListener('keydown', function(event) {
  if (pokemonCardDialog.open) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      closePokemonCardDialog();
    }
  }
}
);
dialogSection.addEventListener("click", () => closePokemonCardDialog());
pokemonCardDialog.addEventListener('click', function(event) {
    if (event.target.closest('.inner-dialog')) event.stopPropagation();
});

loadingScreen.addEventListener('click', e => e.stopPropagation());
loadingScreen.addEventListener('cancel', e => e.preventDefault());

async function init() {
    setSearchAmountSelection();
    openLoadingScreen();
    dex.innerHTML = "";
    await fetchAllSourcesFromRemote(fetchLimit);
    await renderCards(globalStartIndex, renderLimit);
    await fetchAllTypesFromRemote();
    if (fetchError) {
        loadMoreBtnsSection.style.display = "none";
    }else {
        loadMoreBtnsSection.style.display = "flex";
    }
}

function setSearchAmountSelection() {
    for (let i = 1; i <= 5; i++) {
        const opt = document.createElement('option')
        opt.value = i*10;
        opt.textContent = i*10;
        searchAmount.appendChild(opt)
    }
}
    
async function renderCards(startIndex, count) {
    const endIndex = startIndex + count;
    for (let index = startIndex; index < endIndex; index++) {
        let currentPokemonInfos = pokemons.results[index];
        try {
            const pokemon = await fetchSinglePokemonFromRemote(currentPokemonInfos.url);
            let typesString = "";
            for (let i = 0; i < pokemon.types.length; i++) {
                typesString = generateTypeString(i, pokemon, typesString);
            }
            setCardInfos(pokemon, typesString);
        } catch (error) {
            showFetchError(error);
            fetchError = true;
        }
    }
    closeLoadingScreen();
}

function setCardInfos(pokemon, typesString) {
    dex.innerHTML += getSmallPokemonCardTemplate(
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
    openLoadingScreen()
    globalStartIndex = globalStartIndex + 10;
    renderCards(globalStartIndex, 10);
}

async function searchPokemon() {
    maxElementsSearch = searchAmount.value;
    if (searchBar.value.length >= 3) {
        notEnoughLetters.classList.remove('visible');
        openLoadingScreen();
        if (searchBar.value) {
            const query = searchBar.value;
            const queryFilter = searchCategory.value;
            filterSearchedPokemons(query.toLowerCase(), queryFilter);
            loadMoreBtnsSection.style.display = "none";
        } 
    }else {
        notEnoughLetters.classList.add('visible');
    }
}

async function filterSearchedPokemons(query, queryFilter) {
    function checkPokemonName(pokemon) {
        return pokemon.name.includes(query);
    }
    function checkPokemonType(type) {
        return type.name.includes(query);
    }
    if (queryFilter == "name") {
        const filtered = pokemons.results.filter(checkPokemonName);  
        const pokemonsFromName = await getAllPokemonUrlsForNames(filtered);      
        renderSearchedPokemons(pokemonsFromName);
    } else if (queryFilter == "type") {  
        const filtered = pokemonTypes.filter(checkPokemonType);
        const pokemonsFromType = await getAllPokemonUrlsForTypes(filtered);        
        renderSearchedPokemons(pokemonsFromType);
    }
}

async function getAllPokemonUrlsForNames(filtered) {
    const allPokemonUrls = [];
    for (let i = 0; i < filtered.length; i++) {
        allPokemonUrls.push(filtered[i].url);
    }

    return allPokemonUrls;
}

async function getAllPokemonUrlsForTypes(filtered) {
    const allPokemonUrls = [];
    for (let i = 0; i < filtered.length; i++) {
        const url = await fetchSingleTypeFromRemote(filtered[i].url);
        const pokemons = url.pokemon;        
        for (let i = 0; i < pokemons.length; i++) {
            allPokemonUrls.push(pokemons[i].pokemon.url);
        }
    }
    return allPokemonUrls;
}

async function renderSearchedPokemons(filtered) {
    dex.innerHTML = "";
    setMaxElementsSearchValue(filtered.length);
    for (let index = 0; index < maxElementsSearch; index++) {
        let currentPokemonInfos = filtered[index];        
        const pokemon = await fetchSinglePokemonFromRemote(currentPokemonInfos);        
        let typesString = "";
        for (let i = 0; i < pokemon.types.length; i++) {
            typesString = generateTypeString(i, pokemon, typesString);
        }
        setCardInfos(pokemon, typesString);
    }
    closeLoadingScreen();
    searchResetBtn.style.display = "block";
}

function setMaxElementsSearchValue(value) {
    if (maxElementsSearch > value) {
        maxElementsSearch = value;
    }
    if (value == 0) {
        searchError.classList.add("visible");
    }
}

function resetSearch() {
    searchResetBtn.style.display = "none";
    searchError.classList.remove("visible");
    searchBar.value = null;
    init();
}

async function openPokemonCardDialog(id) {
    const pokemon = await fetchSinglePokemonFromRemote(BASE_API_URL+"pokemon/"+id);
    dialogSection.style.display = 'block';
    pokemonCardDialog.classList.add("opened");
    pokemonCardDialog.innerHTML = "";
    pokemonCardDialog.innerHTML = await getBigPokemonCardTemplate(pokemon);
    pokemonCardDialog.showModal();
    switchStat(0);
}

function closePokemonCardDialog() {
    dialogSection.style.display = 'none';
    pokemonCardDialog.classList.remove("opened");
    pokemonCardDialog.innerHTML = "";
    pokemonCardDialog.close();
}

function capWords(str) {
    return str
        .split(/[-\s]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('-');
}

function getAllPokemonAbilities(abilities) {
    let allAbilities = [];
    for (let i = 0; i < abilities.length; i++) {
        allAbilities[i] = capWords(abilities[i]["ability"]["name"].toString());
    }
    return allAbilities;
}

function switchStat(index) {
    let statsMenu = resetStatsMenue();
    const spans = statsMenu.querySelectorAll("span");
    if (spans[index]) {
        spans[index].classList.add('active');
    }
    showStat(index);
}

function resetStatsMenue() {
    const statsMenu = document.getElementById("stats-menue");
    statsMenu.querySelectorAll("span").forEach(span => {
        span.classList.remove('active');
    });
    return statsMenu;
}

function showStat(statIndex) {
    const statsContent = document.getElementById('stats-content');
    const sections = statsContent.querySelectorAll('#main-stats, #battle-stats, #evo-chain');
    sections.forEach(sec => sec.classList.remove('active'));

    let target;
    switch (statIndex) {
        case 0:  target = statsContent.querySelector('#main-stats');   break;
        case 1:  target = statsContent.querySelector('#battle-stats'); break;
        case 2:  target = statsContent.querySelector('#evo-chain');    break;
        default: target = statsContent.querySelector('#main-stats');   break;
    }
    if (target) {
        target.classList.add('active');
    }
}

async function getEvoChainData(id) {
    const pokemon = await fetchSinglePokemonFromRemote(BASE_API_URL+"pokemon/"+id);
    const speciesResponse = await fetch(pokemon.species.url);
    const speciesData = await speciesResponse.json();
    const evoResponse = await fetch(speciesData.evolution_chain.url);
    const evoData = await evoResponse.json();
    
    return evoData.chain;
}

async function getEvoChain(id) {
  let chain = await getEvoChainData(id);
  const evoList = [];
  while (chain) {
    evoList.push(chain.species.name);
    chain = chain.evolves_to[0] ?? null;
  }
  
  return evoList;
}

async function renderEvoChain(id) {    
    const evoChain = await getEvoChain(id);    
    let evoChainHtml = document.createElement("div");  
    evoChainHtml.className = "evo-chain-rendered";
    for (let i = 0; i < evoChain.length; i++) {
        const pokemon = await fetchSinglePokemonFromRemote(BASE_API_URL+"pokemon/"+evoChain[i]);
        evoChainHtml.innerHTML += getEvoCardTemplate(pokemon);
    }
    
    return evoChainHtml.outerHTML;
}

function openLoadingScreen() {
    body.style.overflow = "hidden";
    dialogSection.style.display = 'block';
    loadingScreen.showModal();
}

function closeLoadingScreen() {
    dialogSection.style.display = 'none';
    if (loadingScreen.open) loadingScreen.close();
    body.style.overflowY = "scroll";
}