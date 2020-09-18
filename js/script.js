// IIFE protecting the repository array of pokemon
let pokemonRepository = (function () {
  let repository = [
    {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
    {name: 'Ivysaur', height: 1, types: ['grass', 'poison']},
    {name: 'Venusaur', height: 2, types: ['grass', 'poison']},
    {name: 'Charmander', height: 0.6, types: ['fire']},
    {name: 'Charmeleon', height: 1.1, types: ['fire']},
    {name: 'Charizard', height: 1.7, types: ['fire', 'flying']},
    {name: 'Squirtle', height: 0.5, types: ['water']},
    {name: 'Wartortle', height: 1, types: ['water']},
    {name: 'Blastoise', height: 1.6, types: ['water']}
  ];

  //Add pokemons to the repository if the parametres are okey
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'height' in pokemon &&
      'types' in pokemon
    ) {
      repository.push(pokemon);
    } else {
      document.write('This pokemon is not correct');
    }
  }

  function getAll() {
    return repository;
  }

  //Add pokemons to the HTML file building a 'li' & 'button'
  function addListPokemon(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listOfPokemon = document.createElement('li');
    let button = document.createElement('button');
    pokemonList.appendChild(listOfPokemon);
    listOfPokemon.appendChild(button);
    button.innerText = pokemon.name;
    button.classList.add('button-list');

    //Console.log the pokemon that I kicked click on the list
    button.addEventListener('click', function (event) {
      console.log(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListPokemon: addListPokemon
  };
})();

// New Pokemon added to the Repository
pokemonRepository.add ({ name: 'Picachu', height: 0.4, types: ['electric']});
pokemonRepository.add ({ name: 'Raichu', height: 0.8, types: ['electric']});

console.log(pokemonRepository.getAll());

// This function create the element <li> & <button> inside of the HTML file.
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListPokemon(pokemon);
});


// function SizePokemonList (item) {
//   let bigHeight = ' - Wow, that\'s big!';
//   if (item.height > 1.7) {
//     document.write("<p>" + item.name + " (Height: " + item.height + " metre.) " + " Type: " + item.types + " " + bigHeight + "</p>");
//   } else {
//     document.write("<p>" + item.name + " (Height: " + item.height + " metre.) " + " Type: " + item.types + " " + "</p>");
//   }
// };
//
// pokemonRepository.getAll().forEach(SizePokemonList);


/*
// This function write a message how big is the pokemon.
function SizePokemonList (item) {
  let bigHeight = ' - Wow, that\'s big!';
  if (item.height > 1.7) {
    document.write("<p>" + item.name + " (Height: " + item.height + " metre.) " + " Type: " + item.types + " " + bigHeight + "</p>");
  } else {
    document.write("<p>" + item.name + " (Height: " + item.height + " metre.) " + " Type: " + item.types + " " + "</p>");
  }
};

pokemonRepository.add ({ name: 'Picachu', height: 0.4, types: ['electric']});
pokemonRepository.add ({ name: 'Raichu', height: 0.8, types: ['electric']});
pokemonRepository.getAll().forEach(SizePokemonList);
*/
