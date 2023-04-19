const pokemonList = document.getElementById('pokemonList');
const pokemonSecondList = document.getElementById('pokemon-second-list');
const pokemonInfo = document.getElementById('pokemonInfo');
const loader = document.getElementById('loader');
const modal = document.getElementById('modal');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const modalContent = document.getElementById('modal-content');
const modalPokemonInfo = document.createElement('div');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');


async function getPokemonList(url = 'https://pokeapi.co/api/v2/pokemon/') {
  loader.style.display = 'block';
  const response = await fetch(url);
  const data = await response.json();
  let i = 1;
  pokemonList.innerHTML = "";
  pokemonSecondList.innerHTML = "";
  data.results.forEach(pokemon => {
    const listItem = document.createElement('li');
    listItem.id = 'pokemon'
    listItem.textContent = i + ' ' + pokemon.name;    
    i++    
    listItem.addEventListener('click', () => getPokemonDetails(pokemon.url));
    listItem.setAttribute('data-bs-target', "#modal");
    listItem.setAttribute('data-bs-toggle', "modal");
    if (i <= 11) {
      pokemonList.appendChild(listItem);
    } else {pokemonSecondList.appendChild(listItem);
    }    
  });
  previous.disabled = !data.previous;
  next.disabled = !data.next
  previous.addEventListener('click', () => getPokemonList(data.previous));
  next.addEventListener('click', () => getPokemonList(data.next));
  loader.style.display = 'none';
};


async function getPokemonDetails(url) {
  modalTitle.innerHTML = '';
  modalBody.innerHTML = '';
  loader.style.display = 'block';
  const response = await fetch(url);
  const data = await response.json();
  const id = data.id;
  const picture = data.sprites.front_default;
  const height = data.height;
  const weight = data.weight;
  const nameArray = data.forms[0];
  const name = nameArray.name;
  const types = data.types;
  let typeNameList = document.createElement('ul');

  
  types.forEach(type => {
    const typeName = document.createElement('li');
    typeName.textContent = type.type.name;
    typeNameList.appendChild(typeName);
  });

  modalTitle.innerHTML = `<img src="${picture}"> `
  modalBody.innerHTML = `       
    <p>ID: ${id}</p>
    <p>Name: ${name}</p>
    <p>Type: ${typeNameList.outerHTML}</p>
    <p>Height: ${height}</p>
    <p>Weight: ${weight}</p>`;
    loader.style.display = 'none';
};



getPokemonList();