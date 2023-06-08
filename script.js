
let currentPokemon = [];
let allPokemon = [];
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


  let searchResults = allPokemon.filter(pokemon => {
    let pokemonName = pokemon['name'].toLowerCase();
    return pokemonName.includes(searchTerm);
  });

  if (searchResults.length === 0) {
    let url = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;
    let response = await fetch(url);
    let pokemonData = await response.json();

    searchResults.push(pokemonData);
  }

  searchResults.forEach(pokemon => {
    let pokemonName = pokemon['name'];
    let species = pokemon['types'][0]['type']['name'];
    let pokemonImage = pokemon['sprites']['other']['dream_world']['front_default'];
    let weight = pokemon['weight'];

    showSearchedPokemon(pokemonName, species, pokemonImage, weight);
  });
}


function showSearchedPokemon(name, species, image, weight) {
  let searchedPokemon = document.getElementById('clickedPokemon');
  let backgroundColor = setPokemonBackgroundColor(species);
  clickedPokemon.style.display = 'block';
  clickedPokemon.innerHTML = '';

  clickedPokemon.innerHTML += `
  <div class="currentPokemonContainer" onclick="removeSearcedPokemon()" style="background-color: ${backgroundColor}">
      <img src=" ${image}" alt="">
      <h1>${capitalizeFirstLetter(name)}</h1>
      <h3>Type: ${capitalizeFirstLetter(species)}</h3>  
      <h3>Weight: ${weight}</h3>  
  </div>`;
}

function removeSearcedPokemon() {
  document.getElementById('clickedPokemon').style.display = 'none';
  document.querySelector('.currentPokemonContainer').style.display = 'none';
}


window.addEventListener('scroll', function () {
  if ((document.documentElement.scrollHeight - window.innerHeight) === Math.ceil(window.scrollY)) {
    const start = allPokemon.length;
    const end = Math.min(start + 15, 800);
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

    let pokemonName = allPokemon[i]['name'];
    let type1 = allPokemon[i]['types'][0]['type']['name'];
    let type2 = allPokemon[i]['types'][1] ? capitalizeFirstLetter(allPokemon[i]['types'][1]['type']['name']) : null;
    let species = type2 ? `${type1}, ${type2}` : type1;
    let pokemonImage = allPokemon[i]['sprites']['other']['dream_world']['front_default'];
    let pokemonWeight = allPokemon[i]['weight'];
    let order = allPokemon[i]['moves']['order'];

    showPokemon(pokemonName, species, pokemonImage, pokemonWeight);
  }
}

function showPokemon(name, species, image, pokemonWeight) {
  let pokemonContainer = document.getElementById('pokemonContainer');
  let backgroundColor = setPokemonBackgroundColor(species);

  pokemonContainer.innerHTML += `
       <div class="pokemonCard"  onclick="showPokemonData('${name}', '${species}', '${image}', ${pokemonWeight})" " style="background-color: ${backgroundColor}">
            <h2>${capitalizeFirstLetter(name)} </h2>
            <img src="${image}" alt="">
            <h3>Type: ${capitalizeFirstLetter(species)}</h3>
            <h3>Weight: ${pokemonWeight} lb</h3>
       </div>     
    `;
}

function showPokemonData(name, species, image, pokemonWeight) {
  let data = document.getElementById('searchedPokemon');
  let backgroundColor = setPokemonBackgroundColor(species);
  data.style.display = 'block';
  data.innerHTML = ``;

  data.innerHTML = `
  <div class="clickedPokemonCard"  onclick="removePokemonCard()" style="background-color: ${backgroundColor}">
       <h1>${capitalizeFirstLetter(name)} </h1>
       <img src="${image}" alt="">
       <h2>Type: ${capitalizeFirstLetter(species)}</h2>
       <h2>Weight: ${pokemonWeight} lb</h2>
  </div>     
`;

}

function removePokemonCard() {
  document.getElementById('searchedPokemon').data.style.display = 'none';
  document.querySelector('.clickedPokemonCard').style.display = 'none';
}





