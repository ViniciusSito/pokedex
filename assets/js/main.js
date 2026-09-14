const offset = 0
const limit = 10

const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

function convertPokemonToHtml(pokemon) {
    return `<li class="pokemon">
                <span class="number">#001</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        <li class="type">Grass</li>
                        <li class="type">Poison</li>
                    </ol>
                    <img src="https://img.pokemondb.net/sprites/black-white/normal/bulbasaur.png" alt="${pokemon.name}">
                </div>
            </li>
    `
}

const pokemonList = document.getElementById('pokemonList')
//o fetch nos retorna uma Promise, que é um objeto que representa a eventual 
// conclusão (ou falha) de uma operação assíncrona e seu valor resultante.

fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => {
        for (let i = 0; i < pokemons.length; i++) {
            const pokemon = pokemons[i]
            pokemonList.innerHTML += convertPokemonToHtml(pokemon)
        }
    })
    .catch((error) => console.error(error))