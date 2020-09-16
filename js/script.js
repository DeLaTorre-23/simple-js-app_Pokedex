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

//Print the name and height of the pokemon and print the 'height average' of the pokemon
/*
for (let i=0; i< pokemonList.length; i++){
  let printPokemonList = (pokemonList[i].name + " (height: " + pokemonList[i].height + " metres)");
  let bigHeight = ' - Wow, that\'s big!';

  if (pokemonList[i].height > 1.7) {
    document.write("<p>" + printPokemonList + bigHeight + "</p>");
  } else {
    document.write("<p>" + printPokemonList + "</p>");
  }
}
*/

pokemonList.forEach(function(pokemon) {
  let bigHeight = ' - Wow, that\'s big!';
  if (pokemon.height > 1.7) {
    document.write("<p>" + pokemon.name + " (Height: " + pokemon.height + " metre.) " + " Type: " + pokemon.types + " " + bigHeight + "</p>");
  } else {
    document.write("<p>" + pokemon.name + " (Height: " + pokemon.height + " metre.) " + " Type: " + pokemon.types + " " + "</p>");
  }
});
