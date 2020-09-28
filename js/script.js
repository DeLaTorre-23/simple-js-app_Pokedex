// IIFE protecting the repository array of pokemon
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=6';

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
    button.classList.add('btn');
    button.classList.add('btn-light');
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
      item.weight = details.weight;
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
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');
    // Implementing modal Container
    let modalContainer = $('#modal-container');

    modalHeader.empty();
    modalTitle.empty();
    modalBody.empty();

    //creating element for name in modal textContent
    let nameElement = $("<h3>" + item.name + "</h3>");

    //creating img modal textContent
    let imageElement = $('<img class="modal-img">');
    imageElement.attr("src", item.imageUrl);

    //creating element for height in modal textContent
    let heightElement = $("<p>" + "Height : " + item.height + "</p>");

    //creating element for weight in modal textContent
    let weightElement = $("<p>" + "Weight : " + item.weight + "</p>");

    //creating element for type in modal conetnt
    let typesElement = document.createElement("p");
    item.types.forEach(function (el, index) {
      if (item.types.length - 1 == index) {
        typesElement.textContent += el.type.name;
      } else {
        typesElement.textContent += ("Types : " + el.type.name + ", ");
      }
    });

    //creating element for abilities in modal content
    let abilitiesElement = $("<p>" + "Abilities : " + item.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(typesElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(abilitiesElement);
    // modalBody.append(nameElement);


    // Implementing modal Container
    // modalContainer.innerHTML = '';
    //
    // let modal = document.createElement('div');
    // modal.classList.add('modal');
    //
    // let closeButtonElement = document.createElement('button');
    // closeButtonElement.classList.add('modal-close');
    // closeButtonElement.innerText = ('Close');
    // closeButtonElement.addEventListener('click', hideModal);
    //
    // let titleElement = document.createElement('h1');
    // titleElement.innerText = item.name;
    //
    // let imageElement = document.createElement('img');
    // imageElement.src = item.imageUrl;
    //
    //
    // let typesElement = document.createElement("p");
    // it is an array you need to loop through it
    // item.types.forEach(function (el, index) {
    //   if (item.types.length - 1 == index) {
    //     typesElement.textContent += el.type.name;
    //   } else {
    //     typesElement.textContent += el.type.name + ", ";
    //   }
    // });
    //
    // let heightElement = document.createElement('p');
    // heightElement.innerText = ('Height: ' + item.height);
    //
    // modal.appendChild(closeButtonElement);
    // modal.appendChild(titleElement);
    // modal.appendChild(imageElement);
    // modal.appendChild(typesElement);
    // modal.appendChild(heightElement);
    // modalContainer.appendChild(modal);
    //
    // modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  // modalContainer.addEventListener('click', (e) => {
  //   let target = e.target;
  //   if (target === modalContainer) {
  //     hideModal();
  //   }
  // });

  document.querySelector('button').addEventListener('click', () => {
    showModal(item.name, item.types, item.height, item.weight, item.imageUrl);
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
