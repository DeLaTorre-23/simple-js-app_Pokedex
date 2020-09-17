// IIFE protecting the repository array of pokemon
let pokemonRepository = (function () {
  let pokemonList = [
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
      pokemonList.push(pokemon);
    } else {
      document.write('This pokemon isn\'t correct');
    }
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

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
pokemonRepository.add ({ name: 'cullo', height: 0.8, types: ['electric']});
pokemonRepository.getAll().forEach(SizePokemonList);

//************** 1 - Why I can not add pokemon if I call the "NEXT FUNCTION" after to call the whole list? FUNCTION : (pokemonRepository.add ({ name: 'Picachu', height: 0.4, types: ['electric']});)***********
//************** 2 - Why If I use the "NEXT FUNCTION" doesn't print the pokemonList and appear instead ""[object,objcet], [object,objcet] (once for each bject of the array) ..."" in the screen? FUNCTION : document.write (pokemonRepository.getAll());***********
