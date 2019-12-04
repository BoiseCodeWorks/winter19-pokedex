import Store from "../store.js";
import store from "../store.js";

// @ts-ignore
let _sandbox = axios.create({
  baseURL:'https://bcw-sandbox.herokuapp.com/api/Winter19/pokemon',
  timeout:3000
})

// @ts-ignore
let _pokeApi = axios.create({
  baseURL:'https://pokeapi.co/api/v2/pokemon',
  timeout:3000
})

class PokemonService {
   async selectPokemonAsync(name) {
let res = await _pokeApi.get(name);
console.log("from select Pokemon res", res);
let theActivePokemon = res.data;

  }  
  async getWildPokemonAsync(){
    let res = await _pokeApi.get('')
    store.commit("pokemon", res.data.results)
  
  }
  constructor(){
  }
}

const service = new PokemonService();
export default service;
