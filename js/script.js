// IIFE protecting the repository array of pokemon
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

    pokemonList.appendChild(listOfPokemon);
    listOfPokemon.appendChild(button);

    button.innerText = pokemon.name;
    button.classList.add('button-list');

    //Console.log the pokemon that I kicked click on the list
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  // Importing List of Pokemon from API
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // Import the List of details about Pokemon List from API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {

      // Now we add the details to the item
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Print the List of details about Pokemon List from API
  function showDetails(pokemon) {
    console.log(pokemon);
    loadDetails(pokemon).then(res => {
      showModal(pokemon);
    });
  }

  let modalContainer = document.querySelector('#modal-container');
  function showModal(item) {

    // Implementing modal Container
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = ('Close');
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = item.name;

    let imageElement = document.createElement('img');
    imageElement.src = item.imageUrl;

    // let typesElement = document.createElement('p');
    // typesElement.innerText = (JSON.stringify('Types: ' + item.types));

    let typesElement = document.createElement("p");
    //it is an array you need to loop through it
    item.types.forEach(function (el, index) {
      if (item.types.length - 1 == index) {
        typesElement.textContent += el.type.name;
      } else {
        typesElement.textContent += el.type.name + ", ";
      }
    });

    let heightElement = document.createElement('p');
    heightElement.innerText = ('Height: ' + item.height);

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(typesElement);
    modal.appendChild(heightElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  document.querySelector('button').addEventListener('click', () => {
    showModal(pokemon.name, pokemon.types, pokemon.height);
  });

  return {
    add: add,
    getAll: getAll,
    addListPokemon: addListPokemon,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

// New Pokemon added to the Repository
//pokemonRepository.add ({ name: 'Picachu', height: 0.4, types: ['electric']});
//pokemonRepository.add ({ name: 'Raichu', height: 0.8, types: ['electric']});

console.log(pokemonRepository.getAll());

// This function create the element <li> & <button> inside of the HTML file to interact with.
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListPokemon(pokemon);
  });
});
