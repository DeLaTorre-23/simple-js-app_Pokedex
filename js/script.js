//IIFE protecting the repository array of pokemon
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=649';

  //Add pokemons to the repository if the parametres are okey
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon
      //&&
      //'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      document.write('This pokemon is not correct');
    }
  }

  function getAll() {
    return pokemonList;
  }

  //Add pokemons to the HTML file building a 'li' & 'button'
  function addListPokemon(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listOfPokemon = document.createElement('li');
    let button = document.createElement('button');

    pokemonList.append(listOfPokemon);
    listOfPokemon.append(button);

    button.innerText = pokemon.name;
    button.classList.add('btn');
    button.classList.add('btn-light');
    button.classList.add('button-list');

    //Console.log the pokemon that I kicked click on the list
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  // Importing List of Pokemon from API
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  // Import the List of details about Pokemon List from API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
        item.name = details.name;
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = details.abilities;
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  // Print the List of details about Pokemon List from API
  function showDetails(pokemon) {
    loadDetails(pokemon).then(res => {
      showModal(pokemon);
    });
  }

  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalHeader = $('.modal-header');
    let modalTitle = $('.modal-title');
    // Implementing modal Container
    $('#modal-container').modal('show');
    let btnClose = $('#btnClose');

    modalHeader.empty();
    modalTitle.empty();
    modalBody.empty();

    //creating element for name in modal textContent
    let nameElement = $('<h3>' + item.name + '</h3>');

    //creating img modal textContent
    let imageElement = $('<img class="modal-img">');
    imageElement.attr('src', item.imageUrl);

    //creating element for height in modal textContent
    let heightElement = $('<p>' + 'Height : ' + item.height + '</p>');

    //creating element for weight in modal textContent
    let weightElement = $('<p>' + 'Weight : ' + item.weight + '</p>');

    //creating element for type in modal conetnt
    let typesElement = document.createElement('p');
    item.types.forEach(function(el, index) {
      if (item.types.length - 1 == index) {
        typesElement.textContent += el.type.name;
      } else {
        typesElement.textContent += 'Types : ' + el.type.name + ', ';
      }
    });

    //creating element for abilities in modal content
    let abilitiesElement = document.createElement('p');
    item.abilities.forEach(function(el, index) {
      if (item.abilities.length - 1 == index) {
        abilitiesElement.textContent += el.ability.name;
      } else {
        abilitiesElement.textContent += 'Abilities : ' + el.ability.name + ', ';
      }
    });

    // modalHeader.append(modalTitle);
    modalHeader.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(typesElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(abilitiesElement);
    modalHeader.append(btnClose);
  }

  document.querySelector('button').addEventListener('click', () => {
    showModal();
  });

  return {
    add: add,
    getAll: getAll,
    addListPokemon: addListPokemon,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

// New Pokemon added to the Repository
//pokemonRepository.add ({ name: 'Picachu', height: 0.4, types: ['electric']});
//pokemonRepository.add ({ name: 'Raichu', height: 0.8, types: ['electric']});

// This function create the element <li> & <button> inside of the HTML file to interact with.
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListPokemon(pokemon);
  });
});
