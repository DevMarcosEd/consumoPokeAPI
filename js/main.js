'use strict'

function limparDex(pokemonDex, pokemonSpecies) {
    document.getElementById('imagemPokemon').removeAttribute('src')
    document.getElementById('index').innerHTML = ''
    document.getElementById('type').innerHTML = ''
    document.getElementById('height').innerHTML = ''
    document.getElementById('weight').innerHTML = ''
    document.getElementById('region').innerHTML = ''
}

const preencherDex = (pokemonDex) => {
    // Sprite do pokemon
    let img = pokemonDex['sprites']['front_default']
    document.getElementById('imagemPokemon').setAttribute('src',img)

    // Numeração do Pokemon
    document.getElementById('index').innerHTML = '#'+pokemonDex.id

    // Tipo do pokemon
    let tipos = pokemonDex.types.length

    if (tipos == 1) {
        let tipoOne = pokemonDex['types']['0']['type']['name']
        document.getElementById('type').innerHTML = tipoOne
    } else {
        let tipoOne = pokemonDex['types']['0']['type']['name']
        let tipoTwo = pokemonDex['types']['1']['type']['name']
        document.getElementById('type').innerHTML = tipoOne + ' / ' + tipoTwo
    }

    // Altura do Pokemon
    document.getElementById('height').innerHTML = pokemonDex.height+'0cm'

    //Peso do pokemon
    let peso = pokemonDex.weight.toString()
    if (peso.length == 2) {
        let mascara = peso.replace(/^(\d{1})(\d{1})/, '$1.$2')
        document.getElementById('weight').innerHTML = mascara+'kg'
    } if (peso.length == 3) {
        let mascara = peso.replace(/^(\d{2})(\d{1})/, '$1.$2')
        document.getElementById('weight').innerHTML = mascara+'kg'
    } else {
        let mascara = peso.replace(/^(\d{3})(\d{1})/, '$1.$2')
        document.getElementById('weight').innerHTML = mascara+'kg'
    }
    
}

const preencherRegiao = (pokemonSpecies) => {
     // Região natural
    let regiaoNatural = pokemonSpecies['pokedex_numbers']['1']['pokedex']['name'].toString()
    if (regiaoNatural === 'original-sinnoh' || regiaoNatural === 'original-johto') {
        let removeStr = regiaoNatural.replace('original-', '')
        document.getElementById('region').innerHTML = removeStr
    } else {
        document.getElementById('region').innerHTML = regiaoNatural
    }
    
}

const pesquisarPokemon = async() => {
    limparDex()

    const teste = document.getElementById('name').value
    const nomePokemon = teste.toLowerCase()
    const url = `http://pokeapi.co/api/v2/pokemon/${nomePokemon}/`
    const receberDados = await fetch(url)
    const pokemonDex = await receberDados.json()

    // Pegando url dentro dos dados pokemonDex
    let regiao = pokemonDex['species']['url']
    const receberDadosSpecies = await fetch(regiao)
    const pokemonSpecies = await receberDadosSpecies.json()
    
    preencherDex(pokemonDex)
    preencherRegiao(pokemonSpecies)
    
}

// document.getElementById('name').addEventListener('focusout',pesquisarPokemon)
document.getElementById('btnJaune').addEventListener('click', () => {
    pesquisarPokemon()
})

