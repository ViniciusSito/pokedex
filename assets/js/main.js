const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const limit = 10;
const maxRecords = 151; // limite da primeira geracao; evita pedir pagina vazia na API
let offset = 0;

/**
 * Monta o HTML de um card. O espaco entre "pokemon" e o tipo e obrigatorio:
 * sem ele o navegador entende uma unica classe ("pokemongrass") e nenhuma
 * regra de pokedex.css e aplicada (card sem cor, sem flex, sem espacamento).
 */
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
    // offset/limit precisam ser repassados, senao toda pagina traz os mesmos pokemons
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        // ultima pagina: busca so o que falta e some com o botao
        loadPokemonItens(offset, maxRecords - offset);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});
