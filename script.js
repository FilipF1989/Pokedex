
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

  return colorMap[species] || 'lightgray';
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

  let searchResults = [];

  allPokemon.forEach(pokemon => {
    let pokemonName = pokemon['name'].toLowerCase();
    if (pokemonName.includes(searchTerm)) {
      searchResults.push(pokemon);
    }
  });

  if (searchResults.length === 0) {
    let url = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;
    let response = await fetch(url);

    if (response.ok) {
      let pokemonData = await response.json();
      searchResults.push(pokemonData);
    } else {
      console.log('Fehler beim Laden der Pokemon-Daten');
      return;
    }
  }

  searchResults.forEach(pokemon => {
    let pokemonName = pokemon['name'];
    let species = pokemon['types'][0]['type']['name'];
    let pokemonImage = pokemon['sprites']['other']['dream_world']['front_default'];
    let weight = pokemon['weight'];

    showSearchedPokemon(pokemonName, species, pokemonImage);
  });
}




function showSearchedPokemon(name, species, image) {
  let searchedPokemon = document.getElementById('searchedPokemon');
  searchedPokemon.style.display = 'block';
  searchedPokemon.innerHTML = '';

  searchedPokemon.innerHTML = `
  <div class="currentPokemonContainer">
      <img src="${image}" alt="">
      <h1>${name}</h1>
      <div>${species}</div>  
  </div>`;
}


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
    showSearchedPokemon(pokemonName, species, pokemonImage);
  });
}


async function loadAllPokemon() {
  for (let i = 0; i < 50; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
    let response = await fetch(url);
    pokemonAsJSON = await response.json();
    allPokemon.push(pokemonAsJSON);
    currentPokemon.push(allPokemon[i]['name']);
    console.log(allPokemon[0]);


    let pokemonName = allPokemon[i]['name'];
    let species = allPokemon[i]['types'][0]['type']['name'];
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
       <div class="pokemonCard" onclick="showPokemonData(name, species, image, pokemonWeight) " style="background-color: ${backgroundColor}">
            <h2>${capitalizeFirstLetter(name)} </h2>
            <img src="${image}" alt="">
            <h3>Species: ${capitalizeFirstLetter(species)}</h3>
            <h3>Weight: ${pokemonWeight} lb</h3>
       </div>     
    `;
}

function showPokemonData(name, species, image, pokemonWeight) {
  let data = document.getElementById('searchedPokemon');
  data.style.display = 'block';
  data.innerHTML = '';

  data.innerHTML = '';

}
