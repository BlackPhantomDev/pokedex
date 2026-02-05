const dex = document.getElementById("pokemon-cards");
const searchBar = document.getElementById("search-input");
const searchCategory = document.getElementById("search-category");
const dialogSection = document.getElementById("dialog-section");
const pokemonCardDialog = document.getElementById("pokemon-card-complete");
const loadMoreBtnsSection = document.getElementById("load-more-btns");

let fetchLimit = 1000;
let renderLimit = 10;
let globalStartIndex = 0;
let fetchError = false;

const API_URL = "https://pokeapi.co/api/v2/";

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

async function init() {
    dex.innerHTML = "";
    await fetchAllSourcesFromRemote(fetchLimit);
    if (fetchError) {
        loadMoreBtnsSection.style.display = "none";
    }else {
        loadMoreBtnsSection.style.display = "flex";
    }
    await renderCards(globalStartIndex, renderLimit);
    openPokemonCardDialog(1);
}
    
async function renderCards(startIndex, count) {
    const endIndex = startIndex + count;
    for (let index = startIndex; index < endIndex; index++) {
        let currentPokemonInfos = pokemons.results[index];
        const pokemon = await fetchSinglePokemonFromRemote(currentPokemonInfos.url);
        let typesString = "";
        for (let i = 0; i < pokemon.types.length; i++) {
            typesString = generateTypeString(i, pokemon, typesString);
        }
        setCardInfos(pokemon, typesString);
    }
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

async function openPokemonCardDialog(id) {
    const pokemon = await fetchSinglePokemonFromRemote(API_URL+"pokemon/"+id);
    dialogSection.style.display = 'block';
    pokemonCardDialog.classList.add("opened");
    pokemonCardDialog.innerHTML = "";
    pokemonCardDialog.innerHTML = getBigPokemonCardTemplate(pokemon);
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