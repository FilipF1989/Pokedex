
let currentPokemon = [];
let allPokemon = [];
searchResults = [];

let userHeight = 50;


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function setPokemonBackgroundColor(species) {
  const colorMap = {
    fire: 'red',
    water: 'lightblue',
    grass: 'rgb(155,204,80)',
    electric: 'rgb(238,213,53)',
    rock: 'rgb(163,140,33)',
    bug: 'rgb(114,159,63)',
    fighting: 'rgb(213,103,35)',
    psyhchic: 'rgb(243,102,185)',
    poison: 'rgb(185,127,201)',
    ground: 'rgb(171,152,66)',
    dragon: 'rgb(83,164,207)',
  };

  const types = species.split(', ');
  const firstType = types[0];

  return colorMap[firstType] || 'lightgray';
}

let searchInput = document.getElementById('searchPokemon');
searchInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    performSearch();
  }
});


async function performSearch() {
  let searchInput = document.getElementById('searchPokemon').value;
  let searchTerm = searchInput.toLowerCase();


  allPokemon.filter(pokemon => {
    let pokemonName = pokemon['name'].toLowerCase();
    if (pokemonName.includes(searchTerm)) {
      searchResults.push(pokemon);
    }
  });

  if (searchResults.length === 0) {
    let url = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;
    let response = await fetch(url);
    let pokemonData = await response.json();
    searchResults.push(pokemonData);
  }

  getSearchedData(searchResults);
}

function getSearchedData(searchResults) {
  for (let i = 0; i < searchResults.length; i++) {
    let pokemonHP = searchResults[i]['stats'][0]['base_stat'];
    let pokemonAttack = searchResults[i]['stats'][1]['base_stat'];
    let pokemonDefense = searchResults[i]['stats'][2]['base_stat'];
    let pokemonSpecialAttack = searchResults[i]['stats'][3]['base_stat'];
    let pokemonSpecialDefense = searchResults[i]['stats'][4]['base_stat'];
    let pokemonSpeed = searchResults[i]['stats'][5]['base_stat'];
    let pokemonHeight = searchResults[i]['height'];
    let pokemonName = searchResults[i]['name'];
    let type1 = searchResults[i]['types'][0]['type']['name'];
    let type2 = searchResults[i]['types'][1] ? capitalizeFirstLetter(allPokemon[i]['types'][1]['type']['name']) : null;
    let species = type2 ? `${type1}, ${type2}` : type1;
    let pokemonImage = searchResults[i]['sprites']['other']['dream_world']['front_default'];
    let pokemonWeight = searchResults[i]['weight'];

    showSearchedPokemon(pokemonName, species, pokemonImage, pokemonWeight, pokemonHeight, pokemonHP, pokemonAttack, pokemonDefense, pokemonSpecialAttack, pokemonSpecialDefense, pokemonSpeed);
  };
}


function showSearchedPokemon(pokemonName, species, pokemonImage, pokemonWeight, pokemonHeight, pokemonHP, pokemonAttack, pokemonDefense, pokemonSpecialAttack, pokemonSpecialDefense, pokemonSpeed) {
  let searchedPokemon = document.getElementById('clickedPokemon');
  let backgroundColor = setPokemonBackgroundColor(species);
  searchedPokemon.style.visibility = 'visible';
  searchedPokemon.style.zIndex = '7';
  searchedPokemon.innerHTML = '';

  searchedPokemon.innerHTML += `
  <div class="currentPokemonContainer" onclick="removeSearcedPokemon()" style="background-color: ${backgroundColor}">
     <h1>${capitalizeFirstLetter(pokemonName)} </h1>
      <img src="${pokemonImage}" alt="">
      <h3>Type: ${capitalizeFirstLetter(species)}</h3>
      <h3>Weight: ${pokemonWeight} lb</h3>
      <h3>Height: ${pokemonHeight} ft</h3>
       <h3 class="pokemonStats">HP:${pokemonHP} </h3>
       <h3 class="pokemonStats">ATTACK: ${pokemonAttack}</h3>
       <h3 class="pokemonStats">DEFENSE: ${pokemonDefense}</h3>
       <h3 class="pokemonStats">SPECIAL ATTACK: ${pokemonSpecialAttack}</h3>
       <h3 class="pokemonStats">SPECIAL DEFENSE: ${pokemonSpecialDefense}</h3>
       <h3 class="pokemonStats">POKEMON SPEED: ${pokemonSpeed}</h3> 
  </div>`;
}

function removeSearcedPokemon() {
  document.getElementById('clickedPokemon').style.visibility = 'hidden';
  document.getElementById('clickedPokemon').style.zIndex = '-3';
  document.querySelector('.currentPokemonContainer').style.display = 'none';
}


window.addEventListener('scroll', function () {
  if ((document.documentElement.scrollHeight - window.innerHeight) === Math.ceil(window.scrollY)) {
    const start = allPokemon.length;
    const end = Math.min(start + 7, 800);
    loadAllPokemon(start, end);
  }
});




function loadAllPokemonOnLoad() {
  const start = 0;
  const end = Math.min(start + 50, 800);
  loadAllPokemon(start, end);
}

async function loadAllPokemon(start, end) {
  for (let i = start; i < end; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
    let response = await fetch(url);
    pokemonAsJSON = await response.json();
    allPokemon.push(await pokemonAsJSON);
    currentPokemon.push(allPokemon[i]['name']);

    readDataFromAPI(i)
  }
}

async function readDataFromAPI(i) {
  let pokemonHP = allPokemon[i]['stats'][0]['base_stat'];
  let pokemonAttack = allPokemon[i]['stats'][1]['base_stat'];
  let pokemonDefense = allPokemon[i]['stats'][2]['base_stat'];
  let pokemonSpecialAttack = allPokemon[i]['stats'][3]['base_stat'];
  let pokemonSpecialDefense = allPokemon[i]['stats'][4]['base_stat'];
  let pokemonSpeed = allPokemon[i]['stats'][5]['base_stat'];
  let pokemonHeight = allPokemon[i]['height'];
  let pokemonName = allPokemon[i]['name'];
  let type1 = allPokemon[i]['types'][0]['type']['name'];
  let type2 = allPokemon[i]['types'][1] ? capitalizeFirstLetter(allPokemon[i]['types'][1]['type']['name']) : null;
  let species = type2 ? `${type1}, ${type2}` : type1;
  let pokemonImage = allPokemon[i]['sprites']['other']['dream_world']['front_default'];
  let pokemonWeight = allPokemon[i]['weight'];
  let order = allPokemon[i]['moves']['order'];

  showPokemon(pokemonName, species, pokemonImage, pokemonWeight, pokemonHeight, pokemonHP, pokemonAttack, pokemonDefense, pokemonSpecialAttack, pokemonSpecialDefense, pokemonSpeed);
}

function showPokemon(name, species, image, pokemonWeight, pokemonHeight, pokemonHP, pokemonAttack, pokemonDefense, pokemonSpecialAttack, pokemonSpecialDefense, pokemonSpeed) {
  let pokemonContainer = document.getElementById('pokemonContainer');
  let backgroundColor = setPokemonBackgroundColor(species);

  pokemonContainer.innerHTML += `
       <div class="pokemonCard"  onclick="showPokemonData('${name}', '${species}', '${image}', ${pokemonWeight}, ${pokemonHeight}, ${pokemonHP}, ${pokemonAttack}, ${pokemonDefense}, ${pokemonSpecialAttack}, ${pokemonSpecialDefense}, ${pokemonSpeed})" " style="background-color: ${backgroundColor}">
            <h2>${capitalizeFirstLetter(name)} </h2>
            <img src="${image}" alt="">
            <h3>Type: ${capitalizeFirstLetter(species)}</h3>
            <h3>Weight: ${pokemonWeight} lb</h3>
            <h3>Height: ${pokemonHeight} ft</h3>
       </div>     
    `;
}

function showPokemonData(name, species, image, pokemonWeight, pokemonHeight, pokemonHP, pokemonAttack, pokemonDefense, pokemonSpecialAttack, pokemonSpecialDefense, pokemonSpeed) {
  let data = document.getElementById('searchedPokemon');
  let backgroundColor = setPokemonBackgroundColor(species);
  data.style.visibility = 'visible';
  data.style.zIndex = '3';
  data.innerHTML = ``;

  data.innerHTML = `
  <div class="clickedPokemonCard"  onclick="removePokemonCard()" style="background-color: ${backgroundColor}">
       <h1>${capitalizeFirstLetter(name)} </h1>
       <img src="${image}" alt="">
       <h2>Type: ${capitalizeFirstLetter(species)}</h2>
       <h2>Weight: ${pokemonWeight} lb</h2>
       <h2>Height: ${pokemonHeight} ft</h2>
         <h3 class="pokemonStats">HP:${pokemonHP} </h3>
         <h3 class="pokemonStats">ATTACK: ${pokemonAttack}</h3>
         <h3 class="pokemonStats">DEFENSE: ${pokemonDefense}</h3>
         <h3 class="pokemonStats">SPECIAL ATTACK: ${pokemonSpecialAttack}</h3>
         <h3 class="pokemonStats">SPECIAL DEFENSE: ${pokemonSpecialDefense}</h3>
         <h3 class="pokemonStats">POKEMON SPEED: ${pokemonSpeed}</h3>
  </div>     
`;

}

function removePokemonCard() {
  document.getElementById('searchedPokemon').style.visibility = 'hidden';
  document.getElementById('searchedPokemon').style.zIndex = '-3';
  document.querySelector('.clickedPokemonCard').style.display = 'none';
}


window.addEventListener('scroll', () => {
  let scrollToTopButton = document.getElementById('scrollToTopButton');
  {
    if (document.documentElement.scrollTop > 0) {
      scrollToTopButton.style.display = 'block';
    } else {
      scrollToTopButton.style.display = 'none';
    }
  }
})

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}












